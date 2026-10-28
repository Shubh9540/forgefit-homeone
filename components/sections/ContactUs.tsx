import React from 'react';
import { ForgeFitContactData } from '@/types/templates.types';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const iconMap: Record<string, React.ReactNode> = {
  FaPhoneAlt: <FaPhoneAlt />,
  FaEnvelope: <FaEnvelope />,
  FaMapMarkerAlt: <FaMapMarkerAlt />,
  FaClock: <FaClock />,
  FaFacebookF: <FaFacebookF />,
  FaInstagram: <FaInstagram />,
  FaYoutube: <FaYoutube />,
  FaLinkedinIn: <FaLinkedinIn />,
};

export const ContactUs = ({ data }: { data?: ForgeFitContactData }) => {
  if (!data) return null;

  return (
    <section id="contact" className="py-16 lg:py-12 bg-[#0c0f14] relative scroll-mt-20">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Info */}
          <div className="pt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[var(--color-primary)]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">
                {data.subtitle}
              </span>
            </div>

            <h2 className="text-4xl md:text-[46px] font-black text-white leading-[1.15] mb-6 whitespace-pre-line">
              {data.titlePart1}
              <span className="text-[var(--color-primary)]">{data.titleHighlight}</span>
            </h2>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-md">
              {data.description}
            </p>

            <div className="flex flex-col gap-8 mb-12">
              {data.contactInfo.map((info) => (
                <div key={info.id} className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-black flex items-center justify-center shrink-0 text-xl font-bold shadow-md">
                    {iconMap[info.icon] || <FaPhoneAlt />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1.5 leading-tight text-lg">
                      {info.title}
                    </h4>
                    {info.lines.map((line, idx) => (
                      <p key={idx} className="text-sm text-gray-400 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            {data.socialLinks && (
              <div className="flex gap-4">
                {data.socialLinks.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-[#141922] border border-[#222936] text-white flex items-center justify-center text-sm hover:bg-[var(--color-primary)] hover:text-black transition-colors"
                  >
                    {iconMap[social.icon]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#141922] rounded-xl shadow-xl p-8 md:p-12 border border-[#1f2735]">
            <div className="flex items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-[var(--color-primary)]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                    {data.formSubtitle}
                  </span>
                </div>
                <h3 className="text-3xl md:text-[38px] font-black text-white leading-tight">
                  {data.formTitlePart1}
                  <span className="text-[var(--color-primary)]">{data.formTitleHighlight}</span>
                </h3>
              </div>
              <p className="text-xs text-gray-400 max-w-[120px] text-right hidden sm:block">
                {data.formDescription}
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    {data.form?.fullNameLabel || 'Full Name'} <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={data.form?.fullNamePlaceholder || 'Your full name'}
                    className="w-full bg-[#0c0f14] border border-[#222936] text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    {data.form?.emailLabel || 'Email Address'} <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder={data.form?.emailPlaceholder || 'Your email address'}
                    className="w-full bg-[#0c0f14] border border-[#222936] text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    {data.form?.phoneLabel || 'Phone Number'} <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder={data.form?.phonePlaceholder || 'Your phone number'}
                    className="w-full bg-[#0c0f14] border border-[#222936] text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    {data.form?.subjectLabel || 'Subject'} <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <select className="w-full bg-[#0c0f14] border border-[#222936] text-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none">
                    <option value="">{data.form?.subjectDefaultOption || 'Select a subject'}</option>
                    {data.form?.subjectOptions.map((opt) => (
                      <option key={opt.id} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    {data.form?.messageLabel || 'Message'} <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <textarea
                    placeholder={data.form?.messagePlaceholder || 'Write your message here...'}
                    rows={4}
                    className="w-full bg-[#0c0f14] border border-[#222936] text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] accent-[var(--color-primary)]" />
                  <span className="text-xs text-gray-400">
                    {data.form?.agreementText || 'I agree to be contacted by ForgeFit.'}
                  </span>
                </label>

                <button
                  type="submit"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-accent-light)] text-black font-bold py-3 px-8 rounded transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
                >
                  {data.submitText}
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
