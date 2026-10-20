'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import './CaseStudyCarousel.css';

interface CaseStudyCarouselImage {
  src: string;
  alt: string;
}

interface CaseStudyCarouselProps {
  images: CaseStudyCarouselImage[];
}

function getCarouselInsetPx() {
  if (typeof window === 'undefined') return 24;
  return window.matchMedia('(min-width: 768px)').matches ? 32 : 24;
}

const DRAG_CLICK_THRESHOLD_PX = 8;

export function CaseStudyCarousel({ images }: CaseStudyCarouselProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const imagesLoadedRef = useRef(0);
  const loopLayoutReadyRef = useRef(false);

  const slides = useMemo(
    () => (images.length > 1 ? [...images, ...images] : images),
    [images],
  );

  const lightboxImage =
    lightboxIndex === null ? null : images[lightboxIndex] ?? null;

  const emblaOptions = useMemo(
    () => ({
      align: () => getCarouselInsetPx(),
      loop: true,
      dragFree: true,
      skipSnaps: true,
      containScroll: false,
      duration: 40,
      dragThreshold: 4,
      watchSlides: true,
    }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const enableLoopWhenReady = useCallback(() => {
    if (!emblaApi || loopLayoutReadyRef.current) return;

    const slideImages = emblaApi
      .rootNode()
      .querySelectorAll<HTMLImageElement>('.case-study-carousel__trigger img');
    const loaded = [...slideImages].filter((img) => img.complete).length;
    if (loaded < slides.length) return;

    loopLayoutReadyRef.current = true;
    requestAnimationFrame(() => {
      emblaApi.reInit({ loop: true });
      if (images.length > 1) {
        emblaApi.scrollTo(images.length, true);
      }
    });
  }, [emblaApi, images.length, slides.length]);

  useEffect(() => {
    imagesLoadedRef.current = 0;
    loopLayoutReadyRef.current = false;
  }, [slides]);

  useEffect(() => {
    if (!emblaApi) return;
    enableLoopWhenReady();
  }, [emblaApi, enableLoopWhenReady]);

  const openLightbox = useCallback(
    (slideIndex: number, clientX: number, clientY: number) => {
      const start = pointerStartRef.current;
      if (start) {
        const distance = Math.hypot(clientX - start.x, clientY - start.y);
        if (distance > DRAG_CLICK_THRESHOLD_PX) return;
      }
      setLightboxIndex(slideIndex % images.length);
    },
    [images.length],
  );

  const handleSlideImageLoad = useCallback(() => {
    imagesLoadedRef.current += 1;
    if (imagesLoadedRef.current < slides.length) return;
    enableLoopWhenReady();
  }, [slides.length, enableLoopWhenReady]);

  if (images.length === 0) return null;

  return (
    <>
      <section
        aria-label="Case study gallery"
        data-swipeable=""
        className="case-study-carousel w-full pt-6 md:pt-8"
      >
        <div className="w-full min-w-0">
          <div
            ref={emblaRef}
            className="case-study-carousel__viewport overflow-hidden"
          >
            <div className="case-study-carousel__container flex">
              {slides.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="case-study-carousel__slide"
                >
                  <button
                    type="button"
                    className="case-study-carousel__trigger cursor-zoom-in overflow-hidden rounded-2xl bg-text-secondary/[0.03] text-left transition-opacity hover:opacity-90"
                    onPointerDown={(event) => {
                      pointerStartRef.current = {
                        x: event.clientX,
                        y: event.clientY,
                      };
                    }}
                    onClick={(event) => {
                      openLightbox(index, event.clientX, event.clientY);
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      draggable={false}
                      decoding="async"
                      onLoad={handleSlideImageLoad}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) setLightboxIndex(null);
        }}
      >
        <DialogContent className="border-0 bg-transparent p-0 shadow-none">
          <DialogTitle>{lightboxImage?.alt ?? 'Case study image'}</DialogTitle>
          <DialogClose aria-label="Close image preview">
            <svg
              viewBox="0 0 24 24"
              width={20}
              height={20}
              aria-hidden
              className="text-text-secondary"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          </DialogClose>
          {lightboxImage ? (
            <div className="overflow-hidden rounded-2xl bg-background shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-h-[min(85vh,56rem)] w-full object-contain"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
