import { useState } from "react";
import { MotionDiv, MotionPresence } from "./Motion";
import { cx } from "../lib/utils";
import Modal from "./Modal";
import SkeletonGallery from "./SkeletonGallery";
import LazyImage from "./LazyImage";
import GalleryItem from "./GalleryItem";

function Gallery({ images = [], className }) {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageClick = (src) => () => {
    setSelectedImg(src);
  };

  if (images.length === 0) {
    return (
      <div className="mt-6 md:mt-9">
        <SkeletonGallery />
      </div>
    );
  } else {
    return (
      <>
        <div
          className={cx(
            "mt-6 grid grid-cols-2 gap-4 bg-clip-padding sm:grid-cols-3 md:mt-9 lg:grid-cols-4 lg:gap-6",
            className,
          )}
        >
          {images.map((image, index) => (
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
        <MotionPresence>
          {selectedImg && (
            <Modal key={selectedImg} onClose={() => setSelectedImg(null)}>
              <MotionDiv
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="fixed inset-0 z-50 m-auto aspect-square max-h-[80vh] max-w-[80vw]"
                onClick={(event) => event.stopPropagation()}
              >
                <LazyImage src={selectedImg} alt="" />
              </MotionDiv>
            </Modal>
          )}
        </MotionPresence>
      </>
    );
  }
}

export default Gallery;
