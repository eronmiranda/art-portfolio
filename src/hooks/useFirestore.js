import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

function useFirestore(collectionName) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const collectionRef = collection(projectFirestore, collectionName);
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return docs;
}

export default useFirestore;
