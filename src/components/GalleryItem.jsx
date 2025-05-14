import LazyImage from "./LazyImage";
import GalleryCard from "./GalleryCard";
import ImageOverlay from "./ImageOverlay";

function GalleryItem({ index, src, label, onClick, layoutId, ...props }) {
  return (
    <GalleryCard 
      index={index} 
      onClick={onClick}
      layoutId={layoutId}
      className="shadow-md hover:shadow-2xl"
      whileHover={{ scale: 1.05, opacity: 0.9 }}
      whileTap={{ y: 5 }}
      {...props}
    >
      <ImageOverlay label={label}>
        <LazyImage
          src={src}
          alt={label}
        />
      </ImageOverlay>
    </GalleryCard>
  );
}

export default GalleryItem;
