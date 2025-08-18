import useStorage from "./useStorage";
import { projectFirestore } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

function useUploadImage() {
  const { uploadFile, progress } = useStorage();

  const uploadImage = async (file, collectionName = "featured") => {
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

      const result = await uploadFile(file, collectionName);
      return { name: file.name, url: result.url };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return { progress, uploadImage };
}

export default useUploadImage;
