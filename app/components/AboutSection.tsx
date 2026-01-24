'use client';

import { forwardRef, useRef, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { useGSAP } from '../contexts/GSAPContext';

// Stock images from Unsplash - same as WorkSection
const ABOUT_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=750&fit=crop', // Image 1
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop', // Image 2
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=450&fit=crop', // Image 3
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=750&fit=crop', // Image 4 (reusing for variety)
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop', // Image 5 (reusing for variety)
];

// Customize the horizontal scroll items here
// Add or remove items from this array to change what appears in the horizontal scroll
const horizontalScrollItems: Array<{
  id: string;
  content: ReactNode;
  width?: string; // Optional: override default width (e.g., 'w-[50vw]')
  yOffset?: string; // Optional: vertical offset for positioning
}> = [
  {
    id: 'title',
    yOffset: 'mt-[15vh]',
    content: (
      <div className="flex items-center h-full pl-16 md:pl-24 lg:pl-32">
        <h2 className="text-6xl md:text-8xl font-bold text-text-secondary dark:text-text-secondary whitespace-nowrap drop-shadow-lg">
          Who is Thomas?
        </h2>
      </div>
    ),
    width: 'w-auto',
  },
  {
    id: 'image-1',
    yOffset: 'mt-[10vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        <p className="text-lg md:text-xl text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          I have worked at Sitecore since 2024, primarily working on AI Innovation Labs and our design system
        </p>
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[0]}
            alt="Work at Sitecore" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="text-base md:text-lg text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          Building innovative solutions with AI
        </p>
      </div>
    ),
  },
  {
    id: 'image-2',
    yOffset: 'mt-[30vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        <p className="text-base md:text-lg text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          The guy with a million hobbies
        </p>
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[1]}
            alt="Hobbies" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="text-lg md:text-xl text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          I have graduated with a Bachelor&apos;s in Interaction design and a Postgraduate H.Dip in AI Applications.
        </p>
      </div>
    ),
  },
  {
    id: 'image-3',
    yOffset: 'mt-[5vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        <p className="text-lg md:text-xl text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          I build a lot of webapps in my spare time
        </p>
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[2]}
            alt="Webapps" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="text-base md:text-lg text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          Always learning, always building
        </p>
      </div>
    ),
  },
  {
    id: 'image-4',
    yOffset: 'mt-[25vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        <p className="text-base md:text-lg text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          Passionate about design and technology
        </p>
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[3]}
            alt="Design and Technology" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="text-lg md:text-xl text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          Konstantina Diaman Thomas in the future
        </p>
      </div>
    ),
  },
  {
    id: 'image-5',
    yOffset: 'mt-[15vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        <p className="text-lg md:text-xl text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md">
          Rob Coyle - Head of Product, Finch
        </p>
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[4]}
            alt="Testimonial" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="text-base md:text-lg text-text-secondary dark:text-text-secondary text-left max-w-md font-medium drop-shadow-md italic">
          &ldquo;True story. The first time I heard of Thomas was via his project posters and the NCAD final year exhibition. He had built a camera based AI app that helped people improve their public speaking &apos;Actually&apos; built it. It looked clean and simple to use. It stood out. I thought &apos;we should talk to him - this kid&apos;s got depth&apos;. A year later we still haven&apos;t found the bottom.&rdquo;
        </p>
      </div>
    ),
  },
];

