import { useMemo, useState } from "react";
import { cx } from "../lib/utils";
import SkeletonGallery from "./SkeletonGallery";
import GalleryItem from "./GalleryItem";
import Tags from "./Tags";
import LazyImage from "./LazyImage";
import Modal from "./Modal";

function Gallery({ images = [], className, showTags = true }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All");

  const handleImageClick = (src) => () => {
    setSelectedImg(src);
  };

  const tags = useMemo(
    () => Array.from(new Set(images.flatMap((image) => image.tags ?? []))),
    [images],
  );

  const filteredImages = useMemo(
    () =>
      selectedTag !== "All"
        ? images.filter((image) => image.tags?.includes(selectedTag))
        : images,
    [images, selectedTag],
  );

  if (images.length === 0) {
    return (
      <div className="mt-6 md:mt-9">
        <SkeletonGallery />
      </div>
    );
  }

  return (
    <>
      {showTags && (
        <Tags
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      )}

      <div
        className={cx(
          "mt-6 grid grid-cols-2 gap-4 bg-clip-padding sm:grid-cols-3 md:mt-9 lg:grid-cols-4 lg:gap-6",
          className,
        )}
      >
        {filteredImages.map((image, index) => (
          <GalleryItem
            key={image.src}
            index={index}
            src={image.src}
            label={image.title}
            onClick={handleImageClick(image.src)}
            layoutId={image.src}
          />
        ))}
      </div>
      {selectedImg && (
        <Modal key={selectedImg} onClose={() => setSelectedImg(null)}>
          <div
            className="fixed inset-0 z-50 m-auto aspect-square max-h-[80vh] max-w-[80vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <LazyImage src={selectedImg} alt="" />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Gallery;
