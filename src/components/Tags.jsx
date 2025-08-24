import { cx } from "../lib/utils";
import { useState } from "react";

function TagButton({ tag, selected, onClick, count }) {
  return (
    <button
      className={cx(
        "group relative inline-flex items-center gap-x-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out focus:ring-2 focus:ring-teal-500/50 focus:outline-none active:scale-95",
        selected
          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25 dark:from-teal-400 dark:to-teal-500 dark:shadow-teal-400/25"
          : "bg-white/80 text-zinc-700 shadow-sm ring-1 ring-zinc-200 backdrop-blur-sm hover:scale-105 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md hover:ring-teal-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-300 dark:hover:ring-teal-700",
      )}
      aria-pressed={selected}
      onClick={onClick}
    >
      {selected && (
        <div className="h-2 w-2 animate-pulse rounded-full bg-white/90" />
      )}
      <span className="relative">
        {tag}
        {count !== undefined && count > 0 && (
          <span
            className={cx(
              "ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium transition-colors",
              selected
                ? "bg-white/20 text-white"
                : "bg-zinc-100 text-zinc-600 group-hover:bg-teal-100 group-hover:text-teal-700 dark:bg-zinc-700 dark:text-zinc-400 dark:group-hover:bg-teal-800 dark:group-hover:text-teal-300",
            )}
          >
            {count}
          </span>
        )}
      </span>
    </button>
  );
}

function Tags({ tags, selectedTag, setSelectedTag, images = [] }) {
  const [showAll, setShowAll] = useState(false);

  // Calculate tag counts
  const tagCounts = tags.reduce((acc, tag) => {
    acc[tag] = images.filter((image) => image.tags?.includes(tag)).length;
    return acc;
  }, {});

  const allCount = images.length;
  const sortedTags = tags.sort(
    (a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0),
  );

  // Show only first 8 tags initially, with option to expand
  const visibleTags = showAll ? sortedTags : sortedTags.slice(0, 8);
  const hasMoreTags = sortedTags.length > 8;

  return (
    <div className="my-6">
      {/* Filter Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-zinc-500 dark:text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
            />
          </svg>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Filter by Category
          </h3>
        </div>

        {selectedTag !== "All" && (
          <button
            onClick={() => setSelectedTag("All")}
            className="text-xs text-zinc-500 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Tag Buttons */}
      <div className="mb-3 flex flex-wrap gap-2">
        {/* All button */}
        <TagButton
          tag="All"
          selected={selectedTag === "All"}
          onClick={() => setSelectedTag("All")}
          count={allCount}
        />

        {/* Individual tag buttons */}
        {visibleTags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            selected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
            count={tagCounts[tag]}
          />
        ))}
      </div>

      {/* Show More/Less Toggle */}
      {hasMoreTags && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            {showAll ? (
              <>
                <span>Show less</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Show {sortedTags.length - 8} more</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* Active Filter Indicator */}
      {selectedTag !== "All" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Showing {tagCounts[selectedTag] || 0} artwork
            {(tagCounts[selectedTag] || 0) !== 1 ? "s" : ""} in{" "}
            <span className="font-medium text-teal-600 dark:text-teal-400">
              {selectedTag}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default Tags;
