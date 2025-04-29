import MasonryGrid from "../components/MasonryGrid";
import useFirestore from "../hooks/useFirestore";

function Work() {
  const { docs } = useFirestore("images");
  const artworks = docs
    .filter((doc) => doc.url !== undefined)
    .map((doc) => ({
      src: doc.url,
      alt: doc.fileName,
  }));

  return <MasonryGrid artworks={artworks} />;
}

export default Work;
