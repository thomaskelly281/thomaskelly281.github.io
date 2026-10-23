'use client';

import { forwardRef, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useGSAP } from '../contexts/GSAPContext';

const PHOTOS = [
  {
    src: '/images/about-1.webp',
    alt: 'Thomas with colleagues in the Sitecore office',
    caption: 'With the team at Sitecore',
    position: 'center center',
  },
  {
    src: '/images/about-3.webp',
    alt: 'A desk with a design file on one screen and code on the other',
    caption: 'Design on one screen, code on the other',
    position: 'center center',
  },
  {
    src: '/images/about-2.webp',
    alt: 'Thomas at the NCAD degree show with the Recite project',
    caption: 'Recite, at the NCAD degree show',
    position: 'center top',
  },
  {
    src: '/images/about-4.jpg',
    alt: 'A green Mazda MX-5 with the bonnet open, mid-repair',
    caption: 'The MX-5, mid-repair',
    position: 'center center',
  },
] as const;

type VantaEffect = {
  destroy: () => void;
  resize?: () => void;
  onUpdate?: () => void;
  t?: number;
  camera?: {
    position: { set: (x: number, y: number, z: number) => void };
    up: { set: (x: number, y: number, z: number) => void };
    lookAt: (x: number, y: number, z: number) => void;
  };
  starsGeometry?: {
    attributes: {
      position: {
        array: ArrayLike<number>;
        needsUpdate: boolean;
        setUsage: (usage: number) => void;
      };
    };
    computeVertexNormals: () => void;
  };
  starField?: {
    material?: {
      map: unknown;
      transparent: boolean;
      needsUpdate: boolean;
    };
  };
  scene?: {
    traverse: (cb: (object: { isSprite?: boolean; material?: { map: unknown; needsUpdate: boolean } }) => void) => void;
  };
};

