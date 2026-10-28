import React from 'react';
import { ForgeFitTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';
import { TopBar } from '@/components/common/TopBar';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  const templateData: ForgeFitTemplateData = rawData as any;
  const sectionData = templateData?.categories?.ForgeFit?.sections;
  const commonData = templateData?.common;

  if (!sectionData) return null;

  return (
    <main className="bg-[var(--color-bg-main)] min-h-screen flex flex-col">
      <TopBar data={sectionData.TopBar?.variants?.ForgeFitTopBar1} />
      
      <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-4">{commonData?.globalUI?.notFound?.title || '404'}</h1>
        <h2 className="text-2xl text-white mb-4">{commonData?.globalUI?.notFound?.subtitle || 'Page Not Found'}</h2>
        <p className="text-[var(--color-text-light)] mb-8 max-w-md mx-auto" dangerouslySetInnerHTML={{ __html: commonData?.globalUI?.notFound?.description || '' }} />
        
        <a href={commonData?.globalUI?.notFound?.homeButtonUrl || '/'} className="px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-md hover:bg-[var(--color-accent)] transition-colors duration-300">
          {commonData?.globalUI?.notFound?.homeButtonText || 'Back to Home'}
        </a>
      </div>
    </main>
  );
}
