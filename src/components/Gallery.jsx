import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import Modal from './Modal';
import SkeletonGallery from './SkeletonGallery';
import ImageOverlay from './ImageOverlay';
import LazyImage from './LazyImage';

function Gallery({ images = [] }) {
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
    )
  }
  else {
    return (
      <>
        <div className="mt-6 bg-clip-padding md:mt-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gris-cols-5 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              layoutId={`div-${index}`}
              onClick={() => handleImageClick(image.src, index)}
              whileTap={{ y: 4 }}
              className="group relative aspect-square overflow-hidden rounded-md"
            >
              <ImageOverlay text={image.title}>
                <LazyImage
                  index={index}
                  loaded={loaded[index]}
                  src={image.src}
                  alt={image.alt}
                  layoutId={`img-${index}`}
                  className="h-full w-full object-cover hover:opacity-90"
                  onLoad={() => handleImageLoad(index)}
                />
              </ImageOverlay>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedImg && (
            <Modal onBackdropClick={() => setSelectedImg(null)}>
              <motion.img
                src={selectedImg}
                alt=""
                layoutId={`img-${selectedIndex}`}
                className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-xl"
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
              />
            </Modal>
          )}
        </AnimatePresence>
      </>
    )
  }
}

export default Gallery
