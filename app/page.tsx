import React from 'react';
import { ForgeFitTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';
import { TopBar } from '@/components/common/TopBar';
import { Header } from '@/components/common/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutUs } from '@/components/sections/AboutUs';
import { TrainingPrograms } from '@/components/sections/TrainingPrograms';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ImageGallerySection } from '@/components/sections/ImageGallerySection';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQSection } from '@/components/sections/FAQSection';
import { Counter } from '@/components/sections/Counter';
import { ContactUs } from '@/components/sections/ContactUs';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  const templateData: ForgeFitTemplateData = rawData as ForgeFitTemplateData;
  const sectionData = templateData?.categories?.ForgeFit?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) {
    return <div className="text-white p-10">{commonData?.globalUI?.loading || 'Loading...'}</div>;
  }

  return (
    <main className="bg-[var(--color-bg-main)] min-h-screen flex flex-col scroll-smooth w-full overflow-x-hidden">
      <TopBar data={sectionData.TopBar?.variants?.ForgeFitTopBar2} />
      <Header data={sectionData.Header?.variants?.ForgeFitHeader2} />
      <HeroSection data={sectionData.Hero?.variants?.ForgeFitHero2} />
      <AboutUs data={sectionData.AboutUs?.variants?.ForgeFitAbout2} />
      <TrainingPrograms data={sectionData.Training?.variants?.ForgeFitTraining2} />
      <ProcessSection data={sectionData.Process?.variants?.ForgeFitProcess2} />
      <ImageGallerySection data={sectionData.ImageGallery?.variants?.ForgeFitImageGallery2} />
      <Testimonials data={sectionData.Testimonials?.variants?.ForgeFitTestimonials2} />
      <FAQSection data={sectionData.FAQ?.variants?.ForgeFitFAQ2} />
      <Counter data={sectionData.Counter?.variants?.ForgeFitCounter2} />
      <ContactUs data={sectionData.Contact?.variants?.ForgeFitContact2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}
