'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ForgeFitTestimonialsData } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const Testimonials = ({ data }: { data?: ForgeFitTestimonialsData }) => {
  if (!data) return null;

  // Use Embla Carousel with looping enabled
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Autoplay functionality (infinite loop sliding)
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-16 lg:py-12 bg-[#0c0f14] relative overflow-hidden scroll-mt-20">
      {/* Huge background quotes */}
      <div className="absolute top-10 right-20 text-9xl text-white/5 opacity-30 pointer-events-none leading-none z-0">
        <FaQuoteLeft />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <SectionHeading
          subtitle={data.subtitle}
          titlePart1={data.titlePart1}
          titleHighlight={data.titleHighlight}
          description={data.description}
        />

        {/* Slider Container with Nav Arrows */}
        <div className="relative mt-12 md:mt-16">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6 touch-pan-y">
              {data.testimonials?.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-6"
                >
                  {/* Card */}
                  <div className="bg-[#141922] border border-[#1f2735] rounded-xl p-5 shadow-xl h-full flex flex-col justify-start">
                    {/* Header (Image + Details) */}
                    <div className="flex items-center gap-4 mb-4 ml-1">
                      {/* Hexagon Image Container */}
                      <div className="relative w-24 h-28 shrink-0">
                        {/* Top-Left Orange Layer */}
                        <div className="absolute inset-0 bg-[var(--color-accent)] -translate-x-2 -translate-y-2 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]" />
                        {/* Bottom-Right Orange Layer */}
                        <div className="absolute inset-0 bg-[var(--color-accent)] translate-x-2 translate-y-2 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]" />
                        {/* Actual Image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]"
                          style={{ backgroundImage: `url(${testimonial.image})` }}
                        />
                      </div>

                      {/* Name & Details */}
                      <div className="flex flex-col">
                        <h4 className="text-lg font-extrabold text-[var(--color-accent)] mb-0.5 leading-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-[var(--color-text-light)] mb-1">
                          {testimonial.designation}
                        </p>
                        {/* Stars */}
                        <div className="flex gap-1 text-[var(--color-accent)] text-sm mb-2">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        {/* Small divider line */}
                        <div className="w-8 h-[2px] bg-[var(--color-accent)]" />
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex items-start gap-3">
                      <div className="text-5xl text-gray-200 shrink-0 -mt-2">
                        <FaQuoteLeft />
                      </div>
                      <p className="text-sm text-[var(--color-text-light)] leading-relaxed italic">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows (Visible on larger screens) */}
          {isMounted && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-12 h-12 bg-[#141922] border border-[#222936] rounded-full shadow-lg flex items-center justify-center text-[#FFC107] hover:bg-[#FFC107] hover:text-[#0c0f14] transition-all duration-300 z-10 outline-none focus:outline-none"
                aria-label="Previous testimonial"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={scrollNext}
                className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-12 h-12 bg-[#141922] border border-[#222936] rounded-full shadow-lg flex items-center justify-center text-[#FFC107] hover:bg-[#FFC107] hover:text-[#0c0f14] transition-all duration-300 z-10 outline-none focus:outline-none"
                aria-label="Next testimonial"
              >
                <FaArrowRight />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {isMounted && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full outline-none focus:outline-none transition-colors duration-300 ${index === selectedIndex ? 'bg-[var(--color-accent)]' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
