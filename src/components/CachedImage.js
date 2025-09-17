import { useEffect, useState, useCallback, memo } from "react";
import { loadImage } from "../utils/imageCache";
import ImgSvg from "./ImgSvg";

function CachedImage({ 
  src, 
  alt, 
  loadingComponent, 
  errorComponent,
  onLoad,
  onError,
  ...props 
}) {
  // Extract custom props that shouldn't be passed to DOM
  const {
    minHeight,
    minWidth,
    jsx, // Remove jsx prop if it exists
    ...domProps
  } = props;
  
  // Filter out any remaining non-DOM props
  const validDomProps = Object.keys(domProps).reduce((acc, key) => {
    // Only keep valid HTML attributes
    if (key.startsWith('data-') || key.startsWith('aria-') || 
        ['className', 'id', 'style', 'width', 'height', 'src', 'alt', 'onLoad', 'onError', 'onClick'].includes(key)) {
      acc[key] = domProps[key];
    }
    return acc;
  }, {});
  const [imageState, setImageState] = useState({
    status: 'loading', // 'loading', 'loaded', 'error'
    image: null,
    error: null
  });

  const loadImageCallback = useCallback(async () => {
    if (!src) {
      setImageState({ status: 'error', image: null, error: 'No source provided' });
      return;
    }

    setImageState({ status: 'loading', image: null, error: null });

    try {
      const image = await loadImage(src);
      setImageState({ status: 'loaded', image, error: null });
      onLoad && onLoad(image);
    } catch (error) {
      setImageState({ status: 'error', image: null, error });
      onError && onError(error);
    }
  }, [src, onLoad, onError]);

  useEffect(() => {
    loadImageCallback();
  }, [loadImageCallback]);

  // Loading state
  if (imageState.status === 'loading') {
    if (loadingComponent) {
      return loadingComponent;
    }
    return (
      <div 
        className="flex items-center justify-center bg-gray-200 animate-pulse"
        style={{ 
          width: domProps.width || 100, 
          height: domProps.height || 100,
          minWidth: minWidth || domProps.width || 100,
          minHeight: minHeight || domProps.height || 100
        }}
      >
        <div className="text-gray-500 text-sm">
          <ImgSvg className="w-8 h-8" />
        </div>
      </div>
    );
  }

  // Error state
  if (imageState.status === 'error') {
    if (errorComponent) {
      return errorComponent;
    }
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300"
        style={{ 
          width: domProps.width || 100, 
          height: domProps.height || 100,
          minWidth: minWidth || domProps.width || 100,
          minHeight: minHeight || domProps.height || 100
        }}
      >
        <div className="text-gray-500 text-xs text-center">
          <div><ImgSvg className="w-4 h-4" /></div>
          <div>Failed to load</div>
        </div>
      </div>
    );
  }

  // Loaded state - use the cached image element
  return (
    <img 
      src={imageState.image.src} 
      alt={alt} 
      {...validDomProps}
      loading="lazy"
      decoding="async"
      onLoad={() => onLoad && onLoad(imageState.image)}
      onError={() => {
        const error = new Error('Image failed to display');
        setImageState({ status: 'error', image: null, error });
        onError && onError(error);
      }}
    />
  );
}

export default memo(CachedImage);