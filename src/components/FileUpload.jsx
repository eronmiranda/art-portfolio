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
    <li key={file.name} className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <FileLineIcon
            className="size-7 shrink-0 text-gray-500 dark:text-gray-500"
            aria-hidden={true}
          />
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
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500 dark:text-gray-600 hover:dark:text-gray-500"
          aria-label="Cancel"
          onClick={() => onClose(file)}
        >
          <CloseIcon className="size-5 shrink-0" aria-hidden={true} />
        </button>
      </div>
      <div className="mt-2 flex items-center space-x-3">
        <ProgressBar value={progress} className="[&>*]:h-1.5" />
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {!error ? `${Math.round(progress)}%` : "Error uploading"}
        </span>
      </div>
    </li>
  );
}
