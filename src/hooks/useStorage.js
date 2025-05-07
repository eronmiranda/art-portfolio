import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timeStamp,
} from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function useStorage(file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(projectStorage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const collectionRef = collection(projectFirestore, "images");

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
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const createdAt = timeStamp.now();
          const fileName = storageRef.name;
          addDoc(collectionRef, { url, createdAt, fileName });
          setUrl(url);
        });
      },
    );
  }, [file]);

  return { progress, url, error };
}

export default useStorage;
