import { useState } from "react";
import { cx } from "../lib/utils";
import { useDropzone } from "react-dropzone";
import FileUpload from "./FileUpload";
import FileLineIcon from "./FileLineIcon";

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prev) => {
        let newFiles = acceptedFiles.filter(
          (file) => !prev.some((f) => f.name === file.name),
        );
        return [...prev, ...newFiles];
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
      if (file.size > 25 * 1024 * 1024) {
        setError("File size exceeds 25MB");
        return;
      }
      validFiles.push(file);
    }
    setError(null);
    setFiles((prev) => [...prev, ...validFiles]);
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
            <span>Accepted file types: JPG, JPEG or PNG files.</span>
            <span className="pl-1 sm:pl-0">Max. size: 25MB</span>
          </p>
          {error && (
            <p className="mt-2 text-xs text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          {files.length > 0 && <FileUpload files={files} setFiles={setFiles} />}
        </form>
      </div>
    </>
  );
}
