import { useState, useMemo } from "react";
import MasonryGrid from "../components/MasonryGrid";
import useFirestore from "../hooks/useFirestore";
import { motion, AnimatePresence } from "framer-motion";

function TagButton({ tag, selected, onClick }) {
  return (
    <button
      className={`md:text-md relative overflow-hidden rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 outline-none
        ${selected ? "" : "hover:border-teal-500"}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {selected && (
        <motion.span
          layoutId="tag-active-bg"
          className="absolute inset-0 z-0 rounded-full bg-teal-700"
          transition={{ type: "tween", stiffness: 50 }}
        />
      )}
      <span
        className={`relative z-10 ${selected ? "text-white" : "text-zinc-700 hover:text-teal-700"}`}
      >
        {tag}
      </span>
    </button>
  );
}

function Work() {
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
      Array.from(new Set(artworks.flatMap((artwork) => artwork.tags || []))),
    [artworks],
  );

  const [selectedTag, setSelectedTag] = useState("");

  const filteredArtworks = useMemo(
    () =>
      selectedTag && selectedTag !== "All"
        ? artworks.filter((artwork) => artwork.tags?.includes(selectedTag))
        : artworks,
    [artworks, selectedTag],
  );

  return (
    <div>
      <div className="my-4 flex flex-wrap gap-2">
        <TagButton
          tag="All"
          selected={selectedTag === ""}
          onClick={() => setSelectedTag("")}
        />
        {allTags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            selected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          />
        ))}
      </div>
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
    </div>
  );
}

export default Work;
