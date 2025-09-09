// Banner Configuration
export const BANNER_CONFIG = {
  // Current active variant
  activeVariant: 'colorful', // Options: 'minimal', 'colorful', 'business', 'sale', 'news'
  
  // Custom announcements for each variant
  customAnnouncements: {
    minimal: [
      "Free shipping on orders over $50",
      "New arrivals every week",
      "Premium quality guaranteed",
      "Fast delivery in 24-48 hours"
    ],
    colorful: [
      "🎉 Free shipping on orders over $50!",
      "🔥 New arrivals every week!",
      "💎 Premium quality guaranteed!",
      "⚡ Fast delivery in 24-48 hours!",
      "🛡️ Secure payment with SSL encryption!",
      "📱 Download our mobile app for exclusive deals!"
    ],
    business: [
      "Professional Services Available",
      "Enterprise Solutions",
      "24/7 Customer Support",
      "Secure & Reliable Platform",
      "Trusted by 1000+ Companies"
    ],
    sale: [
      "🔥 MEGA SALE - Up to 70% OFF!",
      "⚡ Limited Time Offer - Don't Miss Out!",
      "🎁 Buy 2 Get 1 FREE - Today Only!",
      "💥 Flash Sale - Ends Tonight!",
      "🛒 Free shipping on all orders!"
    ],
    news: [
      "Breaking: New product launch next week!",
      "Update: Improved shipping times across all regions",
      "News: Partnership with leading brands announced",
      "Alert: System maintenance scheduled for tonight",
      "Feature: New mobile app now available!"
    ]
  },
  
  // Auto-switching rules (for SmartBannerBar)
  autoSwitch: {
    enabled: false,
    rules: [
      { time: '09:00-17:00', variant: 'business' },
      { time: '18:00-22:00', variant: 'sale' },
      { time: '22:00-09:00', variant: 'minimal' }
    ]
  }
};

// Helper function to get current variant
export const getCurrentVariant = () => {
  return BANNER_CONFIG.activeVariant;
};

// Helper function to get custom announcements
export const getCustomAnnouncements = (variant = null) => {
  const targetVariant = variant || BANNER_CONFIG.activeVariant;
  return BANNER_CONFIG.customAnnouncements[targetVariant] || null;
};
