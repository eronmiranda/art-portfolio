import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
import { MotionDiv } from "../components/Motion";
import useFirestore from "../hooks/useFirestore";
import Tags from "../components/Tags";
import SkeletonGallery from "../components/SkeletonGallery";

const Gallery = lazy(() => import("../components/Gallery"));

function Work() {
  const [selectedTag, setSelectedTag] = useState("All");
  const { docs } = useFirestore("images");

  const artworks = docs
    .filter((doc) => doc.url !== undefined)
    .filter((doc) => doc.display === undefined || doc.display === true)
    .map((doc) => ({
      src: doc.url,
      alt: doc.title,
      title: doc.title,
      tags: doc.tags,
    }));

  const allTags = Array.from(
    new Set(artworks.flatMap((artwork) => artwork.tags ?? [])),
  ).sort();

  const filteredArtworks =
    selectedTag !== "All"
      ? artworks.filter((artwork) => artwork.tags?.includes(selectedTag))
      : artworks;

  return (
    <>
      <Tags
        allTags={allTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        display={!artworks.length == 0}
      />
      <AnimatePresence mode="wait">
        <MotionDiv
          key={selectedTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<SkeletonGallery />}>
            <Gallery images={filteredArtworks}></Gallery>
          </Suspense>
        </MotionDiv>
      </AnimatePresence>
    </>
  );
}

export default Work;
