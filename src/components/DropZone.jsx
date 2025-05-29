import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { cx } from "../lib/utils";

function DeleteBinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-2.293 2.293L10 14.414l-3.707-3.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FileLineIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      className={cx("size-5 text-gray-700 dark:text-gray-300", className)}
    >
      <path d="M9 2.00318V2H19.9978C20.5513 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8L9 2.00318ZM5.82918 8H9V4.83086L5.82918 8ZM11 4V9C11 9.55228 10.5523 10 10 10H5V20H19V4H11Z" />
    </svg>
  );
}

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  const filesList = files.map((file) => (
    <li
      key={file.path}
      className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <button
          type="button"
          className="rounded-md p-2 text-gray-400 hover:text-gray-500 dark:text-gray-600 hover:dark:text-gray-500"
          aria-label="Remove file"
          onClick={() =>
            setFiles((prevFiles) =>
              prevFiles.filter((prevFile) => prevFile.name !== file.name),
            )
          }
        >
          <DeleteBinIcon aria-hidden={true} />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
          <FileLineIcon aria-hidden={true} />
        </span>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-900 dark:text-gray-50">
          {file.name}
        </p>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">
          {file.size} bytes
        </p>
      </div>
    </li>
  ));

  return (
    <>
      <div className="sm:mx-auto sm:max-w-3xl">
        <form>
          <h2 className="font-semibold text-gray-900 dark:text-gray-50">
            Upload your art files
          </h2>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="file-upload" className="font-medium">
                File(s) upload
              </label>
              <div
                {...getRootProps()}
                className={cx(
                  isDragActive
                    ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950"
                    : "",
                  "mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-20 dark:border-gray-800",
                )}
              >
                <div>
                  <FileLineIcon
                    className="mx-auto size-12 text-gray-400 dark:text-gray-600"
                    aria-hidden={true}
                  />
                  <div className="mt-4 flex text-sm/6 text-gray-500 dark:text-gray-500">
                    <p>Drag and drop or</p>
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer rounded-md pl-1 font-medium text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                    >
                      <span>choose file(s)</span>
                      <input
                        {...getInputProps()}
                        id="file-upload-2"
                        name="file-upload-2"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">to upload</p>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs/5 text-gray-500 sm:flex sm:items-center sm:justify-between dark:text-gray-500">
                <span>All file types are allowed to upload.</span>
                <span className="pl-1 sm:pl-0">Max. size per file: 50MB</span>
              </p>
              {filesList.length > 0 && (
                <>
                  <h4 className="darK:text-gray-50 mt-6 text-sm font-medium text-gray-900">
                    Files(s) to upload
                  </h4>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
