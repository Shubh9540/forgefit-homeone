'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { ForgeFitTrainingData } from '@/types/templates.types';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const TrainingPrograms = ({ data }: { data?: ForgeFitTrainingData }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (!data) return null;

  return (
    <section id="programs" className="py-16 lg:py-12 bg-[#10141b] relative overflow-hidden scroll-mt-20">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <SectionHeading
          subtitle={data.subtitle}
          titlePart1={data.titlePart1}
          titleHighlight={data.titleHighlight}
          description={data.description}
        />
        
        {/* Grid of Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {data.programs?.map((prog, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={prog.id}
                className="relative w-full h-[240px] lg:h-[250px] flex overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-[#141922] border border-[#1f2735] rounded-md group"
              >
                {isEven ? (
                  /* IMAGE LEFT, TEXT RIGHT */
                  <>
                    {/* Left Image Wrapper */}
                    <div className="relative w-[50%] lg:w-[55%] h-full z-10">
                      {/* Orange Slanted Border Background */}
                      <div className="absolute inset-0 bg-[var(--color-primary)] [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)] transition-transform duration-500 group-hover:scale-105" />
                      {/* Actual Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center [clip-path:polygon(0_0,calc(100%-4px)_0,calc(80%-4px)_100%,0_100%)] transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${prog.image})` }}
                        title={prog.imageAlt}
                      />
                    </div>
                    {/* Right Text Wrapper */}
                    <div className="absolute top-0 right-0 w-[55%] lg:w-[52%] h-full bg-[#141922] z-0 pl-8 lg:pl-10 pr-4 lg:pr-5 py-5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-3xl lg:text-4xl font-black text-transparent opacity-30 tracking-tight"
                          style={{ WebkitTextStroke: '1px #ffffff' }}
                        >
                          {prog.category}
                        </span>
                        <div className="w-6 h-[2px] bg-[var(--color-primary)] mt-1" />
                      </div>
                      <h3 className="text-base lg:text-lg font-extrabold text-white leading-tight mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-[11px] lg:text-xs text-gray-400 leading-relaxed line-clamp-3 mb-3">
                        {prog.description}
                      </p>
                      <Link
                        href="#contact"
                        className="mt-auto flex items-center gap-2 text-[11px] lg:text-xs font-bold text-white hover:text-[var(--color-primary)] transition-colors duration-300"
                      >
                        Get In Touch
                        <div className="w-4 h-4 rounded-full border border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)]">
                          <FaArrowRight className="text-[8px]" />
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  /* TEXT LEFT, IMAGE RIGHT */
                  <>
                    {/* Left Text Wrapper */}
                    <div className="absolute top-0 left-0 w-[55%] lg:w-[52%] h-full bg-[#131313] z-0 pr-8 lg:pr-10 pl-5 lg:pl-6 py-5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-3xl lg:text-4xl font-black text-transparent opacity-40 tracking-tight"
                          style={{ WebkitTextStroke: '1px #ffffff' }}
                        >
                          {prog.category}
                        </span>
                        <div className="w-6 h-[2px] bg-[var(--color-primary)] mt-1" />
                      </div>
                      <h3 className="text-base lg:text-lg font-extrabold text-white leading-tight mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-[11px] lg:text-xs text-gray-400 leading-relaxed line-clamp-3 mb-3">
                        {prog.description}
                      </p>
                      <Link
                        href="#contact"
                        className="mt-auto flex items-center gap-2 text-[11px] lg:text-xs font-bold text-white hover:text-[var(--color-primary)] transition-colors duration-300"
                      >
                        Get In Touch
                        <div className="w-4 h-4 rounded-full border border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)]">
                          <FaArrowRight className="text-[8px]" />
                        </div>
                      </Link>
                    </div>
                    {/* Right Image Wrapper */}
                    <div className="relative w-[50%] lg:w-[55%] ml-auto h-full z-10">
                      {/* Orange Slanted Border Background */}
                      <div className="absolute inset-0 bg-[var(--color-primary)] [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)] transition-transform duration-500 group-hover:scale-105" />
                      {/* Actual Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center [clip-path:polygon(calc(20%+4px)_0,100%_0,100%_100%,4px_100%)] transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${prog.image})` }}
                        title={prog.imageAlt}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Button */}
        {isHomePage && data.buttonText && (
          <Button
            text={data.buttonText}
            url={data.buttonUrl}
            withSideLines={data.buttonSideLines}
          />
        )}
      </div>
    </section>
  );
};
