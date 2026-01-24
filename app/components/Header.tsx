'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useGSAP } from '../contexts/GSAPContext';

// Stock images from Unsplash - positioned left to right
const HOVER_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop', // 0-25% - Left
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=400&fit=crop', // 25-50%
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop', // 50-75%
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop', // 75-100% - Right
];

export function Header() {
  const { theme, resolvedTheme } = useTheme();
  const { gsap } = useGSAP();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const previousMouseX = useRef<number | null>(null);
  const previousMouseY = useRef<number | null>(null);
  const tiltTween = useRef<any>(null); // GSAP tween reference
  const currentTilt = useRef<number>(0); // Track current tilt for smooth interpolation
  const currentX = useRef<number>(0); // Track current X position
  const currentY = useRef<number>(0); // Track current Y position

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

  // Handle mouse move over SVG container
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!svgContainerRef.current || !imageRef.current) return;

    const rect = svgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Calculate percentage (0-100%)
    const percentage = (x / width) * 100;
    
    // Determine which image to show based on 25% sections
    let imageIndex = 0;
    if (percentage < 25) imageIndex = 0;
    else if (percentage < 50) imageIndex = 1;
    else if (percentage < 75) imageIndex = 2;
    else imageIndex = 3;
    
    setActiveImageIndex(imageIndex);

    // Calculate tilt and X/Y movement based on cursor position with smooth 3D effect
    if (gsap && imageRef.current) {
      const rect = svgContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate movement for tilt
      if (previousMouseX.current !== null) {
        const movementX = mouseX - previousMouseX.current;
        // Calculate tilt angle: max 20 degrees, with smooth accumulation
        // Negative movement (left) = negative rotation (tilt left)
        // Positive movement (right) = positive rotation (tilt right)
        const maxTilt = 20;
        // Smooth accumulation: add movement to current tilt with damping
        const tiltDelta = movementX * 0.2;
        currentTilt.current = Math.max(-maxTilt, Math.min(maxTilt, currentTilt.current + tiltDelta));
        
        // Apply damping to gradually return to center when not moving
        if (Math.abs(movementX) < 1) {
          currentTilt.current *= 0.9; // Damping factor
        }
      }
      
      // Calculate X and Y translation based on cursor position relative to SVG center
      const svgCenterX = rect.left + rect.width / 2;
      const svgCenterY = rect.top + rect.height / 2;
      
      // Calculate offset from center (normalized to -1 to 1)
      const offsetX = (mouseX - svgCenterX) / (rect.width / 2);
      const offsetY = (mouseY - svgCenterY) / (rect.height / 2);
      
      // Apply movement with limits (max 30px in each direction)
      const maxMovement = 30;
      const targetX = offsetX * maxMovement;
      const targetY = offsetY * maxMovement;
      
      // Smooth interpolation for X and Y
      currentX.current += (targetX - currentX.current) * 0.15;
      currentY.current += (targetY - currentY.current) * 0.15;
      
      // Kill previous tween if exists
      if (tiltTween.current && tiltTween.current.kill) {
        tiltTween.current.kill();
      }
      
      // Animate 3D rotation and translation with GSAP
      tiltTween.current = gsap.to(imageRef.current, {
        rotationY: currentTilt.current, // 3D rotation around Y axis
        x: currentX.current, // X translation
        y: currentY.current, // Y translation
        transformPerspective: 1000, // Add perspective for 3D effect
        scale: 1 + Math.abs(currentTilt.current) * 0.008, // Subtle scale for depth
        duration: 0.4,
        ease: 'power1.out', // Smoother easing
      });
    }
    
    previousMouseX.current = e.clientX;
    previousMouseY.current = e.clientY;
  }, [gsap]);

  // Smooth image position - fixed horizontal positions per section, fixed vertical position
  // Run even when not hovering to position the default leftmost image
  useEffect(() => {
    if (!imageRef.current || !svgContainerRef.current) return;

    let animationFrameId: number;
    let currentX = 0;

    // Fixed horizontal positions for each 25% section (centered in each quarter)
    // Positioned at: 12.5%, 37.5%, 62.5%, 87.5% to center images in each quarter
    const horizontalPositions = [0.125, 0.375, 0.625, 0.875]; // 12.5%, 37.5%, 62.5%, 87.5%

    const calculateAndSetPosition = (): { targetX: number; targetY: number } | null => {
      if (!imageRef.current || !svgContainerRef.current) return null;
      
      // Get the parent container (the flex container)
      const parentContainer = imageRef.current.parentElement;
      if (!parentContainer) return null;
      
      const parentRect = parentContainer.getBoundingClientRect();
      const svgRect = svgContainerRef.current.getBoundingClientRect();
      
      // Calculate positions relative to parent container
      const svgLeft = svgRect.left - parentRect.left;
      const svgTop = svgRect.top - parentRect.top;
      const svgWidth = svgRect.width;
      const svgHeight = svgRect.height;
      
      // Get actual image dimensions from computed style
      const computedStyle = window.getComputedStyle(imageRef.current);
      const imageWidth = parseFloat(computedStyle.width) || 300;
      const imageHeight = parseFloat(computedStyle.height) || 400;
      
      // Fixed horizontal position for the active image section
      // Center image at the calculated position within its quarter
      const targetX = svgLeft + (svgWidth * horizontalPositions[activeImageIndex]) - (imageWidth / 2);
      
      // Fixed Y position - center vertically on SVG
      const targetY = svgTop + (svgHeight / 2) - (imageHeight / 2);
      
      return { targetX, targetY };
    };

    const updateImagePosition = () => {
      const position = calculateAndSetPosition();
      if (!position) return;
      
      const { targetX, targetY } = position;
      
      // Smoothly transition X position when image changes (with easing)
      const dx = targetX - currentX;
      
      // Easing factor for smooth horizontal movement
      const easeX = 0.15;
      currentX = currentX + dx * easeX;
      
      if (imageRef.current) {
        imageRef.current.style.left = `${currentX}px`;
        imageRef.current.style.top = `${targetY}px`; // Fixed Y, no animation needed
      }
      
      animationFrameId = requestAnimationFrame(updateImagePosition);
    };
    
    // Initialize position immediately
    const initialPosition = calculateAndSetPosition();
    if (initialPosition) {
      currentX = initialPosition.targetX;
      if (imageRef.current) {
        imageRef.current.style.left = `${currentX}px`;
        imageRef.current.style.top = `${initialPosition.targetY}px`;
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      const position = calculateAndSetPosition();
      if (position) {
        currentX = position.targetX;
        if (imageRef.current) {
          imageRef.current.style.left = `${currentX}px`;
          imageRef.current.style.top = `${position.targetY}px`;
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    animationFrameId = requestAnimationFrame(updateImagePosition);
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovering, activeImageIndex]);

  // Determine which SVG to use
  const svgPath = currentTheme === 'dark' 
    ? '/SVGs/productDesignerDark.svg' 
    : '/SVGs/productDesigner.svg';

  return (
    <header className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 min-h-[60vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div 
          className="flex flex-col gap-6 lg:gap-8 relative"
          style={{
            perspective: '1000px', // Add 3D perspective to parent
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Hover Images - Behind SVG and text, positioned left to right */}
          <div
            ref={imageRef}
            className="absolute pointer-events-none transition-opacity duration-500 ease-in-out hidden md:block"
            style={{
              width: 'clamp(200px, 20vw, 300px)',
              aspectRatio: '3/4',
              opacity: 1, // Always visible, showing leftmost image by default
              left: '0px', // Will be updated by animation
              top: '0px', // Will be updated by animation
              zIndex: 0, // Behind SVG and text
              transformStyle: 'preserve-3d', // Enable 3D transforms
              backfaceVisibility: 'hidden', // Better performance
              willChange: 'transform', // Optimize for animations
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
                  transition: 'none' // No transition for instant switching
                }}
                loading="lazy"
              />
            ))}
          </div>

          {/* SVG - Product Designer */}
          <div
            ref={svgContainerRef}
            className="w-full relative"
            style={{ zIndex: 10 }} // Ensure SVG is above images
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              // Reset tilt and position when mouse leaves with smooth 3D animation
              if (imageRef.current && gsap) {
                if (tiltTween.current) {
                  tiltTween.current.kill();
                }
                currentTilt.current = 0; // Reset tilt tracking
                currentX.current = 0; // Reset X position
                currentY.current = 0; // Reset Y position
                gsap.to(imageRef.current, {
                  rotationY: 0,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.6,
                  ease: 'power2.out',
                });
              }
              previousMouseX.current = null;
              previousMouseY.current = null;
            }}
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
          <div className="text-right self-end relative" style={{ zIndex: 10 }}>
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
