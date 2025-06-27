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
import { Badge, badgeVariants } from "./ui/Badge";

function EditModal({ isModalOpen, setIsModalOpen, onEdit, art }) {
  const [display, setDisplay] = useState(art.display);
  const { updateDoc } = useUpdateDoc();

  useEffect(() => {
    setDisplay(art.display || false);
  }, [art.display]);

  const handleForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    await updateDoc("featured", art.id, {
      ...data,
      display: display,
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
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="max-w-sm rounded-lg bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 md:max-w-lg">
        <form
          onSubmit={handleForm}
          action="#"
          method="POST"
          className="mx-auto max-w-xl"
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
                  autoComplete="title"
                  placeholder="Image Title"
                  className="input-base"
                  defaultValue={art.title || ""}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-3 px-4 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              onClick={() => {
                onEdit(art);
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
    () => Array.from(new Set(images.flatMap((image) => image.tags ?? []))),
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
                    : image.tags.map((tag, index) => (
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
      />
    </>
  );
}
