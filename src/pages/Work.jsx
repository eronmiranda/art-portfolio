import { useState } from "react";
import MasonryGrid from "../components/MasonryGrid";
import useFirestore from "../hooks/useFirestore";

function Work() {
  const { docs } = useFirestore("images");
  const artworks = docs
    .filter((doc) => doc.url !== undefined)
    .map((doc) => ({
      src: doc.url,
      alt: doc.title,
      title: doc.title,
      tags: doc.tags,
    }));

  const allTags = Array.from(
    new Set(artworks.flatMap((artwork) => artwork.tags || []))
  );

  const [selectedTag, setSelectedTag] = useState("");

  const filteredArtworks =
    selectedTag && selectedTag !== "All"
      ? artworks.filter((artwork) => artwork.tags?.includes(selectedTag))
      : artworks;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={`px-4 py-1.5 rounded-full font-medium transition-all duration-200 border outline-none focus:ring-2 focus:ring-blue-300
            ${selectedTag === "" 
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-400"}`
          }
          onClick={() => setSelectedTag("")}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-1.5 rounded-full font-medium transition-all duration-200 border outline-none focus:ring-2 focus:ring-blue-300
              ${selectedTag === tag 
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-400"}`
            }
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <MasonryGrid artworks={filteredArtworks} className="mt-6 md:mt-9" />
    </div>
  );
}

export default Work;
