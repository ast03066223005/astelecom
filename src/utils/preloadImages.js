// Image preloading utility
export const preloadImages = (imageUrls) => {
  const promises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });
  
  return Promise.allSettled(promises);
};

// Preload critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/ast/banners/main-banner.webp',
    '/ast/banners/banner-1.webp',
    '/ast/banners/banner-2.webp',
    '/logo-ast.png'
  ];
  
  return preloadImages(criticalImages);
};
