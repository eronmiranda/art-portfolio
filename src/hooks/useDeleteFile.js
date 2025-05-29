import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export async function deleteFile(fileName) {
  try {
    const storageRef = ref(projectStorage, `test-images/${fileName}`);
    await deleteObject(storageRef);

    const collectionRef = collection(projectFirestore, "test-images");
    const q = query(collectionRef, where("fileName", "==", fileName));
    const snapshot = await getDocs(q);
    for (const doc of snapshot.docs) {
      await deleteDoc(doc.ref);
    }
  } catch (err) {
    throw new Error("Failed to delete file: " + err.message);
  }
}

export async function deleteFileById(docId, fileName) {
  try {
    const storageRef = ref(projectStorage, `test-images/${fileName}`);
    console.log(storageRef);
    await deleteObject(storageRef);

    const docRef = doc(projectFirestore, "test-images", docId);
    await deleteDoc(docRef);
  } catch (err) {
    throw new Error("Failed to delete file by ID: " + err.message);
  }
}
