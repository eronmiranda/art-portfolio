import { useState } from "react";
import { MotionDiv, MotionPresence } from "./Motion";
import { cx } from "../lib/utils";
import Modal from "./Modal";
import SkeletonGallery from "./SkeletonGallery";
import ImageOverlay from "./ImageOverlay";
import LazyImage from "./LazyImage";
import GalleryImage from "./GalleryImage";

function Gallery({
  images = [],
  className
}) {
  const [loaded, setLoaded] = useState(Array(images.length).fill(false));
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleImageLoad = (index) => {
    setLoaded((previousStates) => {
      const updatedStates = [...previousStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };
  const handleImageClick = (src, index) => {
    setSelectedImg(src);
    setSelectedIndex(index);
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
            "mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 bg-clip-padding md:mt-9",
            className
          )}
        >
          {images.map((image, index) => (
            <MotionDiv
              key={index}
              layoutId={`div-${index}`}
              onClick={() => handleImageClick(image.src, index)}
              whileTap={{ y: 4 }}
              className="group relative aspect-square overflow-hidden rounded-md"
            >
              <ImageOverlay text={image.title}>
                <GalleryImage
                  index={index}
                  loaded={loaded[index]}
                  src={image.src}
                  alt={image.alt}
                  layoutId={`img-${index}`}
                  onLoad={() => handleImageLoad(index)}
                />
              </ImageOverlay>
            </MotionDiv>
          ))}
        </div>
        <MotionPresence>
          {selectedImg && (
            <Modal onBackdropClick={() => setSelectedImg(null)}>
              <LazyImage
                src={selectedImg}
                alt=""
                layoutId={`img-${selectedIndex}`}
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
