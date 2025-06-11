import { useRef, useState, useEffect } from "react";
import useStorage from "./useStorage";
import { projectFirestore } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

function useUploadImage(file, collectionName = "featured") {
  const {
    uploadFile,
    progress,
    url,
    error: storageError,
    isUploading,
  } = useStorage();
  const [error, setError] = useState(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!file || startedRef.current) return;
    startedRef.current = true;

    const validateAndUpload = async () => {
      try {
        let types = ["image/jpg", "image/jpeg", "image/png"];
        if (!types.includes(file.type)) {
          throw new Error(
            "Please select a valid image file (JPG, JPEG, PNG) with size less than 25MB",
          );
        }

        if (file.size > 25 * 1024 * 1024) {
          throw new Error("File size exceeds 25MB");
        }

        let collectionRef = collection(projectFirestore, collectionName);
        let q = query(collectionRef, where("fileName", "==", file.name));
        let snapshot = await getDocs(q);
        if (!snapshot.empty) {
          throw new Error(
            "A file with this name already exists. Please rename your file.",
          );
        }

        uploadFile(file, collectionName);
        if (storageError) setError(storageError);
      } catch (err) {
        setError(err.message);
      }
    };
    validateAndUpload();
  }, [uploadFile, file, collectionName, storageError]);

  return { progress, url, isUploading, error };
}

export default useUploadImage;
