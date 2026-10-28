import React from 'react';
import { ForgeFitProcessData } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaClipboardList, FaDumbbell, FaChartLine } from 'react-icons/fa';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaClipboardList':
      return <FaClipboardList />;
    case 'FaDumbbell':
      return <FaDumbbell />;
    case 'FaChartLine':
      return <FaChartLine />;
    default:
      return null;
  }
};

export const ProcessSection = ({ data }: { data?: ForgeFitProcessData }) => {
  if (!data) return null;

  return (
    <section id="process" className="relative py-12 lg:py-16 bg-[#0c0f14] overflow-hidden flex items-center scroll-mt-20">
      {/* Right side image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[35%] xl:w-[38%] hidden lg:flex justify-end z-0 pointer-events-none h-full opacity-60">
        <img 
          src={data.image} 
          alt={data.imageAlt} 
          className="w-full h-full object-cover object-left" 
        />
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-10 lg:px-12 relative z-10 flex">
        {/* Left side content */}
        <div className="w-full lg:w-[65%] xl:w-[62%] lg:pr-6 py-4">
          <SectionHeading
            subtitle={data.subtitle}
            titlePart1={data.titlePart1}
            titleHighlight={data.titleHighlight}
            description={data.description}
            className="!mb-10"
          />

          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 relative">
            {data.steps?.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Item */}
                <div className="flex flex-col items-center text-center w-full max-w-xs mx-auto">
                  {/* Number & Icon container */}
                  <div className="flex items-center justify-center gap-3 h-20 mb-2">
                    <span className="text-7xl md:text-8xl font-black text-white/10 leading-none select-none">
                      {step.stepNumber}
                    </span>
                    <div className="text-4xl text-[var(--color-primary)]">
                      {renderIcon(step.icon)}
                    </div>
                  </div>
                  {/* Title */}
                  <h3 className="text-sm font-black text-white uppercase mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed px-1">
                    {step.description}
                  </p>
                </div>

                {/* Dashed Arrow (except after last step) */}
                {index < (data.steps?.length || 0) - 1 && (
                  <div className="hidden lg:block w-10 xl:w-14 shrink-0 text-[var(--color-primary)] opacity-40 mt-8 -mx-4">
                    <svg className="w-full h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" viewBox="0 0 100 40">
                      <path d="M 0 30 Q 50 0 95 25" />
                      <path d="M 85 15 L 98 27 L 85 35" strokeDasharray="none" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
