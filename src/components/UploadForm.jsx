import { useState } from "react";
import { cx } from "../lib/utils";
import { useDropzone } from "react-dropzone";
import FileUpload from "./FileUpload";
import FileLineIcon from "./FileLineIcon";

function ErrorWarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      className="size-5 shrink-0 text-red-500 dark:text-red-500"
    >
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z" />
    </svg>
  );
}

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const validateFiles = (selectedFiles) => {
    let types = ["image/jpg", "image/jpeg", "image/png"];
    let validFiles = [];
    for (let file of selectedFiles) {
      if (!types.includes(file.type)) {
        setError(
          "Please select a valid image file (JPG, JPEG, PNG) with size less than 25MB",
        );
        return [];
      }
      if (file.size > 25 * 1024 * 1024) {
        setError("File size exceeds 25MB");
        return [];
      }
      validFiles.push(file);
    }
    setError(null);
    return validFiles;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const validFiles = validateFiles(acceptedFiles);
      if (validFiles.length > 0) {
        setFiles((prev) => {
          let newFiles = validFiles.filter(
            (file) => !prev.some((f) => f.name === file.name),
          );
          return [...prev, ...newFiles];
        });
      }
    },
  });

  const handleFileChange = (event) => {
    let selectedFiles = Array.from(event.target.files);
    const validFiles = validateFiles(selectedFiles);
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:max-w-lg">
        <form>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            File(s) to Upload
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
            <span className="pr-2">
              Accepted file types: JPG, JPEG or PNG files.
            </span>
            <span className="pl-1 sm:pl-0">Max. size: 25MB</span>
          </p>
          {error && (
            <div className="mt-6 flex items-center space-x-2.5 rounded-md bg-red-50 p-4 dark:bg-red-500/10">
              <ErrorWarningIcon />
              <p className="text-xs text-red-600 dark:text-red-500">{error}</p>
            </div>
          )}
          {files.length > 0 && <FileUpload files={files} setFiles={setFiles} />}
        </form>
      </div>
    </>
  );
}
