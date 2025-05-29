import { useRef, useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timeStamp,
  auth,
} from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function useStorage(file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [docId, setDocId] = useState(null); // <-- Add this line
  const startedRef = useRef(false);

  useEffect(() => {
    if (!file || startedRef.current) return;
    startedRef.current = true;
    const storageRef = ref(projectStorage, `test-images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(projectFirestore, "test-images");

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
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const createdAt = timeStamp.now();
          const fileName = storageRef.name;
          const docRef = await addDoc(collectionRef, {
            url,
            createdAt,
            fileName,
          });
          setDocId(docRef.id);
          setUrl(url);
        } catch (err) {
          setError("Failed to upload file: " + err.message);
        }
      },
    );
  }, [file]);

  return { progress, url, error, docId };
}

export default useStorage;
