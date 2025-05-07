import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import useFirestore from "../hooks/useFirestore";
import MasonryGrid from "../components/MasonryGrid";
import Tags from "../components/Tags";

function Work() {
  const [selectedTag, setSelectedTag] = useState("All");
  const { docs } = useFirestore("images");

  const artworks = useMemo(
    () =>
      docs
        .filter(
          (doc) =>
            doc.url !== undefined &&
            (doc.display === undefined || doc.display === true),
        )
        .map((doc) => ({
          src: doc.url,
          alt: doc.title,
          title: doc.title,
          tags: doc.tags,
        })),
    [docs],
  );

  const allTags = useMemo(
    () =>
      Array.from(
        new Set(artworks.flatMap((artwork) => artwork.tags || [])),
      ).sort(),
    [artworks],
  );

  const filteredArtworks = useMemo(
    () =>
      selectedTag !== "All"
        ? artworks.filter((artwork) => artwork.tags?.includes(selectedTag))
        : artworks,
    [artworks, selectedTag],
  );

  return (
    <>
      <Tags
        allTags={allTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MasonryGrid artworks={filteredArtworks} className="mt-6 md:mt-9" />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Work;
