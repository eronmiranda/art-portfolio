import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { cx } from "../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./ui/Table";
import { Switch } from "./ui/Switch";
import { BadgeDismiss } from "./ui/Badge";
import Modal from "./Modal";
import LazyImage from "./LazyImage";
import useDeleteFile from "../hooks/useDeleteFile";
import useUpdateDoc from "../hooks/useUpdateDoc";

// UTILITY COMPONENTS
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center">
    <svg
      className="mb-4 h-12 w-12 text-zinc-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <h3 className="mb-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
      No images found
    </h3>
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      Upload some images to get started!
    </p>
  </div>
);

const StatusBadge = ({ isActive }) => (
  <div
    className={cx(
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
      isActive
        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
        : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
    )}
  >
    <div
      className={cx(
        "mr-1.5 h-1.5 w-1.5 rounded-full",
        isActive ? "bg-green-500" : "bg-zinc-400",
      )}
    />
    {isActive ? "Active" : "Hidden"}
  </div>
);

const FeaturedStar = ({ isFeatured, size = "default" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-5 w-5",
    large: "h-6 w-6",
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        className={cx(
          sizeClasses[size],
          isFeatured
            ? "fill-yellow-500 text-yellow-500"
            : "text-zinc-300 dark:text-zinc-600",
        )}
        fill={isFeatured ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        title={isFeatured ? "Featured image" : "Not featured"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={isFeatured ? 0 : 2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </div>
  );
};

const TagList = ({ tags, maxTags = 3, compact = false }) => {
  if (!tags || tags.length === 0) {
    return (
      <span
        className={cx("text-zinc-500 italic", compact ? "text-xs" : "text-sm")}
      >
        No tags
      </span>
    );
  }

  const uniqueTags = Array.from(new Set(tags)).sort();
  const displayTags = uniqueTags.slice(0, maxTags);
  const remainingCount = uniqueTags.length - maxTags;

  return (
    <div className="flex flex-wrap gap-1">
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className={cx(
            "inline-flex items-center rounded-md border border-blue-200 bg-blue-50 font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
            compact ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs",
          )}
        >
          {!compact && (
            <svg
              className="mr-1 h-2.5 w-2.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span
          className={cx(
            "inline-flex items-center rounded-md bg-zinc-100 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
            compact ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs",
          )}
        >
          +{remainingCount} {compact ? "" : "more"}
        </span>
      )}
    </div>
  );
};

const ActionButtons = ({ onEdit, onDelete, compact = false }) => (
  <div className={cx("flex gap-2", compact ? "flex-col" : "justify-center")}>
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-md bg-blue-600 text-xs font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none",
        compact ? "flex-1 px-3 py-2" : "px-3 py-1.5",
      )}
      onClick={onEdit}
      title="Edit image details"
    >
      <svg
        className="mr-1 h-3 w-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      Edit
    </button>
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-md bg-red-600 text-xs font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none",
        compact ? "flex-1 px-3 py-2" : "px-3 py-1.5",
      )}
      onClick={onDelete}
      title="Delete image permanently"
    >
      <svg
        className="mr-1 h-3 w-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete
    </button>
  </div>
);

