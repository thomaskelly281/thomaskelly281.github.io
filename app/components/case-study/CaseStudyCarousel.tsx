'use client';

import { useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
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

export function CaseStudyCarousel({ images }: CaseStudyCarouselProps) {
  const emblaOptions = useMemo(
    () => ({
      align: () => getCarouselInsetPx(),
      loop: true,
      dragFree: true,
      skipSnaps: true,
      containScroll: false,
      duration: 40,
      dragThreshold: 4,
    }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  useEffect(() => {
    if (!emblaApi) return;

    const resetScroll = () => {
      emblaApi.scrollTo(0, true);
    };

    resetScroll();
    emblaApi.on('reInit', resetScroll);

    return () => {
      emblaApi.off('reInit', resetScroll);
    };
  }, [emblaApi]);

  if (images.length === 0) return null;

  return (
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
            {images.map((image, index) => (
              <div
                key={image.src}
                className={`case-study-carousel__slide shrink-0 grow-0 basis-[58%] sm:basis-[44%] md:basis-[36%] lg:basis-[30%] ${
                  index > 0 ? 'ml-3 md:ml-4' : ''
                }`}
              >
                <div className="overflow-hidden rounded-2xl bg-text-secondary/[0.03]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[2/1] w-full object-cover"
                    draggable={false}
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
