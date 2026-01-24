'use client';

import * as React from 'react';
import { useRef } from 'react';
import { useGSAP } from '../contexts/GSAPContext';
import { cn } from '@/lib/utils';

interface NavbarItemProps {
  label: string;
  href: string;
  isThomasKelly?: boolean;
  className?: string;
}

export function NavbarItem({ label, href, isThomasKelly, className }: NavbarItemProps) {
  const containerRef = useRef<HTMLSpanElement | HTMLAnchorElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { gsap } = useGSAP();
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!isThomasKelly || !pathRef.current || !svgRef.current) return;

    // Set initial state - path not drawn and SVG invisible
    const path = pathRef.current;
    const svg = svgRef.current;
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    gsap.set(svg, { opacity: 0 });
    
    let animationTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      setIsHovered(true);
      
      // Kill any existing animation
      if (animationTween) {
        animationTween.kill();
      }
      
      // Show SVG and reset path
      gsap.set(svg, { opacity: 1 });
      gsap.set(path, { strokeDashoffset: pathLength });
      
      animationTween = gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          animationTween = null;
        },
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      // Kill any existing animation
      if (animationTween) {
        animationTween.kill();
      }
      
      animationTween = gsap.to(path, {
        strokeDashoffset: pathLength,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          // Ensure it's fully reset and hide SVG
          gsap.set(path, { strokeDashoffset: pathLength });
          gsap.set(svg, { opacity: 0 });
          animationTween = null;
        },
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        if (animationTween) {
          animationTween.kill();
        }
      };
    }
  }, [isThomasKelly, gsap]);

  if (isThomasKelly) {
  return (
    <span
      ref={containerRef}
      className={cn('relative inline-block group', className)}
    >
      <span className="relative z-10">{label}</span>
      <svg
        ref={svgRef}
        width="159"
        height="15"
        viewBox="0 0 159 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 pointer-events-none opacity-0"
        style={{ 
          width: '100%',
          height: 'auto',
          transform: 'translateY(6px)',
          maxWidth: '100%'
        }}
      >
        <path
          ref={pathRef}
          d="M2.50022 10.6917C27.0053 7.13206 77.1273 0.614298 81.5748 3.0205C84.6152 4.66542 81.1234 7.43291 76.9096 9.69142C75.9057 10.2295 76.3297 12.0147 77.4665 11.9434C105.445 10.1892 152.249 7.2717 156.346 7.08519"
          stroke="#E5FF20"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
  }

  return (
    <a
      href={href}
      className={cn('inline-block', className)}
    >
      <span>{label}</span>
    </a>
  );
}
