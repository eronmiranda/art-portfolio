import { useMemo, lazy, Suspense } from "react";
import { MotionDiv, MotionPresence } from "../components/Motion";
import useFirestore from "../hooks/useFirestore";
import SkeletonGallery from "../components/SkeletonGallery";
import { filterAndMapImages } from "../lib/utils";

const Gallery = lazy(() => import("../components/Gallery"));

function Work() {
  const rawImages = useFirestore("arts");

  const images = useMemo(() => filterAndMapImages(rawImages), [rawImages]);

  return (
    <>
      <MotionPresence mode="popLayout">
        <MotionDiv
          key="gallery-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<SkeletonGallery />}>
            <Gallery images={images}></Gallery>
          </Suspense>
        </MotionDiv>
      </MotionPresence>
    </>
  );
}

export default Work;
