'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useResponsive } from '../hooks/useResponsive';

// Stock images from Unsplash - positioned left to right
const HOVER_IMAGES = [
  '/images/header-1.webp', // 0-25% - Left
  '/images/blokheader.webp', // 25-50%
  '/images/agenticheader.png', // 50-75%
  '/images/header-4.webp', // 75-100% - Right
];

export function Header() {
  const { theme, resolvedTheme } = useTheme();
  const { isDesktop } = useResponsive();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Physics-based motion tracking
  const mousePos = useRef({ x: 0, y: 0 });
  const imagePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });

  // Prevent hydration mismatch and update theme immediately
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update theme immediately when it changes (for instant SVG switching)
  // Also listen to document class changes to catch preview state during view transitions
  useEffect(() => {
    if (!mounted) return;

    const updateTheme = () => {
      // Check document class first (catches preview state during view transition)
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    };

    // Initial update
    updateTheme();

    // Watch for class changes on document element (for view transition preview)
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [mounted]);

  // Also update when theme changes from next-themes (fallback)
  useEffect(() => {
    if (mounted) {
      const effectiveTheme = (resolvedTheme || theme) as 'light' | 'dark';
      if (effectiveTheme) {
        setCurrentTheme(effectiveTheme);
      }
    }
  }, [theme, resolvedTheme, mounted]);

  // Handle mouse move over SVG container - track for physics and image switching
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only enable interactive effect on desktop
    if (!isDesktop || !svgContainerRef.current || !imageRef.current) return;

    const rect = svgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Get parent container for relative positioning
    const parentContainer = imageRef.current.parentElement;
    if (parentContainer) {
      const parentRect = parentContainer.getBoundingClientRect();
      // Update mouse position relative to parent container
      mousePos.current = { 
        x: e.clientX - parentRect.left, 
        y: e.clientY - parentRect.top 
      };
    }
    
    // Calculate percentage (0-100%)
    const percentage = (x / width) * 100;
    
    // Determine which image to show based on 25% sections
    let imageIndex = 0;
    if (percentage < 25) imageIndex = 0;
    else if (percentage < 50) imageIndex = 1;
    else if (percentage < 75) imageIndex = 2;
    else imageIndex = 3;
    
    setActiveImageIndex(imageIndex);
  }, [isDesktop]);

  // Physics-based cursor following with tilt and dynamic lag
  useEffect(() => {
    // Only run on client after mount and on desktop to prevent hydration errors
    if (!mounted || !isDesktop || !imageRef.current || !svgContainerRef.current) return;

    let animationFrameId: number;
    let currentRotation = 0;

    const updateImagePosition = () => {
      if (!imageRef.current || !svgContainerRef.current) return;
      
      // Calculate velocity for tilt (smoothed)
      const velocityX = mousePos.current.x - prevMousePos.current.x;
      const velocityY = mousePos.current.y - prevMousePos.current.y;
      prevMousePos.current = { ...mousePos.current };
      
      // Calculate speed
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      
      // Dynamic easing based on speed
      // Faster = looser (0.06), slower = tighter (0.12)
      const baseEase = 0.1;
      const speedFactor = Math.min(speed / 50, 1); // Normalize speed (reduced threshold for smoother response)
      const dynamicEase = baseEase - (0.04 * speedFactor); // Inverse: slower when moving fast
      
      // Smoothly follow cursor with dynamic easing
      const dx = mousePos.current.x - imagePos.current.x;
      const dy = mousePos.current.y - imagePos.current.y;
      
      imagePos.current.x += dx * dynamicEase;
      imagePos.current.y += dy * dynamicEase;
      
      // Calculate rotation based on velocity (tilt in direction of movement)
      const targetRotation = velocityX * 0.3; // Reduced multiplier for subtler tilt
      const maxRotation = 8; // Reduced max rotation for subtler effect
      const clampedRotation = Math.max(-maxRotation, Math.min(maxRotation, targetRotation));
      
      // Smooth rotation interpolation
      currentRotation += (clampedRotation - currentRotation) * 0.1;
      
      // Apply position and rotation using only transform for smooth GPU acceleration
      // Position is now relative to the parent container
      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${imagePos.current.x}px, ${imagePos.current.y}px) translate(-50%, -50%) rotate(${currentRotation}deg)`;
      }
      
      animationFrameId = requestAnimationFrame(updateImagePosition);
    };
    
    // Initialize position at left quarter of SVG (relative to parent container)
    if (svgContainerRef.current && imageRef.current) {
      const parentContainer = imageRef.current.parentElement;
      if (parentContainer) {
        const parentRect = parentContainer.getBoundingClientRect();
        const svgRect = svgContainerRef.current.getBoundingClientRect();
        
        // Calculate initial position relative to parent container
        const svgLeft = svgRect.left - parentRect.left;
        const svgTop = svgRect.top - parentRect.top;
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;
        
        // Position at left quarter of SVG, vertically centered
        const initialX = svgLeft + svgWidth * 0.125; // 12.5% (left quarter center)
        const initialY = svgTop + svgHeight / 2;
        
        mousePos.current = { x: initialX, y: initialY };
        imagePos.current = { x: initialX, y: initialY };
        prevMousePos.current = { x: initialX, y: initialY };
        
        // Set initial transform
        imageRef.current.style.transform = `translate(${initialX}px, ${initialY}px) translate(-50%, -50%) rotate(0deg)`;
      }
    }
    
    animationFrameId = requestAnimationFrame(updateImagePosition);
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, isDesktop]); // Only run after component is mounted on client and on desktop

  // Determine which SVG to use
  const svgPath = currentTheme === 'dark' 
    ? '/SVGs/productDesignerDark.svg' 
    : '/SVGs/productDesigner.svg';

  return (
    <header className="relative w-full px-4 sm:px-6 lg:px-8 h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div data-header-content className="flex flex-col gap-6 lg:gap-8 relative">
          {/* Hover Images - Behind SVG and text, follows cursor with physics on desktop only */}
          <div
            ref={imageRef}
            className="absolute pointer-events-none z-0 transition-opacity duration-500 ease-in-out hidden lg:block"
            style={{
              width: 'clamp(200px, 20vw, 300px)',
              aspectRatio: '3/4',
              opacity: 1, // Always visible
              left: 0,
              top: 0,
              willChange: 'transform', // Optimize for GPU acceleration
            }}
          >
            {HOVER_IMAGES.map((imagePath, index) => (
              <img
                key={index}
                src={imagePath}
                alt={`Hover image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover rounded-lg ${
                  index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  pointerEvents: 'none',
                  transition: 'none', // No transition for instant switching
                }}
                loading="lazy"
              />
            ))}
          </div>

          {/* SVG - Product Designer */}
          <div
            ref={svgContainerRef}
            data-header-svg="true"
            className="w-full relative z-10"
            onMouseEnter={() => isDesktop && setIsHovering(true)}
            onMouseLeave={() => isDesktop && setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={svgPath}
              alt="Product Designer"
              width={980}
              height={125}
              className="w-full h-auto max-w-full transition-opacity duration-300"
              priority
              style={{ pointerEvents: 'none' }}
            />
          </div>

          {/* Descriptive text - right-aligned container with left-aligned text */}
          <div className="text-right self-end relative z-10">
            <div className="text-left inline-block">
              <p className="font-sfpro text-text-secondary leading-relaxed text-sm sm:text-base lg:text-lg" style={{ fontWeight: 300 }}>
                Working @ Sitecore
              </p>
              <p className="font-sfpro text-text-secondary leading-relaxed text-sm sm:text-base lg:text-lg mt-1" style={{ fontWeight: 300 }}>
                Based in Dublin, Ireland
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
