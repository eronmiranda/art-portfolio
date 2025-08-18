import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./ui/Table";
import useDeleteFile from "../hooks/useDeleteFile";
import { toast } from "sonner";
import Modal from "./Modal";
import RoundedDangerIcon from "./icons/RoundedDangerIcon";
import { Switch } from "./ui/Switch";
import LazyImage from "./LazyImage";
import useUpdateDoc from "../hooks/useUpdateDoc";
import { BadgeDismiss } from "./ui/Badge";

function EditModal({
  isModalOpen,
  setIsModalOpen,
  art,
  tagList,
  collectionName,
}) {
  const [display, setDisplay] = useState(!!art.display);
  const [title, setTitle] = useState(art.title || "");
  const [tags, setTags] = useState(art.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { updateDoc } = useUpdateDoc();

  useEffect(() => {
    setDisplay(!!art.display);
    setTitle(art.title || "");
    setTags(Array.from(new Set(art.tags)).sort() || []);
  }, [art]);

  const filteredSuggestions = tagList
    .filter(
      (tag) =>
        tag.toLowerCase().includes(tagInput.toLowerCase()) &&
        !tags.includes(tag),
    )
    .slice(0, 5); // limit suggestions to 5

  const handleForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    await updateDoc(collectionName, art.id, {
      ...data,
      display: display,
      tags: tags,
    })
      .then(() => {
        toast.success("Successfully updated art details");
      })
      .catch((err) => {
        console.error(err.message);
        toast.error(err.message);
      });
    setIsModalOpen(false);
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
      <div className="w-[360px] max-w-sm rounded-lg bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 md:max-w-lg">
        <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
          {art.title || art.fileName}
        </h3>
        <form
          onSubmit={handleForm}
          action="#"
          method="POST"
          className="mx-auto mt-8 max-w-xl shadow-xs"
        >
          <div className="mb-8 flex flex-col gap-y-3">
            <LazyImage
              src={art.url}
              alt={art.title || "Art Image"}
              className="m-auto size-21 rounded-lg object-contain md:size-32"
            />
            <div className="flex items-center gap-x-2">
              <label
                htmlFor="display"
                className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Show this art
              </label>
              <Switch
                size="default"
                id="display"
                checked={display}
                onCheckedChange={setDisplay}
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Image Title"
                  className="input-base"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tags"
                className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Tags
              </label>
              <div>
                <input
                  id="tags"
                  name="tags"
                  type="text"
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
                  <ul className="absolute z-10 mt-1 rounded-[calc(var(--radius-md)-1px)] bg-white shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 dark:bg-zinc-700/[0.15] dark:outline-zinc-700">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="cursor-pointer px-2 py-1 hover:rounded hover:bg-gray-100 hover:outline hover:outline-teal-500 dark:outline-teal-400"
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <p id="tags-hint" className="mt-1 text-xs text-gray-500">
                  Press <kbd>Enter</kbd> to add a tag or click a suggestion
                </p>
              </div>
              <div>
                {tags.map((tag, index) => (
                  <BadgeDismiss
                    key={index}
                    variant="neutral"
                    className="mt-2"
                    onDismiss={() => {
                      setTags((prevTags) => prevTags.filter((t) => t !== tag));
                    }}
                  >
                    {tag}
                  </BadgeDismiss>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 px-4 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={(event) => {
                event.preventDefault();
                setIsModalOpen(false);
              }}
            >
              Cancel
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
      <div className="max-w-sm rounded-lg bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 md:max-w-lg">
        <div className="sm:flex sm:items-start">
          <RoundedDangerIcon />
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-base font-semibold text-gray-900"
              id="modal-title"
            >
              Delete image
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete "{fileName}"? This will be
                permanently removed and cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 px-4 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={(event) => {
              event.preventDefault();
              onDelete(fileName);
              setIsModalOpen(false);
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={(event) => {
              event.preventDefault();
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function ImageTable({ collectionName = "featured", images }) {
  const [selectedArt, setSelectedArt] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteFile } = useDeleteFile();
  const tags = useMemo(
    () =>
      Array.from(new Set(images.flatMap((image) => image.tags ?? []))).sort(),
    [images],
  );

  // Helper to get the variant for a tag based on its index in the unique tags array

  const handleDelete = async (fileName) => {
    console.log(fileName);
    await deleteFile(fileName, collectionName)
      .then(() => {
        toast.success(`Successfully deleted ${fileName}`);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Table>
          <TableHead className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHeaderCell className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                Image
              </TableHeaderCell>
              <TableHeaderCell className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                Title
              </TableHeaderCell>
              <TableHeaderCell className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                Status
              </TableHeaderCell>
              <TableHeaderCell className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                Tags
              </TableHeaderCell>
              <TableHeaderCell className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                Actions
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {images.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="mb-4 h-12 w-12 text-gray-400"
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
                    <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                      No images found
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload some images to get started!
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              images.map((image, index) => (
                <TableRow
                  key={image.url}
                  className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/30 dark:bg-gray-800/20"}`}
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                        <LazyImage
                          src={image.url}
                          alt={image.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="max-w-xs truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                      {image.title}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          image.display
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        <div
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            image.display ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                        {image.display ? "Active" : "Hidden"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex max-w-xs flex-wrap gap-1">
                      {!image.tags || image.tags.length === 0 ? (
                        <span className="text-sm text-gray-500 italic">
                          No tags
                        </span>
                      ) : (
                        Array.from(new Set(image.tags))
                          .sort()
                          .slice(0, 3)
                          .map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                            >
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
                              {tag}
                            </span>
                          ))
                      )}
                      {image.tags && image.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          +{image.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setSelectedArt(image);
                        }}
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
                        className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setSelectedArt(image);
                        }}
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onDelete={handleDelete}
        fileName={selectedArt ? selectedArt.fileName : ""}
      />
      <EditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        art={selectedArt || ""}
        tagList={tags}
        collectionName={collectionName}
      />
    </>
  );
}
