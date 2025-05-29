import { useRef, useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timeStamp,
  auth,
} from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function useStorage(collectionName, file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!file || startedRef.current) return;
    startedRef.current = true;
    const storagePath = `${collectionName}/${file.name}`;
    const storageRef = ref(projectStorage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(projectFirestore, collectionName);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
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
          });
        } catch (err) {
          setError("Failed to upload file: " + err.message);
        }
      },
    );
  }, [collectionName, file]);

  return { progress, url, error };
}

export default useStorage;
