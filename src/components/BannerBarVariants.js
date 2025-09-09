import React from 'react';
import AutoScrolling from './AutoScrolling';

// Variant 1: Minimal style
export function MinimalBannerBar() {
  const announcements = [
    "Free shipping on orders over $50",
    "New arrivals every week",
    "Premium quality guaranteed",
    "Fast delivery in 24-48 hours"
  ];

  return (
    <div className="bg-gray-800 text-white py-1 text-center">
      <AutoScrolling
        items={announcements}
        speed={0.6}
        direction="horizontal"
        repeatCount={3}
        itemClassName="text-xs font-light px-4 text-white"
        containerClassName="h-6 flex items-center"
      />
    </div>
  );
}

// Variant 2: Colorful style
export function ColorfulBannerBar() {
  const announcements = [
    "🎉 Free shipping on orders over $50!",
    "🔥 New arrivals every week!",
    "💎 Premium quality guaranteed!",
    "⚡ Fast delivery in 24-48 hours!"
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-2 relative overflow-hidden">
      <div className="w-screen mx-auto">
        <AutoScrolling
          items={announcements}
          speed={0.7}
          direction="horizontal"
          repeatCount={3}
          itemClassName="text-sm font-semibold whitespace-nowrap px-6 text-white gap-4"
          containerClassName="h-4 flex items-center"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}

// Variant 3: Business style
export function BusinessBannerBar() {
  const announcements = [
    "Professional Services Available",
    "Enterprise Solutions",
    "24/7 Customer Support",
    "Secure & Reliable Platform"
  ];

  return (
    <div className="bg-blue-900 text-white py-1">
      <div className="container mx-auto px-4">
        <AutoScrolling
          items={announcements}
          speed={0.5}
          direction="horizontal"
          repeatCount={2}
          itemClassName="text-sm font-medium whitespace-nowrap px-8 text-white"
          containerClassName="h-7 flex items-center"
        />
      </div>
    </div>
  );
}

// Variant 4: Sale style
export function SaleBannerBar() {
  const announcements = [
    "🔥 MEGA SALE - Up to 70% OFF!",
    "⚡ Limited Time Offer - Don't Miss Out!",
    "🎁 Buy 2 Get 1 FREE - Today Only!",
    "💥 Flash Sale - Ends Tonight!"
  ];

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AutoScrolling
          items={announcements}
          speed={1}
          direction="horizontal"
          repeatCount={4}
          itemClassName="text-sm font-bold whitespace-nowrap px-6 animate-pulse text-white"
          containerClassName="h-8 flex items-center"
          pauseOnHover={true}
        />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-red-500 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-orange-500 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}

// Variant 5: News ticker style
export function NewsTickerBannerBar() {
  const announcements = [
    "Breaking: New product launch next week!",
    "Update: Improved shipping times across all regions",
    "News: Partnership with leading brands announced",
    "Alert: System maintenance scheduled for tonight"
  ];

  return (
    <div className="bg-black text-green-400 py-1 font-mono">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="text-green-500 font-bold mr-4">LIVE:</span>
          <AutoScrolling
            items={announcements}
            speed={0.8}
            direction="horizontal"
            repeatCount={3}
            itemClassName="text-xs font-mono whitespace-nowrap px-4 text-green-400"
            containerClassName="h-6 flex items-center"
          />
        </div>
      </div>
    </div>
  );
}
