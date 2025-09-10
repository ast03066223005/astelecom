const cache = new Map();
const loadingPromises = new Map();

export async function loadImage(url) {
  // Return cached image if available
  if (cache.has(url)) {
    return cache.get(url);
  }

  // Return existing loading promise if image is already being loaded
  if (loadingPromises.has(url)) {
    return loadingPromises.get(url);
  }

  // Create new loading promise
  const loadingPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS if needed
    
    img.onload = () => {
      // Cache the actual image element
      cache.set(url, img);
      loadingPromises.delete(url);
      resolve(img);
    };
    
    img.onerror = (error) => {
      loadingPromises.delete(url);
      reject(new Error(`Failed to load image: ${url}`));
    };
    
    img.src = url;
  });

  // Store the loading promise
  loadingPromises.set(url, loadingPromise);
  
  return loadingPromise;
}

// Function to preload multiple images with priority
export async function preloadImages(urls, priority = 'low') {
  // Limit concurrent downloads to avoid overwhelming the browser
  const maxConcurrent = priority === 'high' ? 3 : 2;
  const results = [];
  
  for (let i = 0; i < urls.length; i += maxConcurrent) {
    const batch = urls.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(url => loadImage(url).catch(error => {
      console.warn(`Failed to preload image: ${url}`, error);
      return null;
    }));
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Small delay between batches to prevent blocking
    if (i + maxConcurrent < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

// Function to clear cache
export function clearImageCache() {
  cache.clear();
  loadingPromises.clear();
}

// Function to get cache size
export function getCacheSize() {
  return cache.size;
}
