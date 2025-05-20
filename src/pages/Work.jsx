import { useMemo, lazy, Suspense } from "react";
import useFirestore from "../hooks/useFirestore";
import SkeletonGallery from "../components/SkeletonGallery";
import { filterAndMapImages } from "../lib/utils";

const Gallery = lazy(() => import("../components/Gallery"));

function Work() {
  const rawImages = useFirestore("arts");

  const images = useMemo(() => filterAndMapImages(rawImages), [rawImages]);

  return (
    <>
      <Suspense fallback={<SkeletonGallery />}>
        <Gallery images={images} />
      </Suspense>
    </>
  );
}

export default Work;
