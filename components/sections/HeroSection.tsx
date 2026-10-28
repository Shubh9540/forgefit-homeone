'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ForgeFitHeroData } from '@/types/templates.types';
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from 'react-icons/fa';

export const HeroSection = ({ data }: { data?: ForgeFitHeroData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!data || !data.slides || data.slides.length === 0) return null;

  const slides = data.slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section id="home" className="relative w-full h-[30rem] md:h-[25rem] lg:h-[30rem] overflow-hidden bg-[#111] scroll-mt-20">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide
            ? 'opacity-100 z-10'
            : 'opacity-0 z-0'
            }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-[position:70%_center] lg:bg-[position:72%_center]"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />

          {/* Overall image darkening */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Diagonal Stripes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Thin Stripe */}
            <div className="absolute -top-[20%] left-[38%] md:left-[40%] w-[15px] md:w-[25px] h-[150%] rotate-[26deg] bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/40 to-transparent origin-center" />
            {/* Thick Stripe */}
            <div className="absolute -top-[20%] left-[44%] md:left-[44%] w-[50px] md:w-[85px] h-[150%] rotate-[26deg] bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/40 to-transparent origin-center" />
          </div>

          {/* Left dark gradient */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-[linear-gradient(90deg,rgba(7,7,7,0.96)_0%,rgba(8,8,8,0.92)_35%,rgba(10,10,10,0.75)_60%,rgba(10,10,10,0.28)_82%,rgba(10,10,10,0)_100%)]"
          />

          {/* Bottom warm glow */}
          <div
            className="absolute left-0 bottom-0 w-[60%] h-[85%] pointer-events-none bg-[radial-gradient(circle_at_12%_88%,rgba(255,193,7,0.25)_0%,rgba(255,193,7,0.1)_30%,rgba(255,193,7,0.03)_52%,transparent_72%)]"
          />

          {/* Top Left Orange Wedge */}
          <div
            className="absolute top-0 left-0 w-20 lg:w-24 h-40 lg:h-16 bg-[var(--color-primary)] z-[12] [clip-path:polygon(0_0,100%_0,42%_100%,0_100%)]"
          />

          {/* Main Orange Diagonal Strip */}
          <div
            className="absolute top-0 left-[42%] lg:left-[46%] h-full w-24 lg:w-32 bg-[var(--color-primary)]/90 z-[12] hidden md:block [clip-path:polygon(45%_0,100%_0,55%_100%,0_100%)]"
          />

          {/* Secondary Transparent Orange Strip */}
          <div
            className="absolute top-0 left-[50%] lg:left-[53%] h-full w-24 lg:w-32 bg-[var(--color-primary)]/65 z-[11] hidden md:block [clip-path:polygon(45%_0,100%_0,55%_100%,0_100%)]"
          />

          {/* Subtle Orange Glow Between Strips */}
          <div
            className="absolute top-0 left-[43%] lg:left-[47%] h-full w-56 z-[10] hidden md:block pointer-events-none bg-[linear-gradient(90deg,transparent_0%,rgba(245,132,31,0.5)_35%,rgba(245,132,31,0.25)_65%,transparent_100%)] blur-[10px] -skew-x-[16deg]"
          />

          {/* Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 xl:px-24 flex flex-col pt-16 sm:pt-12 pb-12 sm:pb-8">
            <div className="max-w-xl text-white my-auto">
              {/* Tagline */}
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className="w-8 sm:w-10 lg:w-12 h-1 bg-[var(--color-primary)]" />

                <p className="text-xs font-medium tracking-[0.15em] sm:tracking-[0.18em] uppercase text-white/90 leading-[1.35]">
                  {slide.tagline}
                </p>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] sm:leading-[0.98] tracking-[-0.02em] sm:tracking-[-0.03em] mb-4">
                {slide.title}{' '}
                <span className="text-[var(--color-primary)] block sm:inline mt-1 sm:mt-0">
                  {slide.titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-white/90 text-xs sm:text-sm lg:text-base leading-[1.5] sm:leading-[1.4] mb-6 sm:mb-5 max-w-[470px]">
                {slide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={slide.primaryButton.url}
                  className="w-full sm:w-auto min-w-40 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-black px-7 py-3 sm:py-3.5 font-bold flex items-center justify-center gap-3 transition-all duration-300 text-sm"
                >
                  {slide.primaryButton.text}
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>

              {/* Footer Tags */}
              {data.footerTags && (
                <div className="hidden sm:flex items-center gap-3 lg:gap-4 text-xs font-medium tracking-[0.18em] text-white/90 mt-10 uppercase">
                  {data.footerTags.map((tag, i) => (
                    <React.Fragment key={i}>
                      <span>{tag}</span>

                      {i < data.footerTags!.length - 1 && (
                        <span className="text-[var(--color-primary)]">
                          |
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 left-4 z-30 -translate-y-1/2 w-11 h-11 rounded-full border border-white/80 items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-sm" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute top-1/2 right-4 z-30 -translate-y-1/2 w-11 h-11 rounded-full border border-white/80 items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-sm" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-12 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${index === currentSlide
              ? 'w-2.5 h-2.5 bg-[var(--color-primary)]'
              : 'w-2.5 h-2.5 bg-white hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};