import React, { useState, useEffect } from 'react';
import { getCacheSize, clearImageCache } from '../utils/imageCache';

// Cache management component for development/debugging
function ImageCacheManager({ showInProduction = false }) {
  const [cacheSize, setCacheSize] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Update cache size periodically
  useEffect(() => {
    const updateCacheSize = () => {
      setCacheSize(getCacheSize());
    };

    updateCacheSize();
    const interval = setInterval(updateCacheSize, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Only show in development or if explicitly enabled
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  const handleClearCache = () => {
    clearImageCache();
    setCacheSize(0);
    console.log('Image cache cleared');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-primary hover:bg-primary/80 text-white p-1 rounded-full shadow-lg transition-colors w-10 h-10"
        title="Image Cache Manager"
      >
        <i className="fa-solid fa-image text-sm"></i>
      </button>

      {/* Cache Info Panel */}
      {isVisible && (
        <div className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Image Cache</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Cached Images:</span>
              <span className="font-medium">{cacheSize}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Memory Usage:</span>
              <span className="font-medium">
                {cacheSize > 0 ? '~' + (cacheSize * 0.5).toFixed(1) + 'MB' : '0MB'}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={handleClearCache}
              className="w-full bg-primary hover:bg-primary/80 text-white text-xs py-2 px-3 rounded transition-colors mt-2"
            >
              Clear Cache
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            <p>Cache helps improve image loading performance by storing loaded images in memory.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageCacheManager;
