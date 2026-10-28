import React from 'react';
import { TopBarData } from '@/types/templates.types';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGlobe, FaClock, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaFacebookF': return <FaFacebookF />;
    case 'FaTwitter': return <FaTwitter />;
    case 'FaInstagram': return <FaInstagram />;
    case 'FaYoutube': return <FaYoutube />;
    case 'FaGlobe': return <FaGlobe />;
    default: return null;
  }
};

export const TopBar = ({ data }: { data?: TopBarData }) => {
  if (!data) return null;

  return (
    <div className="hidden lg:flex justify-between items-center bg-[var(--color-primary)] text-white py-2 px-8 text-sm">
      {/* Left Side - Contact Info */}
      <div className="flex items-center gap-6">
        {data.hours && (
          <div className="flex items-center gap-2">
            <FaClock className="text-white" />
            <span>{data.hours}</span>
          </div>
        )}
        
        {data.hours && data.phone && <span className="text-white/50">|</span>}
        
        {data.phone && (
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-white" />
            <span>{data.phone}</span>
          </div>
        )}
        
        {data.phone && data.address && <span className="text-white/50">|</span>}
        
        {data.address && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-white" />
            <span>{data.address}</span>
          </div>
        )}
      </div>

      {/* Right Side - Social Icons */}
      <div className="flex items-center gap-4">
        {data.socialLinks?.map((link) => (
          <a
            key={link.id}
            href={link.url}
            className="hover:text-black transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {renderIcon(link.icon)}
          </a>
        ))}
      </div>
    </div>
  );
};
