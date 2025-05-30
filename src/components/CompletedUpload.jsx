import LazyImage from "./LazyImage";
import DeleteBinIcon from "./DeleteBinIcon";

export default function CompletedUpload({ file, url, onDelete }) {
  return (
    <li className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-2.5">
        <LazyImage
          src={url}
          alt={file.name}
          className="size-10 shrink-0 rounded-md bg-gray-50 dark:bg-gray-900"
          placeholder="blur"
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
        className="text-red-500 hover:text-red-600 dark:text-red-500 hover:dark:text-red-400"
        aria-label="Remove"
        onClick={onDelete}
      >
        <DeleteBinIcon className="size-5 shrink-0" aria-hidden={true} />
      </button>
    </li>
  );
}
