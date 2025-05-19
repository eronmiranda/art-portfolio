import LazyImage from "./LazyImage";
import GalleryCard from "./GalleryCard";
import ImageOverlay from "./ImageOverlay";

function GalleryItem({ index, src, label, onClick, ...props }) {
  return (
    <GalleryCard
      index={index}
      onClick={onClick}
      className="bg-[#eee3df] shadow-md hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-zinc-100"
      {...props}
    >
      <ImageOverlay label={label}>
        <LazyImage src={src} alt={label} />
      </ImageOverlay>
    </GalleryCard>
  );
}

export default GalleryItem;
