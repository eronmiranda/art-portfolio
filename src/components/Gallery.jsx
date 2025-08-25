import { useMemo, useState } from "react";
import GalleryCard from "./GalleryCard";
import Tags from "./Tags";
import LazyImage from "./LazyImage";
import Modal from "./Modal";
import Masonry from "react-masonry-css";

const defaultBreakpointCols = {
  default: 4,
  1024: 3,
  560: 2,
};

function Gallery({
  images = [],
  breakpointCols = defaultBreakpointCols,
  showTags = true,
  showSearch = true,
}) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onImageClick = (src) => () => {
    setSelectedImg(src);
    setIsModalOpen(true);
  };

  const tags = useMemo(
    () => Array.from(new Set(images.flatMap((image) => image.tags ?? []))),
    [images],
  );

  const filteredImages = useMemo(() => {
    let filtered = images;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((image) => {
        const titleMatch = image.title?.toLowerCase().includes(query);
        const tagsMatch = image.tags?.some((tag) =>
          tag.toLowerCase().includes(query),
        );
        return titleMatch || tagsMatch;
      });
    }

    // Filter by selected tag
    if (selectedTag !== "All") {
      filtered = filtered.filter((image) => image.tags?.includes(selectedTag));
    }

    return filtered;
  }, [images, selectedTag, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Reset tag filter when searching to show all matching results
    if (e.target.value.trim() && selectedTag !== "All") {
      setSelectedTag("All");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="px-6 md:px-4 lg:px-4">
      {images.length === 0 ? (
        <div className="mt-6 flex items-center justify-center py-12 md:mt-9">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-teal-600 dark:border-zinc-700 dark:border-t-teal-400"></div>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Loading gallery...
            </p>
          </div>
        </div>
      ) : (
        <>
          {images.length > 0 && showSearch && (
            <div className="mt-4 mb-6">
              <div className="relative mx-auto max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search artwork by title or tags..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input-base w-full pr-10 pl-10"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                    aria-label="Clear search"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {filteredImages.length === 0 ? (
                      <>
                        No results found for "
                        <span className="font-medium">{searchQuery}</span>"
                      </>
                    ) : (
                      <>
                        Found {filteredImages.length} result
                        {filteredImages.length !== 1 ? "s" : ""} for "
                        <span className="font-medium">{searchQuery}</span>"
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {images.length > 0 && showTags && !searchQuery && (
            <Tags
              tags={tags}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              images={images}
            />
          )}
          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <Masonry
              breakpointCols={breakpointCols}
              className="flex w-full gap-4"
            >
              {filteredImages.map((image, index) => (
                <GalleryCard
                  key={image.src}
                  index={index}
                  label={image.title}
                  onClick={onImageClick(image.src)}
                  className="my-4"
                >
                  <LazyImage src={image.src} alt={image.title} />
                </GalleryCard>
              ))}
            </Masonry>
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                No results found
              </h3>
              <p className="max-w-sm text-center text-zinc-600 dark:text-zinc-400">
                Try adjusting your search terms or{" "}
                <button
                  onClick={clearSearch}
                  className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  clear the search
                </button>{" "}
                to see all artwork.
              </p>
            </div>
          ) : null}
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {/* background for transparent-bg images */}
            <div className="component-image-bg">
              <LazyImage
                src={selectedImg}
                className="max-h-[80vh] max-w-[80vw] rounded-lg"
                alt=""
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Gallery;
