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
import { Badge, badgeVariants, BadgeDismiss } from "./ui/Badge";

function EditModal({ isModalOpen, setIsModalOpen, art, tagList }) {
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

    console.log("tags", tags);
    await updateDoc("featured", art.id, {
      ...data,
      display: display,
      tags: tags,
    })
      .then(() => {
        toast.success("Successfully updated art details");
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err.message);
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

export default function ImageTable({ images }) {
  const [selectedArt, setSelectedArt] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteFile } = useDeleteFile();
  const tagVariants = Object.keys(badgeVariants.variants.variant);
  const tags = useMemo(
    () =>
      Array.from(new Set(images.flatMap((image) => image.tags ?? []))).sort(),
    [images],
  );

  // Helper to get the variant for a tag based on its index in the unique tags array
  const getTagVariant = (tag) => {
    const tagIndex = tags.indexOf(tag);
    return tagVariants[tagIndex % tagVariants.length];
  };

  const handleDelete = async (fileName) => {
    console.log(fileName);
    await deleteFile(fileName, "featured")
      .then(() => {
        toast.success(`Successfully deleted ${fileName}`);
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err.message);
      });
  };

  return (
    <>
      <TableRoot className="mt-8 table-fixed rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Image</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Tags</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.url}>
                <TableCell className="w-30">
                  <LazyImage
                    src={image.url}
                    alt={image.title}
                    className="size-21 object-contain"
                  />
                </TableCell>
                <TableCell className="w-auto">{image.title}</TableCell>
                <TableCell className="w-auto">
                  {!image.tags || image.tags.length === 0
                    ? "No tags"
                    : Array.from(new Set(image.tags))
                        .sort()
                        .map((tag, index) => (
                          <Badge
                            key={index}
                            variant={getTagVariant(tag)}
                            className="mr-1"
                          >
                            {tag}
                          </Badge>
                        ))}
                </TableCell>
                <TableCell className="w-30">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setSelectedArt(image);
                    }}
                  >
                    Edit
                  </button>{" "}
                  |{" "}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedArt(image);
                    }}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
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
      />
    </>
  );
}
