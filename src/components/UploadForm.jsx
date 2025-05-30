import { useState } from "react";
import { cx } from "../lib/utils";
import { useDropzone } from "react-dropzone";
import LazyImage from "./LazyImage";
import { deleteFile } from "../hooks/useDeleteFile";
import FileUpload from "./FileUpload";
import FileLineIcon from "./FileLineIcon";
import DeleteBinIcon from "./DeleteBinIcon";

export default function UploadForm() {
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

  const handleDeleteFile = async (fileName) => {
    try {
      await deleteFile(fileName);
      setUploaded(uploaded.filter(({ file }) => file.name !== fileName));
    } catch (err) {
      setError("Failed to delete file: " + err.message);
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
                In Progress
              </h4>
              <ul role="list" className="mt-4 space-y-4">
                {files.map((file) => (
                  <FileUpload
                    key={file.name}
                    file={file}
                    collectionName="featured"
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
