'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgeFitFAQData } from '@/types/templates.types';
import { FaHeadset, FaShieldAlt, FaUsers, FaFileAlt, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
  FaHeadset: <FaHeadset />,
  FaShieldAlt: <FaShieldAlt />,
  FaUsers: <FaUsers />,
  FaFileAlt: <FaFileAlt />,
  FaPhoneAlt: <FaPhoneAlt />,
  FaEnvelope: <FaEnvelope />,
  FaMapMarkerAlt: <FaMapMarkerAlt />
};

export const FAQSection = ({ data }: { data?: ForgeFitFAQData }) => {
  const [openId, setOpenId] = useState<string | null>(data?.faqs[0]?.id || null);

  if (!data) return null;

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-[#0c0f14] py-12 lg:py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">



        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            {/* Promo Card */}
            <div className="relative rounded-lg overflow-hidden bg-black aspect-[3/5] group border border-[#1f2735]">
              <Image src={data.promo.image} alt={data.promo.imageAlt} fill className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
              <div className="absolute inset-0 p-8 flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent">
                <div className="mt-auto">
                  <h3 className="text-3xl font-bold text-white leading-none mb-1">{data.promo.title}</h3>
                  <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{data.promo.titleHighlight}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {data.promo.description}
                  </p>
                  <Link href={data.promo.buttonUrl} className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-black font-bold py-3 px-6 rounded hover:bg-[var(--color-accent-light)] transition-colors w-fit">
                    {data.promo.buttonText} &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Right FAQ List */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-[var(--color-primary)]"></div>
              <span className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">
                {data.subtitle}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
                {data.titlePart1} <span className="text-[var(--color-primary)]">{data.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed md:max-w-xs pt-2">
                {data.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {data.faqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                const num = (index + 1).toString().padStart(2, '0');

                return (
                  <div
                    key={faq.id}
                    className={`rounded-lg overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#181f2c] border border-[var(--color-primary)]' : 'bg-[#141922] border border-[#1f2735] hover:border-gray-700 shadow-sm'}`}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-5 flex items-center gap-4 text-left focus:outline-none"
                    >
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--color-primary)] text-black flex items-center justify-center font-bold text-sm">
                        {num}
                      </div>
                      <h3 className="font-bold text-white text-base flex-1 pr-4">{faq.question}</h3>
                      <div className={`text-[var(--color-primary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        {isOpen ? <FaMinus /> : <FaPlus />}
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pl-[4.5rem] text-gray-400 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
