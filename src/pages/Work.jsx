import { useMemo, lazy, Suspense } from "react";
import { MotionDiv, MotionPresence } from "../components/Motion";
import useFirestore from "../hooks/useFirestore";
import SkeletonGallery from "../components/SkeletonGallery";

const Gallery = lazy(() => import("../components/Gallery"));

function Work() {
  const rawImages = useFirestore("images");

  const images = useMemo(
    () =>
      rawImages
        .filter((image) => image.url !== undefined)
        .filter(
          (image) => image.display === undefined || image.display === true,
        )
        .map((image) => ({
          src: image.url,
          alt: image.title,
          title: image.title,
          tags: image.tags,
        })),
    [rawImages],
  );

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
