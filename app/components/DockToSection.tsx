'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Folder,
  Search,
  Inbox,
  Settings,
  Command,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { AppleDock, AppleDockIcon } from '@/components/ui/dock';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const dockItems: {
  IconComponent: LucideIcon;
  bgColor: string;
  textColor: string;
  label: string;
}[] = [
  {
    IconComponent: Folder,
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    label: 'Work',
  },
  {
    IconComponent: Search,
    bgColor: 'bg-orange-400/10',
    textColor: 'text-orange-400',
    label: 'About',
  },
  {
    IconComponent: Inbox,
    bgColor: 'bg-teal-400/10',
    textColor: 'text-teal-400',
    label: 'Inbox',
  },
  {
    IconComponent: Settings,
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
    label: 'Studio',
  },
  {
    IconComponent: Command,
    bgColor: 'bg-amber-300/10',
    textColor: 'text-amber-300',
    label: 'Lab',
  },
  {
    IconComponent: Compass,
    bgColor: 'bg-sky-400/10',
    textColor: 'text-sky-400',
    label: 'Explore',
  },
];

const DOCK_SHADOW = '0 12px 40px 0 rgba(0,0,0,0.18)';
const START_GAP = 8;
const END_GAP = 28;
const DOCK_BOTTOM = 16;

export function DockToSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const pin = pinRef.current;
    const shell = shellRef.current;
    const dock = dockRef.current;
    const shadow = shadowRef.current;
    if (!pin || !shell || !dock || !shadow) return;

    const startWidth = shell.offsetWidth;
    const startHeight = shell.offsetHeight;
    const maxScale = Math.min(2.5, (window.innerWidth - 48) / startWidth);
    const scaledHeight = startHeight * maxScale;
    const endY = -(
      window.innerHeight / 2 -
      DOCK_BOTTOM -
      scaledHeight / 2
    );
    const icons = gsap.utils.toArray<HTMLElement>(dock.children);
    const extraGap = END_GAP - START_GAP;

    gsap.set(shell, {
      transformOrigin: '50% 100%',
      scale: 1,
      y: 0,
      force3D: true,
    });
    gsap.set(shadow, { opacity: 1, force3D: true });
    gsap.set(icons, { x: 0, force3D: true });

    const tl = gsap.timeline({
      defaults: { ease: 'none', force3D: true },
      scrollTrigger: {
        trigger: pin,
        start: `top bottom-=${DOCK_BOTTOM + 58}`,
        endTrigger: '[data-header-content]',
        end: 'bottom top-=30%',
        pin,
        pinSpacing: true,
        // Follow ScrollSmoother 1:1 — a second scrub lag is what felt stuttery.
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      },
    });

    tl.to(shell, { scale: 1, y: 0, duration: 0.28 })
      .to(
        shell,
        {
          scale: maxScale,
          y: endY,
          duration: 0.72,
        },
        0.28,
      )
      .to(shadow, { opacity: 0, duration: 0.72 }, 0.28);

    icons.forEach((icon, i) => {
      const x = (i - (icons.length - 1) / 2) * extraGap;
      tl.to(icon, { x, duration: 0.72 }, 0.28);
    });
  });

  return (
    <>
      <section
        className="relative z-30 -mt-[4.5rem] flex justify-center px-3 pb-4 sm:px-4"
        aria-label="Site dock"
      >
        <div ref={pinRef} className="w-max">
          <div
            ref={shellRef}
            className="pointer-events-auto relative w-max origin-bottom overflow-visible rounded-[20px] will-change-transform"
          >
            <div
              ref={shadowRef}
              className="pointer-events-none absolute inset-0 rounded-[20px]"
              style={{ boxShadow: DOCK_SHADOW }}
            />
            <AppleDock
              ref={dockRef}
              iconMagnification={60}
              iconDistance={140}
              className="mt-0 overflow-visible gap-2 rounded-[20px] border-0 bg-transparent shadow-none backdrop-blur-none supports-backdrop-blur:bg-transparent supports-backdrop-blur:dark:bg-transparent"
            >
              {dockItems.map(
                ({ IconComponent, bgColor, textColor, label }) => (
                  <AppleDockIcon
                    key={label}
                    className={cn(bgColor, textColor)}
                    aria-label={label}
                  >
                    <IconComponent className="h-6 w-6" />
                  </AppleDockIcon>
                ),
              )}
            </AppleDock>
          </div>
        </div>
      </section>
      <div className="h-[50dvh]" aria-hidden="true" />
    </>
  );
}
