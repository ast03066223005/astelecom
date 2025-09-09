import React from 'react';
import AutoScrolling from '../components/AutoScrolling';

function AutoScrollingDemo() {
  // Example 1: Text items
  const textItems = [
    "Premium Quality",
    "Fast Delivery",
    "24/7 Support",
    "Best Prices",
    "Secure Payment",
    "Easy Returns"
  ];

  // Example 2: Icon items
  const iconItems = [
    "fa-solid fa-star",
    "fa-solid fa-heart",
    "fa-solid fa-thumbs-up",
    "fa-solid fa-award",
    "fa-solid fa-gem",
    "fa-solid fa-crown"
  ];

  // Example 3: Mixed content (JSX elements)
  const mixedItems = [
    <div key="1" className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2">
      <span className="font-bold">Sale</span> - 50% Off
    </div>,
    <div key="2" className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2">
      <span className="font-bold">New</span> - Just Arrived
    </div>,
    <div key="3" className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2">
      <span className="font-bold">Hot</span> - Trending Now
    </div>,
    <div key="4" className="bg-purple-500 text-white px-4 py-2 rounded-lg mx-2">
      <span className="font-bold">Limited</span> - Stock Low
    </div>
  ];

  return (
    <div className="space-y-12 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">AutoScrolling Component Examples</h2>
      
      {/* Example 1: Text scrolling */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Text Scrolling</h3>
        <AutoScrolling
          items={textItems}
          speed={1}
          direction="horizontal"
          repeatCount={3}
          itemClassName="text-2xl font-bold text-gray-800 px-4"
          containerClassName="h-16"
        />
      </div>

      {/* Example 2: Icon scrolling */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Icon Scrolling</h3>
        <AutoScrolling
          items={iconItems}
          speed={0.5}
          direction="horizontal"
          repeatCount={4}
          itemClassName="text-4xl text-yellow-500 px-6"
          containerClassName="h-20"
        />
      </div>

      {/* Example 3: Mixed content scrolling */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Mixed Content Scrolling</h3>
        <AutoScrolling
          items={mixedItems}
          speed={0.8}
          direction="horizontal"
          repeatCount={3}
          itemClassName="flex items-center"
          containerClassName="h-16"
        />
      </div>

      {/* Example 4: Vertical scrolling */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Vertical Scrolling</h3>
        <div className="h-40">
          <AutoScrolling
            items={textItems}
            speed={0.5}
            direction="vertical"
            repeatCount={2}
            itemClassName="text-lg font-medium text-gray-700 py-2"
            containerClassName="h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default AutoScrollingDemo;
