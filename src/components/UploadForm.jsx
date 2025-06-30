import { cx } from "../lib/utils";
import { useDropzone } from "react-dropzone";
import FileLineIcon from "./icons/FileLineIcon";
import { toast } from "sonner";
import useUploadImage from "../hooks/useUploadImage";

export default function UploadForm() {
  const { uploadImage } = useUploadImage();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (selectedFiles) => {
      selectedFiles.forEach((file) => {
        const uploadPromise = uploadImage(file, "featured");

        toast.promise(uploadPromise, {
          loading: `Uploading ${file.name}...`,
          success: (data) => {
            return `${data.name} uploaded successfully!`;
          },
          error: (error) => {
            return `Failed to upload ${file.name}: ${error.message}`;
          },
        });
      });
    },
  });

  const handleFileChange = async (event) => {
    let selectedFiles = Array.from(event.target.files);

    selectedFiles.forEach((file) => {
      const uploadPromise = uploadImage(file, "featured");

      toast.promise(uploadPromise, {
        loading: `Uploading ${file.name}...`,
        success: (data) => {
          return `${data.name} uploaded successfully!`;
        },
        error: (error) => {
          return `Failed to upload ${file.name}: ${error.message}`;
        },
      });
    });
  };

  return (
    <>
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
            <div>
              <p className="text-center text-xs/5 text-gray-500 dark:text-gray-500">
                JPG, JPEG, PNG up to 25MB
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
