// ============================================================
// FORGEFIT LANDING TEMPLATE TYPES
// Single source of truth for all components & templates.json
// ============================================================

// ------------------------------------------------------------
// COMMON: TOPBAR & HEADER & FOOTER
// ------------------------------------------------------------

export interface TopBarSocialLink {
  id: string;
  icon: string;
  url: string;
}

export interface TopBarData {
  hours: string;
  phone: string;
  address: string;
  socialLinks: TopBarSocialLink[];
}

export interface HeaderNavLink {
  id: string;
  label: string;
  url: string;
  subLinks?: { id: string; label: string; url: string }[];
}

export interface HeaderData {
  logo: string;
  logoAlt: string;
  navLinks: HeaderNavLink[];
  contactButton: { text: string; url: string };
}

export interface FooterColumnLink {
  id: string;
  label: string;
  url: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterColumnLink[];
}

export interface FooterContactItem {
  id: string;
  icon: string;
  text: string;
}

export interface FooterContact {
  title: string;
  items: FooterContactItem[];
}

export interface ForgeFitFooterData {
  logo: string;
  logoAlt: string;
  description: string;
  socialLinks: { id: string; icon: string; url: string }[];
  columns: FooterColumn[];
  contact?: FooterContact;
  copyright: string;
  bottomCenterText?: string;
}

// ------------------------------------------------------------
// HERO SECTION
// ------------------------------------------------------------

export interface HeroSlide {
  id: string;
  image: string;
  imageAlt: string;
  tagline: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButton: { text: string; url: string };
  secondaryButton?: { text: string; url: string };
}

export interface ForgeFitHeroData {
  footerTags?: string[];
  slides: HeroSlide[];
}

// ------------------------------------------------------------
// ABOUT US SECTION
// ------------------------------------------------------------

export interface AboutFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ForgeFitAboutData {
  image1: string;
  image2: string;
  image1Alt: string;
  image2Alt: string;
  experienceYears: string;
  experienceLabel: string;
  subtitle: string;
  watermarkText?: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  features: AboutFeature[];
  buttonText?: string;
  buttonUrl?: string;
  bottomTags?: string[];
  bottomSlogan?: string;
}

// ------------------------------------------------------------
// TRAINING PROGRAMS SECTION
// ------------------------------------------------------------

export interface TrainingProgramItem {
  id: string;
  image: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  duration?: string;
  level?: string;
  url: string;
}

export interface ForgeFitTrainingData {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonSideLines?: boolean;
  programs: TrainingProgramItem[];
}

// ------------------------------------------------------------
// PROCESS SECTION
// ------------------------------------------------------------

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
}

export interface ForgeFitProcessData {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  image: string;
  imageAlt: string;
  steps: ProcessStep[];
}

// ------------------------------------------------------------
// IMAGE GALLERY SECTION
// ------------------------------------------------------------

export interface GalleryTab {
  id: string;
  label: string;
  category: string;
}

export interface GalleryImageItem {
  id: string;
  category: string;
  image: string;
  imageAlt: string;
}

export interface ForgeFitImageGalleryData {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  loadMoreText: string;
  tabs: GalleryTab[];
  images: GalleryImageItem[];
}

// ------------------------------------------------------------
// TESTIMONIALS SECTION
// ------------------------------------------------------------

export interface TestimonialItem {
  id: string;
  image: string;
  name: string;
  designation: string;
  rating: number;
  text: string;
}

export interface ForgeFitTestimonialsData {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  testimonials: TestimonialItem[];
}

// ------------------------------------------------------------
// COUNTER / STATS SECTION
// ------------------------------------------------------------

export interface CounterStatItem {
  id: string;
  value: string;
  suffix: string;
  label: string;
  icon: string;
}

export interface ForgeFitCounterData {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  backgroundImage: string;
  stats: CounterStatItem[];
}

// ------------------------------------------------------------
// FAQ SECTION
// ------------------------------------------------------------

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQPromo {
  title: string;
  titleHighlight: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  buttonUrl: string;
}

export interface ForgeFitFAQData {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  promo: FAQPromo;
  faqs: FAQItem[];
}

// ------------------------------------------------------------
// CONTACT SECTION
// ------------------------------------------------------------

export interface ContactInfoItem {
  id: string;
  icon: string;
  title: string;
  lines: string[];
}

export interface ContactSocialLink {
  id: string;
  icon: string;
  url: string;
}

export interface ContactSubjectOption {
  id: string;
  value: string;
  label: string;
}

export interface ContactFormFields {
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  subjectLabel: string;
  subjectDefaultOption: string;
  subjectOptions: ContactSubjectOption[];
  messageLabel: string;
  messagePlaceholder: string;
  agreementText: string;
}

export interface ForgeFitContactData {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  contactInfo: ContactInfoItem[];
  socialLinks?: ContactSocialLink[];
  formSubtitle?: string;
  formTitlePart1?: string;
  formTitleHighlight?: string;
  formDescription?: string;
  submitText?: string;
  form?: ContactFormFields;
}

// ------------------------------------------------------------
// GLOBAL UI
// ------------------------------------------------------------

export interface GlobalUIData {
  loading: string;
  notFound?: {
    title: string;
    subtitle: string;
    description: string;
    homeButtonText: string;
    homeButtonUrl: string;
  };
}

// ------------------------------------------------------------
// ROOT TEMPLATE DATA INTERFACE
// ------------------------------------------------------------

export interface ForgeFitTemplateData {
  common: {
    globalUI: GlobalUIData;
    Footer: ForgeFitFooterData;
  };
  categories: {
    ForgeFit: {
      templateComponents?: {
        ForgeFit?: {
          shared?: Record<string, string>;
          pages?: Record<string, { components: { key: string; component: string }[] }>;
        };
      };
      sections: {
        TopBar:       { variants: Record<string, TopBarData> };
        Header:       { variants: Record<string, HeaderData> };
        Hero:         { variants: Record<string, ForgeFitHeroData> };
        AboutUs:      { variants: Record<string, ForgeFitAboutData> };
        Training:     { variants: Record<string, ForgeFitTrainingData> };
        Process:      { variants: Record<string, ForgeFitProcessData> };
        ImageGallery: { variants: Record<string, ForgeFitImageGalleryData> };
        Testimonials: { variants: Record<string, ForgeFitTestimonialsData> };
        Counter:      { variants: Record<string, ForgeFitCounterData> };
        FAQ:          { variants: Record<string, ForgeFitFAQData> };
        Contact:      { variants: Record<string, ForgeFitContactData> };
      };
    };
  };
}