type VantaWindow = Window & {
  VANTA?: {
    DOTS: (options: Record<string, unknown>) => VantaEffect;
  };
  THREE?: {
    CanvasTexture: new (canvas: HTMLCanvasElement) => { needsUpdate: boolean };
  };
};

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing?.dataset.loaded === 'true') {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function createCircularTexture(THREE: NonNullable<VantaWindow['THREE']>, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.8, color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function stackStyle(offset: number, count: number): CSSProperties {
  if (offset === 0) {
    return {
      transform: 'translate3d(0px, 0px, 0) rotate(-1.5deg) scale(1)',
      zIndex: 30,
      opacity: 1,
    };
  }
  if (offset === 1) {
    return {
      transform: 'translate3d(10px, 8px, 0) rotate(3deg) scale(0.975)',
      zIndex: 20,
      opacity: 1,
    };
  }
  if (offset === count - 1) {
    return {
      transform: 'translate3d(-12px, 10px, 0) rotate(-3.5deg) scale(0.975)',
      zIndex: 10,
      opacity: 1,
    };
  }
  return {
    transform: 'translate3d(0px, 12px, 0) rotate(0deg) scale(0.95)',
    zIndex: 0,
    opacity: 0,
  };
}

function PhotoStack() {
  const [active, setActive] = useState(0);
  const count = PHOTOS.length;
  const photo = PHOTOS[active];

  const showPrevious = () => setActive((current) => (current - 1 + count) % count);
  const showNext = () => setActive((current) => (current + 1) % count);

  return (
    <div
      className="w-full outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showPrevious();
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <div className="relative aspect-[3/4]">
        {PHOTOS.map((item, index) => {
          const offset = (index - active + count) % count;
          const isFront = offset === 0;
          return (
            <div
              key={item.src}
              className="absolute inset-0 overflow-hidden rounded-lg bg-neutral-200 shadow-[0_16px_40px_rgba(34,34,34,0.14)] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none dark:bg-neutral-800"
              style={stackStyle(offset, count)}
              aria-hidden={!isFront}
            >
              <Image
                src={item.src}
                alt={isFront ? item.alt : ''}
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
                style={{ objectPosition: item.position }}
                priority={index === 0}
              />
            </div>
          );
        })}

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous photo"
          className="absolute top-1/2 left-3 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-text-secondary/20 bg-background/80 text-text-secondary backdrop-blur-sm transition-colors hover:border-transparent hover:bg-accent-tertiary hover:text-[#222222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next photo"
          className="absolute top-1/2 right-3 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-text-secondary/20 bg-background/80 text-text-secondary backdrop-blur-sm transition-colors hover:border-transparent hover:bg-accent-tertiary hover:text-[#222222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      <p
        aria-live="polite"
        className="mt-5 text-center font-[family-name:var(--font-sfpro)] text-sm leading-snug text-text-secondary/70"
      >
        {photo.caption}
      </p>
    </div>
  );
}

export const AboutSection = forwardRef<HTMLElement>((_props, ref) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const { ScrollTrigger } = useGSAP();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const el = vantaRef.current;
    if (!el) return;

    let cancelled = false;
    let effect: VantaEffect | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const initVanta = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        if (cancelled) return;
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js');
        if (cancelled || !vantaRef.current) return;

        const vantaWindow = window as VantaWindow;
        if (!vantaWindow.VANTA) return;

        const rootStyles = getComputedStyle(document.documentElement);
        const isDark = resolvedTheme === 'dark' || document.documentElement.classList.contains('dark');
        const backgroundColor = rootStyles.getPropertyValue('--background').trim() || (isDark ? '#0a0a0a' : '#ffffff');
        const dotColor = isDark ? '#666666' : '#CCCCCC';

        const dotEffect = vantaWindow.VANTA.DOTS({
          el: vantaRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: dotColor,
          color2: dotColor,
          backgroundColor,
          showLines: false,
          size: 2,
          spacing: 15,
        }) as VantaEffect;
        effect = dotEffect;

        if (vantaWindow.THREE) {
          const texture = createCircularTexture(vantaWindow.THREE, dotColor);
          const dynamicUsage = (vantaWindow.THREE as { DynamicDrawUsage?: number }).DynamicDrawUsage;
          if (dotEffect.starField?.material) {
            dotEffect.starField.material.map = texture;
            dotEffect.starField.material.transparent = true;
            dotEffect.starField.material.needsUpdate = true;
          }
          dotEffect.scene?.traverse((object) => {
            if (object.isSprite && object.material) {
              object.material.map = texture;
              object.material.needsUpdate = true;
            }
          });

          // Keep the original top-down view, and ease the dot drift.
          dotEffect.onUpdate = () => {
            const position = dotEffect.starsGeometry?.attributes.position;
            if (position) {
              const array = position.array;
              const time = dotEffect.t ?? 0;
              for (let j = 0; j < array.length; j += 3) {
                const x = array[j];
                const y = array[j + 1];
                const z = array[j + 2];
                array[j + 1] = y + 0.06 * Math.sin(z * 0.02 + x * 0.015 + time * 0.012);
              }
              if (dynamicUsage !== undefined) position.setUsage(dynamicUsage);
              dotEffect.starsGeometry?.computeVertexNormals();
              position.needsUpdate = true;
            }

            const camera = dotEffect.camera;
            if (!camera) return;
            camera.position.set(0, 200, 0);
            camera.up.set(0, 0, -1);
            camera.lookAt(0, 0, 0);
          };
        }

        if (cancelled) {
          dotEffect.destroy();
          return;
        }

        const observed = vantaRef.current;
        resizeObserver = new ResizeObserver(() => {
          dotEffect.resize?.();
        });
        if (observed) resizeObserver.observe(observed);
        dotEffect.resize?.();

        ScrollTrigger.refresh();
      } catch (error) {
        console.error('Failed to initialize Vanta:', error);
      }
    };

    initVanta();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      effect?.destroy();
    };
  }, [ScrollTrigger, resolvedTheme]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative mt-32 mb-20 w-full bg-background md:mt-48 md:mb-28"
    >
      <div ref={vantaRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl pt-20 pb-16">
        <h2 className="text-4xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-5xl lg:text-6xl">
          About
        </h2>
        <p className="mt-4 font-[family-name:var(--font-georgia)] text-2xl italic leading-snug text-text-secondary md:mt-5 md:text-3xl">
          Bringing work from{' '}
          <span className="bg-accent-tertiary px-1.5 text-[#222222] box-decoration-clone">0 to 1</span>.
        </p>

        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 space-y-5 font-[family-name:var(--font-sfpro)] text-base leading-relaxed text-text-secondary/90 md:text-lg lg:order-1">
            <p className="text-lg font-medium leading-snug text-text-secondary md:text-xl">
              I am a product designer at Sitecore, based in Dublin. I joined in 2024 as their AI designer, and the work has grown with me.
            </p>
            <p>
              I own how the design team works with AI, and I led the rebuild of the design system, from its architecture through to adoption. I have also designed Agentic Studio, the AI innovation labs, and the merge of Sitecore&apos;s CDP, DAM, and search inside SitecoreAI.
            </p>
            <p>
              I studied Interaction Design at NCAD, and took a postgraduate diploma in AI Applications at the same time. I wanted the harder version of the degree. In 2026 I started a master&apos;s in Leadership, Innovation and Technology at TU Dublin.
            </p>
            <p>
              Away from the office I build small products, mostly because an idea does not stay an idea for long. When I am not designing or writing code, I am usually under the bonnet of a car.
            </p>
            <a
              href="/pdfs/thomas_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center rounded-lg bg-accent-tertiary px-6 py-3 font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] transition-opacity hover:opacity-90"
            >
              View CV
            </a>
          </div>

          <div className="order-1 lg:order-2">
            <PhotoStack />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
