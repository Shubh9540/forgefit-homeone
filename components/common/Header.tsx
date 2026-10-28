'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { HeaderData } from '@/types/templates.types';
import { FaArrowRight, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export const Header = ({ data }: { data?: HeaderData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!data) return null;

  return (
    <header className="w-full bg-[#111620] border-b border-[#1f2735] shadow-lg sticky top-0 z-40">
      <div className="flex items-center justify-between h-20 lg:h-24">

        {/* Logo */}
        <div className="relative h-full w-[280px] sm:w-[340px] lg:w-[420px] xl:w-[38rem]">
          <div
            className="absolute top-0 left-0 w-full h-full bg-[var(--color-primary)]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
          />
          <div
            className="absolute top-0 left-0 w-[98%] h-full bg-[#0a0d14] flex items-center pl-4 sm:pl-8 lg:pl-10 pr-6 lg:pr-12"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
          >
            <Link href="/" className="relative z-10 block">
              <img
                src={data.logo}
                alt={data.logoAlt}
                className="h-16 sm:h-20 lg:h-28 max-h-[85px] w-auto object-contain drop-shadow-md"
              />
            </Link>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-6 xl:gap-16 pr-8 lg:pr-12" ref={dropdownRef}>
          <nav className="flex items-center gap-4 xl:gap-8">
            {data.navLinks.map((link, index) => {
              const isActive = index === 0;
              const hasDropdown = link.subLinks && link.subLinks.length > 0;
              const isOpen = openDropdown === link.id;

              return (
                <div key={link.id} className="relative">
                  {hasDropdown ? (
                    /* Dropdown trigger — no link, just a button */
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : link.id)}
                      className="flex items-center gap-1 font-semibold text-sm xl:text-base whitespace-nowrap text-white/90 hover:text-[var(--color-primary)] transition-colors duration-300 group"
                    >
                      {link.label}
                      <FaChevronDown
                        className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.url || '#'}
                      className={`font-semibold text-sm xl:text-base whitespace-nowrap relative group transition-colors duration-300
                        ${isActive ? 'text-[var(--color-primary)]' : 'text-white/90 hover:text-[var(--color-primary)]'}
                      `}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[var(--color-primary)]" />
                      )}
                      {!isActive && (
                        <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
                      )}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {hasDropdown && isOpen && (
                    <div className="absolute top-full left-0 mt-3 bg-[#141922] shadow-xl border-t-2 border-[var(--color-primary)] min-w-[200px] z-50">
                      {link.subLinks!.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.url}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-5 py-3 text-sm text-gray-200 hover:text-black hover:bg-[var(--color-primary)] border-b border-gray-800 last:border-0 transition-colors font-medium"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Contact Button */}
          <Link
            href={data.contactButton.url}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-accent-light)] text-black px-6 xl:px-8 py-3 flex items-center justify-center gap-2 font-bold whitespace-nowrap transition-all duration-300 shadow-md"
          >
            {data.contactButton.text}
            <FaArrowRight className="text-sm font-light" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden pr-4 sm:pr-8 flex items-center">
          <button
            className="text-[var(--color-primary)] text-3xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#141922] shadow-2xl border-t border-[#222936] flex flex-col py-4 px-6 gap-1 z-50">
          {data.navLinks.map((link, index) => {
            const isActive = index === 0;
            const hasDropdown = link.subLinks && link.subLinks.length > 0;
            const isMobOpen = openMobileDropdown === link.id;

            return (
              <div key={link.id}>
                {hasDropdown ? (
                  <>
                    <button
                      onClick={() => setOpenMobileDropdown(isMobOpen ? null : link.id)}
                      className="w-full flex items-center justify-between font-semibold text-base pb-2 border-b border-[#222936] text-white hover:text-[#FFC107] py-2"
                    >
                      {link.label}
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${isMobOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`} />
                    </button>
                    {isMobOpen && (
                      <div className="flex flex-col gap-1 pl-4 py-2 border-b border-gray-100">
                        {link.subLinks!.map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.url}
                            onClick={() => { setIsMobileMenuOpen(false); setOpenMobileDropdown(null); }}
                            className="text-sm text-gray-500 hover:text-[var(--color-primary)] py-1 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.url || '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-semibold text-base block py-2 border-b border-[#222936] last:border-0 transition-colors duration-300
                      ${isActive ? 'text-[#FFC107]' : 'text-gray-200 hover:text-[#FFC107]'}
                    `}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}

          <Link
            href={data.contactButton.url}
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white px-6 py-3 rounded text-center font-semibold mt-2 transition-all duration-300"
          >
            {data.contactButton.text}
          </Link>
        </div>
      )}
    </header>
  );
};
