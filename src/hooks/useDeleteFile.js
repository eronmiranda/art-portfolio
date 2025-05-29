import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export async function deleteFile(collectionName, fileName) {
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
    throw new Error(err.message);
  }
}
