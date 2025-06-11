import { useState } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

function useDeleteFile() {
  const [error, setError] = useState(null);
  const deleteFile = async (fileName, collectionName = "featured") => {
    try {
      const storagePath = `${collectionName}/${fileName}`;
      const storageRef = ref(projectStorage, storagePath);
      await deleteObject(storageRef);

      const collectionRef = collection(projectFirestore, collectionName);
      const q = query(collectionRef, where("fileName", "==", fileName));
      const snapshot = await getDocs(q);
      for (const doc of snapshot.docs) {
        await deleteDoc(doc.ref);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return { deleteFile, error };
}

export default useDeleteFile;
