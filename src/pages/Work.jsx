import { useState } from "react";
import MasonryGrid from "../components/MasonryGrid";
import Modal from "../components/Modal";

function Work() {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <>
      <MasonryGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </>
  );
}

export default Work;
