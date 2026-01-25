'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { PanelLeft } from '@/components/animate-ui/icons/panel-left';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import { RollingTextHover } from './RollingTextHover';
import { NavbarItem } from './NavbarItem';
import { useGSAP } from '../contexts/GSAPContext';
import { useSidePanel } from '../contexts/SidePanelContext';
import { useScrollTo } from '../hooks/useScrollTo';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Thomas Kelly', href: '#thomas-kelly' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#footer' },
];

interface NavbarProps {
  showSidePanelIcon?: boolean;
}

export function Navbar({ showSidePanelIcon = false }: NavbarProps) {
  const navbarRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const themeToggleRef = useRef<HTMLDivElement>(null);
  const sidebarIconRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { gsap } = useGSAP();
  const { open: openSidePanel } = useSidePanel();
  const { scrollTo, scrollToTop } = useScrollTo();

  // Detect scroll position to trigger navbar transformation
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldTransform = scrollY > 50; // Transform after 50px of scroll
      
      if (shouldTransform !== isScrolled) {
        setIsScrolled(shouldTransform);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Determine if sidebar icon should be visible (mutually exclusive with nav items)
  const shouldShowSidebarIcon = isScrolled || showSidePanelIcon;

  // Handle navigation clicks with smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#thomas-kelly' || href === '#') {
      scrollToTop({ duration: 1 });
    } else {
      scrollTo(href, { duration: 1 });
    }
  };

  // Animate navbar transformation on scroll
  React.useEffect(() => {
    if (!navbarRef.current || !navItemsRef.current || !themeToggleRef.current || !sidebarIconRef.current) return;

    if (shouldShowSidebarIcon) {
      // Calculate position to slide to left (where sidebar icon should be - left-4 = 16px)
      // Navbar is centered, so we need to move it: -50% of viewport + 16px (left-4 position)
      const navbarLeft = navbarRef.current.getBoundingClientRect().left;
      const targetX = -navbarLeft + 16; // Slide to 16px from left edge
      
      // Transform navbar container to slide left
      gsap.to(navbarRef.current, {
        x: targetX,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      // Calculate distance to left edge of container for both elements
      const container = navbarRef.current.querySelector('div');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const navItemsRect = navItemsRef.current.getBoundingClientRect();
        
        // Calculate distance from element's current position to left edge of container
        const navItemsDistanceToLeft = navItemsRect.left - containerRect.left;
        
        // Hide nav items - move all the way to the left (mutually exclusive with sidebar icon)
        gsap.to(navItemsRef.current, {
          opacity: 0,
          x: -navItemsDistanceToLeft,
          scale: 0.8,
          duration: 0.7,
          ease: 'power2.out',
          pointerEvents: 'none',
        });
        
        // Hide theme toggle - fade up animation (same as nav items style)
        gsap.to(themeToggleRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.8,
          transformOrigin: 'center center',
          duration: 0.7,
          ease: 'power2.out',
          pointerEvents: 'none',
        });
      }
      
      // Show sidebar icon (mutually exclusive with nav items)
      // Since it's fixed positioned, only animate opacity and scale
      gsap.to(sidebarIconRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        delay: 0.2,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
    } else {
      // Transform back to full navbar
      gsap.to(navbarRef.current, {
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      // Show nav items (mutually exclusive with sidebar icon)
      gsap.to(navItemsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
      
      // Show theme toggle - fade up animation (same as nav items style)
      gsap.to(themeToggleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        transformOrigin: 'center center',
        duration: 0.7,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
      
      // Hide sidebar icon (mutually exclusive with nav items)
      // Since it's fixed positioned, only animate opacity and scale
      gsap.to(sidebarIconRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'none',
      });
    }
  }, [shouldShowSidebarIcon, gsap]);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sidebar Icon with TK - Hidden by default, shown when scrolled or showSidePanelIcon is true */}
          <div ref={sidebarIconRef} className="opacity-0 pointer-events-none fixed left-3 top-6 z-50">
            <button
              onClick={openSidePanel}
              className="flex items-center gap-1.5 bg-[var(--accent-tertiary)] px-2.5 py-2 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ borderRadius: '8px' }}
              aria-label="Open menu"
            >
              <div className="p-1 h-auto text-[#222222]">
                <AnimateIcon animateOnHover>
                  <PanelLeft size={24} strokeWidth={1.5} />
                </AnimateIcon>
              </div>
              <span
                className="font-[family-name:var(--font-ppvalve)] font-extrabold italic text-[#222222] leading-none"
                style={{ fontWeight: 800, fontSize: '1.4rem' }}
              >
                TK
              </span>
            </button>
          </div>

          {/* Navigation Items - Center */}
          <div ref={navItemsRef} className="flex-1 flex items-center justify-center gap-12">
            {navItems.map((item, index) => {
              const isThomasKelly = index === 2; // Third item (Thomas Kelly)
              
              if (isThomasKelly) {
                return (
                  <button
                    key={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTop({ duration: 1 });
                    }}
                    className="cursor-pointer bg-transparent border-none p-0"
                    style={{ font: 'inherit', color: 'inherit' }}
                  >
                    <NavbarItem
                      label={item.label}
                      href={item.href}
                      isThomasKelly={true}
                      className="text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary"
                    />
                  </button>
                );
              }
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lg font-[family-name:var(--font-sfpro)] font-light text-text-secondary cursor-pointer"
                  style={{ fontWeight: 300 }}
                >
                  <RollingTextHover
                    text={item.label}
                    transition={{ duration: 0.25, delay: 0.015, ease: 'easeOut' }}
                  />
                </a>
              );
            })}
          </div>

          {/* Theme Toggle - Right */}
          <div ref={themeToggleRef} className="ml-auto" style={{ transformOrigin: 'center center' }}>
            <ThemeTogglerButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
