import { useState } from "react";
import MasonryGrid from "../components/MasonryGrid";
import Modal from "../components/Modal";
import useFirestore from "../hooks/useFirestore";

function Work() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { docs } = useFirestore("images");
  const artworks = docs
    .filter((doc) => doc.url !== undefined)
    .map((doc) => ({
      src: doc.url,
      alt: doc.fileName,
  }));

  return (
    <>
      <MasonryGrid setSelectedImg={setSelectedImg} artworks={artworks} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </>
  );
}

export default Work;
