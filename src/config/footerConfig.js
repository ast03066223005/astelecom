import { socialLinks } from './constants';
// Footer Configuration
export const FOOTER_CONFIG = {
  // Current active variant
  activeVariant: 'simple', // Options: 'simple', 'enhanced', 'minimal'
  
  // Social media links (update these with your actual social media URLs)
  socialLinks: {
    facebook: socialLinks.facebook,
    twitter: socialLinks.twitter,
    instagram: socialLinks.instagram,
    linkedin: socialLinks.linkedin,
    youtube: socialLinks.youtube,
    tiktok: socialLinks.tiktok,
    whatsapp: socialLinks.whatsapp,
    telegram: socialLinks.telegram
  },
  
  // Company information
  companyInfo: {
    name: 'AST',
    description: 'Your trusted partner for quality products and exceptional service.',
    email: 'info@ast.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345'
  },
  
  // Quick links
  quickLinks: [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
  ],
  
  // Support links
  supportLinks: [
    { name: 'Help Center', link: '/help' },
    { name: 'Shipping Info', link: '/shipping' },
    { name: 'Returns', link: '/returns' },
    { name: 'Size Guide', link: '/size-guide' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Track Order', link: '/track' }
  ],
  
  // Legal links
  legalLinks: [
    { name: 'Privacy Policy', link: '/privacy' },
    { name: 'Terms of Service', link: '/terms' },
    { name: 'Cookie Policy', link: '/cookies' },
    { name: 'Refund Policy', link: '/refund' }
  ]
};

// Helper function to get current variant
export const getCurrentFooterVariant = () => {
  return FOOTER_CONFIG.activeVariant;
};

// Helper function to get social links
export const getSocialLinks = () => {
  return FOOTER_CONFIG.socialLinks;
};

// Helper function to get company info
export const getCompanyInfo = () => {
  return FOOTER_CONFIG.companyInfo;
};
