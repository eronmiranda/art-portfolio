import { useState } from "react";
import useStorage from "../hooks/useStorage";
import { deleteFile } from "../hooks/useDeleteFile";
import { ProgressBar } from "./ProgressBar";
import FileLineIcon from "./FileLineIcon";
import CloseIcon from "./CloseIcon";
import DeleteBinIcon from "./DeleteBinIcon";
import LazyImage from "./LazyImage";
import Modal from "./Modal";

function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      className="text-gray-400 hover:text-gray-500 dark:text-gray-600 hover:dark:text-gray-500"
      aria-label="Cancel upload"
      onClick={onClick}
    >
      <CloseIcon className="size-5 shrink-0" aria-hidden={true} />
    </button>
  );
}

function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      className="text-red-500 hover:text-red-600 dark:text-red-500 hover:dark:text-red-400"
      aria-label="Delete uploaded image"
      onClick={onClick}
    >
      <DeleteBinIcon className="size-5 shrink-0" aria-hidden={true} />
    </button>
  );
}

function RoundedDangerIcon() {
  return (
    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
      <svg
        className="size-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    </div>
  );
}

function FileList({ file, collectionName, onClose, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { progress, url, error } = useStorage(collectionName, file);

  return (
    <li className="flex flex-col items-center justify-between py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {url ? (
            <LazyImage
              src={url}
              alt={file.name}
              className="size-10 shrink-0 rounded-md bg-gray-50 dark:bg-gray-900"
              placeholder="blur"
            />
          ) : (
            <FileLineIcon
              className="size-7 shrink-0 text-gray-500 dark:text-gray-500"
              aria-hidden={true}
            />
          )}
          <div>
            <p className="text-xs font-medium text-gray-900 dark:text-gray-50">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {file.size < 1024 * 1024
                ? `${(file.size / 1024).toFixed(2)} KB`
                : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
            </p>
          </div>
        </div>
        {!url ? (
          <CloseButton onClick={onClose} />
        ) : (
          <DeleteButton onClick={() => setIsModalOpen(true)} />
        )}
      </div>
      <div className="mt-2 flex w-full items-center space-x-3">
        {!url ? (
          <>
            <ProgressBar value={progress} className="w-full [&>*]:h-1.5" />
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {!error ? `${Math.round(progress)}%` : "Error uploading"}
            </span>
          </>
        ) : (
          <span className="ml-auto text-xs text-gray-500 dark:text-gray-500">
            Completed
          </span>
        )}
      </div>
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
                  Are you sure you want to delete "{file.name}"? This will be
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
                onDelete();
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
    </li>
  );
}

export default function FileUpload({ files, setFiles }) {
  const [error, setError] = useState(null);
  const collectionName = "featured";

  const handleCancelUpload = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleDeleteFile = async (collectionName, fileName) => {
    try {
      await deleteFile(collectionName, fileName);
      setFiles(files.filter((file) => file.name !== fileName));
      setError(null);
    } catch (err) {
      setError("Failed to delete file: " + err.message);
    }
  };

  return (
    <>
      {error && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
      <h4 className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-50">
        File Uploads
      </h4>
      <ul role="list" className="mt-4 space-y-4">
        {files.map((file) => (
          <FileList
            key={file.name}
            collectionName={collectionName}
            file={file}
            onClose={() => handleCancelUpload(file.name)}
            onDelete={() => handleDeleteFile(collectionName, file.name)}
          />
        ))}
      </ul>
    </>
  );
}
