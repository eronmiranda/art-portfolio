import { useMemo, useState } from "react";
import SkeletonGallery from "./SkeletonGallery";
import GalleryCard from "./GalleryCard";
import Tags from "./Tags";
import LazyImage from "./LazyImage";
import Modal from "./Modal";
import Masonry from "react-masonry-css";

const defaultBreakpointCols = {
  default: 4,
  1024: 3,
  560: 2,
};

function TestGallery({
  images = [],
  breakpointCols = defaultBreakpointCols,
  showTags = true,
}) {
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
          <Masonry
            breakpointCols={breakpointCols}
            className="flex w-full gap-4"
          >
            {filteredImages.map((image, index) => (
              <GalleryCard
                key={image.src}
                index={index}
                label={image.title}
                onClick={onImageClick(image.src)}
                className="my-4"
              >
                <LazyImage src={image.src} alt={image.title} />
              </GalleryCard>
            ))}
          </Masonry>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {/* background for transparent-bg images */}
            <div className="component-image-bg">
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

export default TestGallery;
