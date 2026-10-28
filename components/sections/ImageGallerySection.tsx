'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ForgeFitImageGalleryData } from '@/types/templates.types';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export const ImageGallerySection = ({ data }: { data?: ForgeFitImageGalleryData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!data) return null;

  const filteredImages = activeTab === 'all'
    ? data.images
    : data.images.filter(img => img.category === activeTab);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setVisibleCount(8);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % visibleImages.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + visibleImages.length) % visibleImages.length);
    }
  };

  return (
    <section id="gallery" className="bg-[#10141b] py-12 lg:py-12 relative scroll-mt-20">
      <div className="max-w-[1250px] mx-auto px-4 md:px-6">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between items-start lg:items-end mb-8">
          <div className="w-full lg:max-w-md shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[2px] bg-[var(--color-primary)]"></div>
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                {data.subtitle}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3">
              {data.titlePart1} <span className="text-[var(--color-primary)]">{data.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Tabs - Single Line Scrollable without visible scrollbar */}
          <div className="flex flex-row overflow-x-auto gap-2 lg:gap-3 w-full lg:w-auto pb-2 -mb-2 lg:pb-0 lg:mb-0 lg:justify-end [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {data.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-3 sm:px-4 py-1.5 rounded border transition-colors text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 ${activeTab === tab.id
                    ? 'bg-[var(--color-primary)] text-black font-bold border-[var(--color-primary)]'
                    : 'bg-[#181d26] text-gray-300 border-[#222936] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visibleImages.map((img, idx) => (
            <div
              key={img.id}
              className="relative w-full aspect-square group overflow-hidden rounded cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={img.image}
                alt={img.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-black flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-black font-bold px-8 py-3 rounded hover:bg-[var(--color-accent-light)] transition-colors shadow-md"
            >
              {data.loadMoreText}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-[var(--color-primary)] transition-colors text-3xl z-50"
          >
            <FaTimes />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white hover:text-[var(--color-primary)] transition-colors text-4xl sm:text-5xl z-50"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white hover:text-[var(--color-primary)] transition-colors text-4xl sm:text-5xl z-50"
          >
            <FaChevronRight />
          </button>

          <div className="relative w-full max-w-5xl aspect-square sm:aspect-video rounded overflow-hidden">
            <Image
              src={visibleImages[lightboxIndex].image}
              alt={visibleImages[lightboxIndex].imageAlt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};
