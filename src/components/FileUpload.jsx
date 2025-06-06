import { useState } from "react";
import { deleteFile } from "../hooks/useDeleteFile";
import { ProgressBar } from "./ProgressBar";
import CloseIcon from "./icons/CloseIcon";
import LazyImage from "./LazyImage";
import Modal from "./Modal";
import DeleteBinIcon from "./icons/DeleteBinIcon";
import FileLineIcon from "./icons/FileLineIcon";
import RoundedDangerIcon from "./icons/RoundedDangerIcon";
import useUploadImage from "../hooks/useUploadImage";
import ErrorWarningIcon from "./icons/ErrorWarningIcon";

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

function FileList({ file, collectionName = "featured", onRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { progress, url, error, validationError } = useUploadImage(
    file,
    collectionName,
  );
  const [deleteError, setDeleteError] = useState(null);

  const errors = [error, validationError, deleteError].filter(Boolean);
  const hasErrors = errors.length > 0;

  const handleCancelUpload = (fileName) => {
    onRemove(fileName);
  };

  const handleDeleteFile = async (fileName, collectionName) => {
    try {
      await deleteFile(collectionName, fileName);
      onRemove(fileName);
      setDeleteError(null);
    } catch (err) {
      setDeleteError("Failed to delete file: " + err.message);
    }
  };

  return (
    <li className="flex flex-col items-center justify-between p-4">
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
              className="size-10 shrink-0 text-gray-500 dark:text-gray-500"
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
        <div className="flex flex-col items-end justify-between space-y-1.5">
          {!url ? (
            <CloseButton onClick={() => handleCancelUpload(file.name)} />
          ) : (
            <>
              <DeleteButton onClick={() => setIsModalOpen(true)} />
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-500">
                Completed
              </span>
            </>
          )}
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col items-center space-y-1.5 space-x-3">
        {hasErrors &&
          errors.map((error, index) => (
            <div key={index} class="mt-4 flex items-center space-x-1.5">
              <ErrorWarningIcon />
              <span class="text-xs text-red-500 dark:text-red-500">
                {error}
              </span>
            </div>
          ))}
        {!url && !hasErrors && (
          <>
            <ProgressBar value={progress} className="w-full [&>*]:h-1.5" />
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {`${Math.round(progress)}%`}
            </span>
          </>
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
                handleDeleteFile(file.name, collectionName);
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

export default function FileUpload({ files, onRemove }) {
  return (
    <>
      <h4 className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-50">
        File Uploads
      </h4>
      <ul
        role="list"
        className="mt-4 divide-y divide-gray-200 dark:divide-gray-800"
      >
        {files.map((file) => (
          <FileList key={file.name} file={file} onRemove={onRemove} />
        ))}
      </ul>
    </>
  );
}
