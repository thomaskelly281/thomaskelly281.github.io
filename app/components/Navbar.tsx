'use client';

import * as React from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useRef, useState } from 'react';
import { PanelLeft } from '@/components/animate-ui/icons/panel-left';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import { buttonVariants } from '@/components/animate-ui/components/buttons/icon';
import { RollingTextHover } from './RollingTextHover';
import { NavbarItem } from './NavbarItem';
import { cn } from '@/lib/utils';
import { useGSAP } from '../contexts/GSAPContext';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Work', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Thomas Kelly', href: '#thomas-kelly' },
  { label: 'Contact', href: '#contact' },
  { label: 'CV', href: '#cv' },
];

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const themeToggleRef = useRef<HTMLDivElement>(null);
  const sidebarIconRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { gsap } = useGSAP();

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

  // Animate navbar transformation on scroll
  React.useEffect(() => {
    if (!navbarRef.current || !navItemsRef.current || !themeToggleRef.current || !sidebarIconRef.current) return;

    if (isScrolled) {
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
      
      // Hide nav items
      gsap.to(navItemsRef.current, {
        opacity: 0,
        x: -100,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.out',
      });
      
      // Hide theme toggle
      gsap.to(themeToggleRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.out',
      });
      
      // Show sidebar icon
      gsap.to(sidebarIconRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
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
      
      // Show nav items
      gsap.to(navItemsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      
      // Show theme toggle
      gsap.to(themeToggleRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      
      // Hide sidebar icon
      gsap.to(sidebarIconRef.current, {
        opacity: 0,
        scale: 0.8,
        x: -20,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'none',
      });
    }
  }, [isScrolled, gsap]);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sidebar Icon - Hidden by default, shown when scrolled */}
          <div ref={sidebarIconRef} className="opacity-0 pointer-events-none">
            <button
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' })
              )}
              aria-label="Open menu"
            >
              <AnimateIcon animateOnHover>
                <PanelLeft />
              </AnimateIcon>
            </button>
          </div>

          {/* Navigation Items - Center */}
          <div ref={navItemsRef} className="flex-1 flex items-center justify-center gap-8">
            {navItems.map((item, index) => {
              const isThomasKelly = index === 2; // Third item (Thomas Kelly)
              
              if (isThomasKelly) {
                return (
                  <NavbarItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    isThomasKelly={true}
                    className="text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary"
                  />
                );
              }
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-[family-name:var(--font-sfpro)] font-light text-text-secondary"
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
          <div ref={themeToggleRef}>
            <ThemeTogglerButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
