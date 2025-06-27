import { doc, updateDoc as update } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

function useUpdateDoc() {
  const updateDoc = async (collectionName, docId, data) => {
    const docRef = doc(projectFirestore, collectionName, docId);
    try {
      await update(docRef, data);
    } catch (err) {
      console.error("Error updating document:", err);
      throw new Error(`Failed to update document: ${err.message}`);
    }
  };

  return { updateDoc };
}

export default useUpdateDoc;
