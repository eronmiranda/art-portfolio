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
      <div className="my-4 flex flex-wrap gap-2">
        <button
          className={`px-3 py-1.5 rounded-full font-medium transition-all duration-200 border outline-none focus:ring-2 focus:ring-teal-500
            ${selectedTag === "" 
              ? "bg-teal-600 text-white border-teak-600 shadow-md"
              : "bg-white text-zinc-800 border-teal-500 hover:bg-teal-50 hover:border-teal-400"}`
          }
          onClick={() => setSelectedTag("")}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-1.5 rounded-full text-sm md:text-md font-medium transition-all duration-200 border outline-none focus:ring-2 focus:ring-teal-300
              ${selectedTag === tag 
                ? "bg-teal-600 text-white border-teal-600 shadow-md"
                : "bg-white text-zinc-700 border-teal-500 hover:bg-teal-50 hover:border-teal-400"}`
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
