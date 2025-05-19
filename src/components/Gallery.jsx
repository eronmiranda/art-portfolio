import { useMemo, useState } from "react";
import { cx } from "../lib/utils";
import SkeletonGallery from "./SkeletonGallery";
import GalleryCard from "./GalleryCard";
import Tags from "./Tags";
import LazyImage from "./LazyImage";
import Modal from "./Modal";

function Gallery({ images = [], className, showTags = true }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onImageClick = (src) => () => {
    setSelectedImg(src);
    setIsModalOpen(true);
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

  return (
    <>
      {images.length === 0 ? (
        <div className="mt-6 md:mt-9">
          <SkeletonGallery />
        </div>
      ) : (
        <>
          {images.length > 0 && showTags && (
            <Tags
              tags={tags}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          )}
          <div
            className={cx(
              "mt-6 columns-2 gap-4 space-y-4 sm:columns-3 md:mt-9 lg:gap-6 lg:space-y-6",
              className,
            )}
          >
            {filteredImages.map((image, index) => (
              <GalleryCard
                key={image.src}
                index={index}
                label={image.title}
                onClick={onImageClick(image.src)}
              >
                <LazyImage src={image.src} alt={image.title} />
              </GalleryCard>
            ))}
          </div>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {/* background for transparent-bg images */}
            <div className="rounded-lg bg-[#eee3df]">
              <LazyImage
                src={selectedImg}
                className="max-h-[80vh] max-w-[80vw]"
                alt=""
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default Gallery;
