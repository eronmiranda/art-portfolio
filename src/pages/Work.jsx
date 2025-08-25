import { useMemo, lazy, Suspense } from "react";
import useFirestore from "../hooks/useFirestore";
import { filterAndMapImages } from "../lib/utils";

const Gallery = lazy(() => import("../components/Gallery"));

function LoadingState() {
  return (
    <div className="mt-6 flex items-center justify-center px-6 py-12 md:mt-9 md:px-4 lg:px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-teal-600 dark:border-zinc-700 dark:border-t-teal-400"></div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Loading gallery...
        </p>
      </div>
    </div>
  );
}

function Work() {
  const rawImages = useFirestore("portfolio");

  const images = useMemo(() => filterAndMapImages(rawImages), [rawImages]);

  return (
    <Suspense fallback={<LoadingState />}>
      <Gallery images={images} />
    </Suspense>
  );
}

export default Work;
