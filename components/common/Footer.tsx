import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ForgeFitFooterData } from '@/types/templates.types';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaChevronRight
} from 'react-icons/fa';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaFacebookF': return <FaFacebookF />;
    case 'FaInstagram': return <FaInstagram />;
    case 'FaYoutube': return <FaYoutube />;
    case 'FaLinkedinIn': return <FaLinkedinIn />;
    case 'FaMapMarkerAlt': return <FaMapMarkerAlt />;
    case 'FaPhoneAlt': return <FaPhoneAlt />;
    case 'FaEnvelope': return <FaEnvelope />;
    case 'FaClock': return <FaClock />;
    default: return null;
  }
};

export const Footer = ({ data }: { data?: ForgeFitFooterData }) => {
  if (!data) return null;

  return (
    <footer className="bg-[#111111] text-white pt-12 relative overflow-hidden mt-auto">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0 opacity-20 bg-right bg-no-repeat bg-cover md:bg-cover" style={{ backgroundImage: "url('/main logo/footer_bg_gold.webp')" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-12 gap-10 pb-16 border-b border-gray-800">

          {/* Column 1: Logo & Description */}
          <div className="flex flex-col gap-6 lg:pr-4">
            <Link href="/" className="inline-block w-fit mb-2">
              <img
                src={data.logo}
                alt={data.logoAlt}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {data.description}
            </p>
            <div className="flex items-center gap-4 mt-2">
              {data.socialLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 shrink-0"
                >
                  {renderIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>

          {/* Columns 2, 3, 4: Links */}
          {data.columns.map((col) => (
            <div key={col.id} className="flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white relative w-fit">
                {col.title}
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-[var(--color-primary)]"></div>
              </h3>
              <ul className="flex flex-col gap-4 mt-2">
                {col.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-[var(--color-primary)] transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Contact (Get In Touch) */}
          {data.contact && (
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white relative w-fit">
                {data.contact.title}
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-[var(--color-primary)]"></div>
              </h3>
              <ul className="flex flex-col gap-5 mt-2">
                {data.contact.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-1">
                      {renderIcon(item.icon)}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4 text-xs text-gray-500">
          <p>{data.copyright}</p>

          {data.bottomCenterText && (
            <div className="flex items-center gap-4 text-gray-400 font-bold tracking-[0.2em]">
              <div className="w-8 h-[1px] bg-[var(--color-primary)]" />
              {data.bottomCenterText}
              <div className="w-8 h-[1px] bg-[var(--color-primary)]" />
            </div>
          )}

          {/* bottomLinks removed as requested */}
        </div>
      </div>
    </footer>
  );
};
