import { useState } from "react";
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

  const uploadFile = (file, collectionName = "featured") => {
    return new Promise((resolve, reject) => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        reject(new Error("You must be logged in to upload files."));
        return;
      }

      const path = `${collectionName}/${file.name}`;
      const storageRef = ref(projectStorage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const collectionRef = collection(projectFirestore, collectionName);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.round(percent));
        },
        (err) => {
          reject(err);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const createdAt = timeStamp.now();
            const fileName = storageRef.name;

            await addDoc(collectionRef, {
              url,
              createdAt,
              fileName,
              title: fileName,
              display: false,
              tags: [],
            });

            resolve({ url, fileName });
          } catch (err) {
            reject(new Error("Failed to upload file: " + err.message));
          }
        },
      );
    });
  };

  return { uploadFile, progress };
}

export default useStorage;
