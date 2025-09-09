import React from 'react';
import { 
  MinimalBannerBar, 
  ColorfulBannerBar, 
  BusinessBannerBar, 
  SaleBannerBar, 
  NewsTickerBannerBar 
} from '../../../components/BannerBarVariants';
import { getCurrentVariant, getCustomAnnouncements } from '../../../config/bannerConfig';

function BannerBar() {
  // Get the current variant from configuration
  const bannerVariant = getCurrentVariant();
  const customAnnouncements = getCustomAnnouncements();
  
  const renderBanner = () => {
    const props = customAnnouncements ? { announcements: customAnnouncements } : {};
    
    switch (bannerVariant) {
      case 'minimal':
        return <MinimalBannerBar {...props} />;
      case 'colorful':
        return <ColorfulBannerBar {...props} />;
      case 'business':
        return <BusinessBannerBar {...props} />;
      case 'sale':
        return <SaleBannerBar {...props} />;
      case 'news':
        return <NewsTickerBannerBar {...props} />;
      default:
        return <ColorfulBannerBar {...props} />;
    }
  };

  return renderBanner();
}

export default BannerBar;
