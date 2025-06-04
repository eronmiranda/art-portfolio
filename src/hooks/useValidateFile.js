import { projectFirestore } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function validateFile(file, collectionName) {
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

    const collectionRef = collection(projectFirestore, collectionName);
    const q = query(collectionRef, where("fileName", "==", file.name));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      throw new Error(
        `${file.name}: A file with this name already exists. Please rename your file.`,
      );
    }

    return file;
  } catch (err) {
    throw new Error(err.message);
  }
}
