'use client';

import { forwardRef, useRef, useEffect, useMemo, ReactNode } from 'react';
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

// Helper function to generate text image as data URL
const createTextImage = (text: string, isDark: boolean = false): string => {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  // Use wider canvas to support larger screens (CSS will control display width)
  const width = 1200;
  const lineHeight = 60;
  const padding = 40; // 20px on each side
  const maxWidth = width - padding;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Set text style (need to set font before measuring)
  ctx.font = '500 48px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // Word wrap text and calculate lines
  const words = text.split(' ');
  let line = '';
  let lines: string[] = [];
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  
  // Calculate dynamic height based on number of lines
  const minHeight = 200;
  const calculatedHeight = Math.max(minHeight, lines.length * lineHeight + padding);
  const height = calculatedHeight;
  
  // Resize canvas to fit all text
  canvas.width = width;
  canvas.height = height;
  
  // Clear and set background (transparent)
  ctx.clearRect(0, 0, width, height);
  
  // Get accent color from CSS variable (only for light mode)
  let accentColor = '#E5FF20'; // Default fallback
  if (typeof document !== 'undefined') {
    const rootStyles = getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue('--accent-tertiary').trim();
    if (accent) accentColor = accent;
  }
  
  // Set text style again after canvas resize
  ctx.font = '500 48px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // Draw text starting from top with padding
  let y = padding / 2;
  lines.forEach((line) => {
    const lineText = line.trim();
    const textMetrics = ctx.measureText(lineText);
    const textWidth = textMetrics.width;
    const textX = padding / 2;
    
    // Draw accent color background highlight (only in light mode)
    if (!isDark) {
      // Calculate highlight position: 40% down from top of line
      const highlightStartY = y + (lineHeight * 0.4);
      const highlightHeight = lineHeight * 0.6; // Lower 60% of line
      
      ctx.fillStyle = accentColor;
      ctx.fillRect(textX, highlightStartY, textWidth, highlightHeight);
    }
    
    // Draw text on top
    ctx.fillStyle = isDark ? '#ffffff' : '#000000';
    ctx.fillText(lineText, textX, y);
    
    y += lineHeight;
  });
  
  return canvas.toDataURL('image/png');
};

// Customize the horizontal scroll items here
// Add or remove items from this array to change what appears in the horizontal scroll
const getHorizontalScrollItems = (isDark: boolean): Array<{
  id: string;
  content: ReactNode;
  width?: string; // Optional: override default width (e.g., 'w-[50vw]')
  yOffset?: string; // Optional: vertical offset for positioning
}> => [
  {
    id: 'title',
    yOffset: 'mt-[15vh]',
    content: (
      <div className="flex items-center h-full pl-32 md:pl-48 lg:pl-64">
        <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary dark:text-text-secondary whitespace-nowrap">
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
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[0]}
            alt="Work at Sitecore" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {(() => {
          const textImageSrc = createTextImage('Thomas joined Sitecore in 2024 as their AI designer, a role that quickly evolved into leading the rebuild of the company\'s design system.', isDark);
          return textImageSrc ? (
            <img 
              src={textImageSrc}
              alt="Text image"
              className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
            />
          ) : null;
        })()}
      </div>
    ),
  },
  {
    id: 'image-2',
    yOffset: 'mt-[30vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        {(() => {
          const textImageSrc = createTextImage('He studied Interaction Design (BA Hons) alongside a postgraduate qualification in AI Applications. Why? Because he wanted a challenge.', isDark);
          return textImageSrc ? (
            <img 
              src={textImageSrc}
              alt="Text image"
              className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
            />
          ) : null;
        })()}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[1]}
            alt="Hobbies" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'image-3',
    yOffset: 'mt-[5vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[2]}
            alt="Webapps" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {(() => {
          const textImageSrc = createTextImage('Outside of work, Thomas builds SaaS products. Mostly because he can\'t stop himself from turning ideas into things.', isDark);
          return textImageSrc ? (
            <img 
              src={textImageSrc}
              alt="Text image"
              className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
            />
          ) : null;
        })()}
      </div>
    ),
  },
  {
    id: 'image-4',
    yOffset: 'mt-[25vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        {(() => {
          const textImageSrc = createTextImage('When he\'s not designing or coding, he\'s usually working on his cars. It\'s an obsession.', isDark);
          return textImageSrc ? (
            <img 
              src={textImageSrc}
              alt="Text image"
              className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
            />
          ) : null;
        })()}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[3]}
            alt="Design and Technology" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'image-5',
    yOffset: 'mt-[15vh]',
    content: (
      <div className="flex flex-col items-start gap-4 w-[50vw] md:w-[35vw]">
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img 
            src={ABOUT_IMAGES[4]}
            alt="Testimonial" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {(() => {
          const textImageSrc = createTextImage('Across everything he does, Thomas is motivated by the idea of challenging himself.', isDark);
          return textImageSrc ? (
            <img 
              src={textImageSrc}
              alt="Text image"
              className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
            />
          ) : null;
        })()}
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
  
  // Memoize horizontal scroll items based on theme
  const isDark = resolvedTheme === 'dark' || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  const horizontalScrollItems = useMemo(() => getHorizontalScrollItems(isDark), [isDark]);

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
              
              // Determine dot color based on theme: lighter in light mode, darker in dark mode
              const isDarkMode = resolvedTheme === 'dark' || document.documentElement.classList.contains('dark');
              // Lighter gray for light mode, darker version of accent for dark mode
              const dotColor = isDarkMode ? '#666666' : '#CCCCCC';

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

  // Update Vanta background color and dot colors when theme changes
  useEffect(() => {
    if (!vantaEffectRef.current) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const backgroundColor = rootStyles.getPropertyValue('--background').trim() || '#ffffff';
    
    // Determine dot color based on theme: lighter in light mode, darker in dark mode
    const isDarkMode = resolvedTheme === 'dark' || document.documentElement.classList.contains('dark');
    const dotColor = isDarkMode ? '#666666' : '#CCCCCC';

    try {
      const vantaInstance = vantaEffectRef.current as any;
      if (vantaInstance && vantaInstance.setOptions) {
        vantaInstance.setOptions({ backgroundColor, color: dotColor, color2: dotColor });
      } else if (vantaInstance && vantaInstance.renderer && vantaInstance.scene) {
        // Update background directly if possible
        if (vantaInstance.renderer.domElement) {
          vantaInstance.renderer.setClearColor(backgroundColor, 1);
        }
      }
      
      // Update dot textures with new color
      if (vantaInstance && vantaInstance.scene && typeof window !== 'undefined' && (window as typeof window & { THREE?: any }).THREE) {
        const THREE = (window as typeof window & { THREE: any }).THREE;
        const createCircularTexture = (color: string = '#ffffff') => {
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
          return new THREE.CanvasTexture(canvas);
        };
        
        const circularTexture = createCircularTexture(dotColor);
        circularTexture.needsUpdate = true;
        
        vantaInstance.scene.traverse((object: any) => {
          if (object.isSprite && object.material) {
            object.material.map = circularTexture;
            object.material.needsUpdate = true;
          }
        });
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

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(horizontalScroll, {
      x: -scrollWidth,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`, // Normal scroll distance
        scrub: 1, // Standard response
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
          className="relative z-10 flex items-start gap-24 h-full px-8"
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
