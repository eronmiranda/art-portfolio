import { useRef, useState } from "react";
import {
  projectStorage,
  projectFirestore,
  timeStamp,
  auth,
} from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function useStorage() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const startedRef = useRef(false);

  const uploadImage = (file, collectionName = "featured") => {
    if (!file || startedRef.current) return;
    startedRef.current = true;

    const path = `${collectionName}/${file.name}`;
    const storageRef = ref(projectStorage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(projectFirestore, collectionName);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      },
      (err) => {
        setError(err);
        setIsUploading(false);
      },
      async () => {
        try {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            setError("You must be logged in to upload files.");
            return;
          }
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const createdAt = timeStamp.now();
            const fileName = storageRef.name;
            addDoc(collectionRef, { url, createdAt, fileName });
            setUrl(url);
            setIsUploading(false);
          });
        } catch (err) {
          setError("Failed to upload file: " + err.message);
          setIsUploading(false);
        }
      },
    );
  };

  return { uploadImage, progress, url, error, isUploading };
}

export default useStorage;