export const AboutSection = forwardRef<HTMLElement>((props, ref) => {
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<{ destroy: () => void } | null>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!vantaRef.current) return;

    let cancelled = false;
    let scriptThree: HTMLScriptElement | null = null;
    let scriptVanta: HTMLScriptElement | null = null;

    const initVanta = () => {
      // Load THREE.js from CDN
      scriptThree = document.createElement('script');
      scriptThree.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      scriptThree.async = true;
      
      scriptThree.onload = () => {
        if (cancelled) return;
        
        // Load Vanta after THREE is loaded
        scriptVanta = document.createElement('script');
        scriptVanta.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js';
        scriptVanta.async = true;
        
        scriptVanta.onload = () => {
          if (cancelled || !vantaRef.current) return;
          
          // Wait a tick for VANTA to be available
          setTimeout(() => {
            if (cancelled || !vantaRef.current || !(window as typeof window & { VANTA?: { DOTS: (options: Record<string, unknown>) => { destroy: () => void } } }).VANTA) return;
            
            try {
              const rootStyles = getComputedStyle(document.documentElement);
              const accentColor = rootStyles.getPropertyValue('--accent-tertiary').trim() || '#E5FF20';
              // Use the CSS variable which automatically changes based on theme
              const backgroundColor = rootStyles.getPropertyValue('--background').trim() || '#ffffff';
              
              // Determine dot color based on theme: #222222 in light mode, accent color in dark mode
              const isDarkMode = resolvedTheme === 'dark' || document.documentElement.classList.contains('dark');
              const dotColor = isDarkMode ? accentColor : '#222222';

              vantaEffectRef.current = (window as typeof window & { VANTA: { DOTS: (options: Record<string, unknown>) => { destroy: () => void } } }).VANTA.DOTS({
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
                backgroundColor: backgroundColor,
                showLines: false,
                size: 2,
                spacing: 15,
                rotationSpeed: 0,
                rotation: 0,
                camera: {
                  position: {
                    x: 0,
                    y: 200,
                    z: 0,
                  },
                },
              });

              // Make dots circular by creating a circular texture and applying it to sprites
              if (vantaEffectRef.current && typeof window !== 'undefined' && (window as typeof window & { THREE?: any }).THREE) {
                const THREE = (window as typeof window & { THREE: any }).THREE;
                const vantaInstance = vantaEffectRef.current as any;
                
                // Create a circular texture
                const createCircularTexture = (color: string = '#ffffff') => {
                  const canvas = document.createElement('canvas');
                  canvas.width = 64;
                  canvas.height = 64;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    // Draw a circular dot with smooth edges
                    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
                    gradient.addColorStop(0, color);
                    gradient.addColorStop(0.8, color);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(32, 32, 30, 0, Math.PI * 2);
                    ctx.fill();
                  }
                  return new THREE.CanvasTexture(canvas);
                };

                // Wait for Vanta to fully initialize, then modify sprites
                setTimeout(() => {
                  if (vantaInstance && vantaInstance.scene) {
                    const circularTexture = createCircularTexture(dotColor);
                    circularTexture.needsUpdate = true;
                    
                    // Traverse the scene to find all sprites and update their textures
                    vantaInstance.scene.traverse((object: any) => {
                      if (object.isSprite && object.material) {
                        object.material.map = circularTexture;
                        object.material.needsUpdate = true;
                      }
                    });
                  }
                }, 300);
              }

              // Lock camera position after initialization and keep it locked
              if (vantaEffectRef.current) {
                const vantaInstance = vantaEffectRef.current as any;
                
                // Wait a frame for Vanta to fully initialize
                requestAnimationFrame(() => {
                  if (vantaInstance.camera) {
                    const camera = vantaInstance.camera;
                    const targetPosition = { x: 0, y: 200, z: 0 };
                    
                    // Set initial position - camera above looking down
                    camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
                    camera.lookAt(0, 0, 0);
                    camera.up.set(0, 0, -1); // Rotate up vector for proper top-down orientation
                    
                    // Continuously lock camera position in animation loop
                    const lockCamera = () => {
                      if (camera && !cancelled) {
                        camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
                        camera.lookAt(0, 0, 0);
                        camera.up.set(0, 0, -1);
                        requestAnimationFrame(lockCamera);
                      }
                    };
                    
                    // Start locking loop
                    lockCamera();
                  }
                });
              }

              ScrollTrigger.refresh();
            } catch (error) {
              console.error('Failed to initialize Vanta:', error);
            }
          }, 100);
        };
        
        scriptVanta.onerror = () => {
          console.error('Failed to load Vanta script');
        };
        
        document.head.appendChild(scriptVanta);
      };
      
      scriptThree.onerror = () => {
        console.error('Failed to load THREE.js script');
      };
      
      document.head.appendChild(scriptThree);
    };

    initVanta();

    return () => {
      cancelled = true;
      
      // Cleanup Vanta effect
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
      
      // Remove scripts
      if (scriptThree && document.head.contains(scriptThree)) {
        document.head.removeChild(scriptThree);
      }
      if (scriptVanta && document.head.contains(scriptVanta)) {
        document.head.removeChild(scriptVanta);
      }
    };
  }, [ScrollTrigger, resolvedTheme]);

  // Update Vanta background color when theme changes
  useEffect(() => {
    if (!vantaEffectRef.current) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const backgroundColor = rootStyles.getPropertyValue('--background').trim() || '#ffffff';

    try {
      const vantaInstance = vantaEffectRef.current as any;
      if (vantaInstance && vantaInstance.setOptions) {
        vantaInstance.setOptions({ backgroundColor });
      } else if (vantaInstance && vantaInstance.renderer && vantaInstance.scene) {
        // Update background directly if possible
        if (vantaInstance.renderer.domElement) {
          vantaInstance.renderer.setClearColor(backgroundColor, 1);
        }
      }
    } catch (error) {
      console.error('Failed to update Vanta background:', error);
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (!containerRef.current || !horizontalScrollRef.current) return;

    const container = containerRef.current;
    const horizontalScroll = horizontalScrollRef.current;

    // Calculate the total scroll distance needed
    const scrollWidth = horizontalScroll.scrollWidth - window.innerWidth;

    // Create the horizontal scroll animation with slower, smoother scrolling
    // Using scrub: 2 for smoother response and 2x scroll distance for slower speed
    const scrollTween = gsap.to(horizontalScroll, {
      x: -scrollWidth,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth * 2}`, // Double the scroll distance for slower speed
        scrub: 2, // Higher value = smoother/slower response (was 1)
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  }, [gsap, ScrollTrigger]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden mt-48 sm:mt-64 md:mt-80 lg:mt-96 mb-32"
    >
      {/* Spacer above horizontal scroll (20vh) */}
      <div className="h-[20vh]" />

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 z-0 pointer-events-none" />
        <div
          ref={horizontalScrollRef}
          className="relative z-10 flex items-start gap-8 h-full px-8"
          style={{ width: 'fit-content' }}
        >
          {/* Horizontal Scroll Items - Customize by editing horizontalScrollItems array above */}
          {horizontalScrollItems.map((item) => (
            <div 
              key={item.id} 
              className={`flex-shrink-0 ${item.width || 'w-[60vw] md:w-[40vw]'} ${item.yOffset || ''}`.trim()}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Spacer below horizontal scroll (20vh) */}
      <div className="h-[20vh]" />
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