// MODAL COMPONENTS
function EditModal({
  isModalOpen,
  setIsModalOpen,
  art,
  tagList,
  collectionName,
}) {
  const [display, setDisplay] = useState(!!art.display);
  const [featured, setFeatured] = useState(!!art.featured);
  const [title, setTitle] = useState(art.title || "");
  const [tags, setTags] = useState(art.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { updateDoc } = useUpdateDoc();

  useEffect(() => {
    setDisplay(!!art.display);
    setFeatured(!!art.featured);
    setTitle(art.title || "");
    setTags(Array.from(new Set(art.tags)).sort() || []);
  }, [art]);

  const filteredSuggestions = tagList
    .filter(
      (tag) =>
        tag.toLowerCase().includes(tagInput.toLowerCase()) &&
        !tags.includes(tag),
    )
    .slice(0, 5);

  const handleForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await updateDoc(collectionName, art.id, {
        ...data,
        display: display,
        featured: featured,
        tags: tags,
      });
      toast.success("Successfully updated art details");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      event.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags((prevTags) => [...prevTags, newTag].sort());
        setTagInput("");
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!tags.includes(suggestion)) {
      setTags((prevTags) => [...prevTags, suggestion].sort());
    }
    setTagInput("");
    setShowSuggestions(false);
  };

  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Edit Image
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Update image details and settings
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
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
        </div>

        <form onSubmit={handleForm} className="p-6">
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="flex justify-center">
              <div className="relative">
                <LazyImage
                  src={art.url}
                  alt={art.title || "Art Image"}
                  className="h-32 w-32 rounded-xl object-cover shadow-lg ring-1 ring-zinc-900/10 dark:ring-zinc-800"
                />
                <div className="absolute -right-2 -bottom-2 rounded-full bg-white p-2 shadow-lg ring-1 ring-zinc-900/10 dark:bg-zinc-800 dark:ring-zinc-700">
                  <svg
                    className="h-4 w-4 text-zinc-600 dark:text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                  <svg
                    className="h-4 w-4 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div>
                  <label
                    htmlFor="display"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Show this image
                  </label>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Make this image visible in your gallery
                  </p>
                </div>
              </div>
              <Switch
                size="default"
                id="display"
                checked={display}
                onCheckedChange={setDisplay}
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                  <svg
                    className="h-4 w-4 text-yellow-600 dark:text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Featured image
                  </label>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Highlight this image as featured content
                  </p>
                </div>
              </div>
              <Switch
                size="default"
                id="featured"
                checked={featured}
                onCheckedChange={setFeatured}
              />
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter image title..."
                className="input-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Tags
              </label>
              <div className="relative">
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="Add tags..."
                  className="input-base"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleTagInputKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 100)
                  }
                  aria-describedby="tags-hint"
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="cursor-pointer px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-700"
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="h-3 w-3 text-zinc-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {suggestion}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p
                id="tags-hint"
                className="text-xs text-zinc-500 dark:text-zinc-400"
              >
                Press{" "}
                <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                  Enter
                </kbd>{" "}
                to add a tag
              </p>

              {/* Current Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag, index) => (
                    <BadgeDismiss
                      key={index}
                      variant="neutral"
                      onDismiss={() =>
                        setTags((prevTags) => prevTags.filter((t) => t !== tag))
                      }
                    >
                      {tag}
                    </BadgeDismiss>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-zinc-900"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function DeleteModal({ isModalOpen, setIsModalOpen, onDelete, fileName }) {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
              <svg
                className="h-5 w-5 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Delete Image
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
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
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-900/10">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <svg
                  className="h-4 w-4 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Permanent Deletion Warning
                </h4>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  Are you sure you want to delete{" "}
                  <span className="font-medium">"{fileName}"</span>? This image
                  will be permanently removed from your gallery and cannot be
                  recovered.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
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
              The image file will be permanently deleted
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
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
              All associated metadata will be removed
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
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
              This action cannot be undone
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete(fileName);
                setIsModalOpen(false);
              }}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-zinc-900"
            >
              Delete Forever
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// TABLE COMPONENTS
const DesktopTable = ({ images, onEdit, onDelete }) => (
  <div className="mt-8 hidden overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm md:block dark:border-zinc-800 dark:bg-zinc-900">
    <Table>
      <TableHead className="bg-zinc-50 dark:bg-zinc-800/50">
        <TableRow className="border-b border-zinc-200 dark:border-zinc-700">
          <TableHeaderCell className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
            Image
          </TableHeaderCell>
          <TableHeaderCell className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
            Title
          </TableHeaderCell>
          <TableHeaderCell className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
            Featured
          </TableHeaderCell>
          <TableHeaderCell className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
            Status
          </TableHeaderCell>
          <TableHeaderCell className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
            Tags
          </TableHeaderCell>
          <TableHeaderCell className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
            Actions
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-zinc-900">
        {images.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="px-6 py-12 text-center">
              <EmptyState />
            </TableCell>
          </TableRow>
        ) : (
          images.map((image, index) => (
            <TableRow
              key={image.url}
              className={cx(
                "transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                index % 2 === 0
                  ? "bg-white dark:bg-zinc-900"
                  : "bg-zinc-50/30 dark:bg-zinc-800/20",
              )}
            >
              <TableCell className="px-6 py-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <LazyImage
                    src={image.url}
                    alt={image.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="max-w-xs truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {image.title}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <FeaturedStar isFeatured={image.featured} />
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <StatusBadge isActive={image.display} />
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="max-w-xs">
                  <TagList tags={image.tags} maxTags={3} />
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <ActionButtons
                  onEdit={() => onEdit(image)}
                  onDelete={() => onDelete(image)}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

const MobileCardList = ({ images, onEdit, onDelete }) => (
  <div className="mt-8 space-y-4 md:hidden">
    {images.length === 0 ? (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <EmptyState />
      </div>
    ) : (
      images.map((image) => (
        <div
          key={image.url}
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-start space-x-4">
            <div className="size-35 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <LazyImage
                src={image.url}
                alt={image.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {image.title}
                  </h3>
                  <FeaturedStar isFeatured={image.featured} size="small" />
                </div>
                <div className="ml-2">
                  <StatusBadge isActive={image.display} />
                </div>
              </div>
              <div className="mt-2">
                <TagList tags={image.tags} maxTags={2} compact />
              </div>
              <div className="mt-3">
                <ActionButtons
                  onEdit={() => onEdit(image)}
                  onDelete={() => onDelete(image)}
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

// MAIN COMPONENT
export default function ImageTable({ collectionName = "portfolio", images }) {
  const [selectedArt, setSelectedArt] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteFile } = useDeleteFile();

  const tags = useMemo(
    () =>
      Array.from(new Set(images.flatMap((image) => image.tags ?? []))).sort(),
    [images],
  );

  const handleEdit = (image) => {
    setSelectedArt(image);
    setIsEditModalOpen(true);
  };

  const handleDelete = (image) => {
    setSelectedArt(image);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (fileName) => {
    try {
      await deleteFile(fileName, collectionName);
      toast.success(`Successfully deleted ${fileName}`);
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  return (
    <>
      <DesktopTable
        images={images}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <MobileCardList
        images={images}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onDelete={handleDeleteConfirm}
        fileName={selectedArt?.fileName || ""}
      />

      <EditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        art={selectedArt || {}}
        tagList={tags}
        collectionName={collectionName}
      />
    </>
  );
}
