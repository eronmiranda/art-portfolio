import { useState } from "react";
import { MotionDiv, MotionPresence } from "./Motion";
import { cx } from "../lib/utils";
import Modal from "./Modal";
import SkeletonGallery from "./SkeletonGallery";
import ImageOverlay from "./ImageOverlay";
import LazyImage from "./LazyImage";
import GalleryImage from "./GalleryImage";
import GalleryCard from "./GalleryCard";

function Gallery({ images = [], className }) {
  const [loaded, setLoaded] = useState(Array(images.length).fill(false));
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageLoad = (index) => () => {
    setLoaded((previousStates) => {
      const updatedStates = [...previousStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };
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
            "mt-6 grid grid-cols-2 gap-4 bg-clip-padding sm:grid-cols-3 md:mt-9 lg:grid-cols-4",
            className,
          )}
        >
          {images.map((image, index) => (
            <GalleryCard key={index} onClick={handleImageClick(image.src)}>
              <ImageOverlay text={image.title}>
                <GalleryImage
                  index={index}
                  loaded={loaded[index]}
                  src={image.src}
                  alt={image.alt}
                  layoutId={image.src}
                  onLoad={handleImageLoad(index)}
                />
              </ImageOverlay>
            </GalleryCard>
          ))}
        </div>
        <MotionPresence>
          {selectedImg && (
            <Modal onBackdropClick={() => setSelectedImg(null)}>
              <LazyImage
                src={selectedImg}
                alt=""
                layoutId={selectedImg}
                className="fixed inset-0 z-50 m-auto max-h-[80vh] max-w-[80vw] rounded-lg shadow-xl"
              />
            </Modal>
          )}
        </MotionPresence>
      </>
    );
  }
}

export default Gallery;
