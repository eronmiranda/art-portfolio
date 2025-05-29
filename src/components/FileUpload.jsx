import { useState, useEffect } from "react";
import { cx } from "../lib/utils";
import useStorage from "../hooks/useStorage";
import { ProgressBar } from "./ProgressBar";
import { useDropzone } from "react-dropzone";
import LazyImage from "./LazyImage";

function FileLineIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      className={cx(
        "mx-auto size-12 text-gray-400 dark:text-gray-500",
        className,
      )}
    >
      <path d="M9 2.00318V2H19.9978C20.5513 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8L9 2.00318ZM5.82918 8H9V4.83086L5.82918 8ZM11 4V9C11 9.55228 10.5523 10 10 10H5V20H19V4H11Z" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      className={cx("size-5 shrink-0", className)}
    >
      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
    </svg>
  );
}

function DeleteBinIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      className={cx("size-5 shrink-0", className)}
    >
      <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z" />
    </svg>
  );
}

function FileProgress({ file, onUpload, onClose }) {
  const { progress, url, error } = useStorage(file);

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
              className="dark:xx`x size-5 text-gray-300 text-gray-700"
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

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => {
        let newFiles = acceptedFiles.filter(
          (file) => !prevFiles.some((f) => f.name === file.name),
        );
        return [...prevFiles, ...newFiles];
      });
    },
  });

  const handleFileChange = (event) => {
    let selectedFiles = Array.from(event.target.files);
    let types = ["image/jpg", "image/jpeg", "image/png"];
    let validFiles = [];
    for (let file of selectedFiles) {
      if (!types.includes(file.type)) {
        setError(
          "Please select a valid image file (JPG, JPEG, PNG) with size less than 10MB",
        );
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB");
        return;
      }
      validFiles.push(file);
    }
    setError(null);
    setFiles(validFiles);
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleDeleteFile = (fileName) => {
    setUploaded(uploaded.filter(({ file }) => file.name !== fileName));
  };

  return (
    <>
      <div className="sm:mx-auto sm:max-w-lg">
        <form>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            File Upload
          </h3>
          <div
            {...getRootProps()}
            className={cx(
              "mt-4 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-20 dark:border-gray-800",
              isDragActive &&
                "border-teal-500 bg-teal-50 dark:border-teal-500 dark:bg-teal-950",
            )}
          >
            <div>
              <FileLineIcon
                className="mx-auto size-12 text-gray-400 dark:text-gray-500"
                aria-hidden={true}
              />
              <div className="mt-4 flex text-sm/6 text-gray-500 dark:text-gray-500">
                <p>Drag and drop or</p>
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md pl-1 font-medium text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                >
                  <span>choose file</span>
                  <input
                    {...getInputProps()}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
                <p className="pl-1">to upload</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs/5 text-gray-500 sm:flex sm:items-center sm:justify-between dark:text-gray-500">
            <span>Accepted file types: JPG, JPEG or PNG files.</span>
            <span className="pl-1 sm:pl-0">Max. size: 10MB</span>
          </p>
          {error && (
            <p className="mt-2 text-xs text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          {files.length > 0 && (
            <>
              <h4 className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-50">
                File(s) to upload
              </h4>
              <ul role="list" className="mt-4 space-y-4">
                {files.map((file) => (
                  <FileProgress
                    key={file.name}
                    file={file}
                    onUpload={(url) => {
                      setUploaded((prev) =>
                        prev.some((item) => item.file.name === file.name)
                          ? prev
                          : [...prev, { file, url }],
                      );
                      setFiles((prevFiles) =>
                        prevFiles.filter((f) => f.name !== file.name),
                      );
                    }}
                    onClose={handleRemoveFile}
                  />
                ))}
              </ul>
            </>
          )}
          {uploaded.length > 0 && (
            <>
              <h4 className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Completed Uploads
              </h4>
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
              >
                {uploaded.map(({ file, url }) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center space-x-2.5">
                      <LazyImage
                        src={url}
                        alt={file.name}
                        className="size-10 shrink-0 rounded-md bg-gray-50 dark:bg-gray-900"
                        placeholder="blur"
                        blurDataURL={url}
                      />
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-50">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {file.size} bytes
                        </p>
                      </div>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 dark:text-red-500 hover:dark:text-red-400"
                      aria-label="Remove"
                      onClick={() => handleDeleteFile(file.name)}
                    >
                      <DeleteBinIcon
                        className="size-5 shrink-0"
                        aria-hidden={true}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </form>
      </div>
    </>
  );
}
