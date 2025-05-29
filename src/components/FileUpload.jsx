import { useState } from "react";
import useStorage from "../hooks/useStorage";
import { deleteFile } from "../hooks/useDeleteFile";
import { ProgressBar } from "./ProgressBar";
import FileLineIcon from "./FileLineIcon";
import CloseIcon from "./CloseIcon";
import DeleteBinIcon from "./DeleteBinIcon";
import LazyImage from "./LazyImage";

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

function FileList({ file, collectionName, onClose, onDelete }) {
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
          <DeleteButton onClick={onDelete} />
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
