import { useState, useMemo } from "react";
import MasonryGrid from "../components/MasonryGrid";
import useFirestore from "../hooks/useFirestore";

function TagButton({ tag, selected, onClick }) {
  return (
    <button
      className={`md:text-md rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-teal-300 ${
        selected
          ? "border-teal-600 bg-teal-600 text-white shadow-md"
          : "border-teal-500 bg-white text-zinc-700 hover:border-teal-400 hover:bg-teal-50"
      }`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {tag}
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
      <MasonryGrid artworks={filteredArtworks} className="mt-6 md:mt-9" />
    </div>
  );
}

export default Work;
