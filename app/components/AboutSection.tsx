'use client';

import { forwardRef, useRef, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { useGSAP } from '../contexts/GSAPContext';

// Customize the horizontal scroll items here
// Add or remove items from this array to change what appears in the horizontal scroll
const horizontalScrollItems: Array<{
  id: string;
  content: ReactNode;
  width?: string; // Optional: override default width (e.g., 'w-[50vw]')
}> = [
  {
    id: 'item-1',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#FF6B6B]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">1</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Red</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-2',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#4ECDC4]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">2</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Cyan</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-3',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#45B7D1]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">3</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Blue</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-4',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#FFA07A]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">4</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Coral</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-5',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#98D8C8]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">5</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Mint</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-6',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#F7DC6F]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">6</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Yellow</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-7',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#BB8FCE]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">7</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Purple</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-8',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#85C1E2]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">8</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Sky</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-9',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#F8B500]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">9</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Orange</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-10',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#52B788]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">10</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Green</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-11',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#E63946]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">11</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Crimson</div>
        </div>
      </div>
    ),
  },
  {
    id: 'item-12',
    content: (
      <div className="w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl flex items-center justify-center shadow-2xl bg-[#06FFA5]">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 opacity-90">12</div>
          <div className="text-2xl md:text-3xl font-semibold text-white opacity-80">Emerald</div>
        </div>
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

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(horizontalScroll, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
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
          className="relative z-10 flex items-center gap-8 h-full px-8"
          style={{ width: 'fit-content' }}
        >
          {/* Horizontal Scroll Items - Customize by editing horizontalScrollItems array above */}
          {horizontalScrollItems.map((item) => (
            <div key={item.id} className={`flex-shrink-0 ${item.width || ''}`.trim()}>
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
