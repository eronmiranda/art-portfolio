import { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { ProgressBar } from "./ProgressBar";
import FileLineIcon from "./FileLineIcon";
import CloseIcon from "./CloseIcon";

export default function FileUpload({
  file,
  collectionName,
  onUpload,
  onClose,
}) {
  const { progress, url, error } = useStorage(collectionName, file);

  useEffect(() => {
    if (url && onUpload) {
      onUpload(url);
    }
  }, [url, onUpload]);

  return (
    <li key={file.name}>
      <div className="relative mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
        <div className="absolute top-1 right-1">
          <button
            type="button"
            className="text-gray-400d rounded-md p-2 hover:text-gray-500 dark:text-gray-600 hover:dark:text-gray-500"
            aria-label="Remove file"
            onClick={() => onClose(file)}
          >
            <CloseIcon className="size-5 shrink-0" aria-hidden={true} />
          </button>
        </div>
        <div className="flex items-center space-x-2.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-gray-200 ring-inset dark:bg-gray-950 dark:ring-gray-800">
            <FileLineIcon
              className="size-5 text-gray-700 dark:text-gray-300"
              aria-hidden={true}
            />
          </span>
          <div>
            <p className="text-xs font-medium text-gray-900 dark:text-gray-50">
              {file.name}
            </p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">
              {file.size} bytes
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <ProgressBar value={progress} />
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {Math.round(progress)}% {error ? "Error uploading" : "Uploading..."}
          </span>
        </div>
      </div>
    </li>
  );
}
