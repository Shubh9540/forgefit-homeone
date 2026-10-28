'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ForgeFitCounterData } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaUsers, FaDumbbell, FaAward, FaChartLine } from 'react-icons/fa';

// Custom Hook for counting animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isIntersecting, end, duration]);

  return { count, ref };
};

const AnimatedNumber = ({ value, suffix }: { value: string; suffix: string }) => {
  const numValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const { count, ref } = useCountUp(isNaN(numValue) ? 0 : numValue, 2500);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-none mb-1">
      {count}
      {suffix}
    </div>
  );
};

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaUsers': return <FaUsers />;
    case 'FaDumbbell': return <FaDumbbell />;
    case 'FaAward': return <FaAward />;
    case 'FaChartLine': return <FaChartLine />;
    default: return null;
  }
};

export const Counter = ({ data }: { data?: ForgeFitCounterData }) => {
  if (!data) return null;

  return (
    <section id="impact" className="scroll-mt-20">
      <div className="pt-12 md:pt-12 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <SectionHeading
          subtitle={data.subtitle}
          titlePart1={data.titlePart1}
          titleHighlight={data.titleHighlight}
          description={data.description}
          className="!mb-6 md:!mb-8"
        />
      </div>

      {/* Stats Section with Background Image */}
      <div
        className="relative bg-cover bg-center py-20 lg:py-28"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 lg:gap-0">
            {data.stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5 py-2 lg:py-0 lg:px-10 ${
                  index !== data.stats.length - 1 ? 'lg:border-r lg:border-gray-500/50' : ''
                } first:lg:pl-0`}
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-2xl sm:text-3xl shadow-lg shadow-[var(--color-accent)]/30">
                  {renderIcon(stat.icon)}
                </div>

                {/* Text Content */}
                <div className="flex flex-col text-center sm:text-left">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  <p className="text-[10px] sm:text-sm text-gray-300 font-medium tracking-wider uppercase mt-1 sm:mt-0">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
