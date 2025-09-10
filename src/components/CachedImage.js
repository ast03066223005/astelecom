import { useEffect, useState } from "react";
import { loadImage } from "../utils/imageCache";

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
    ...domProps
  } = props;
  const [imageState, setImageState] = useState({
    status: 'loading', // 'loading', 'loaded', 'error'
    image: null,
    error: null
  });

  useEffect(() => {
    if (!src) {
      setImageState({ status: 'error', image: null, error: 'No source provided' });
      return;
    }

    setImageState({ status: 'loading', image: null, error: null });

    loadImage(src)
      .then((image) => {
        setImageState({ status: 'loaded', image, error: null });
        onLoad && onLoad(image);
      })
      .catch((error) => {
        setImageState({ status: 'error', image: null, error });
        onError && onError(error);
      });
  }, [src, onLoad, onError]);

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
        <div className="text-gray-500 text-sm">Loading...</div>
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
          <div>⚠️</div>
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
      {...domProps}
      onLoad={() => onLoad && onLoad(imageState.image)}
      onError={() => {
        const error = new Error('Image failed to display');
        setImageState({ status: 'error', image: null, error });
        onError && onError(error);
      }}
    />
  );
}

export default CachedImage;