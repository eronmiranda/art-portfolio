import { useMemo, lazy, Suspense } from "react";
import useFirestore from "../hooks/useFirestore";
import { filterAndMapImages } from "../lib/utils";
import Loader from "../components/Loader";

const Gallery = lazy(() => import("../components/Gallery"));

function Work() {
  const rawImages = useFirestore("portfolio");

  const images = useMemo(() => filterAndMapImages(rawImages), [rawImages]);

  return (
    <Suspense
      fallback={
        <Loader
          text="Loading gallery..."
          className="mt-6 px-6 py-12 md:mt-9 md:px-4 lg:px-4"
        />
      }
    >
      <Gallery images={images} />
    </Suspense>
  );
}

export default Work;
