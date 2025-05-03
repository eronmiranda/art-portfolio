import MasonryGrid from "../components/MasonryGrid";
import useFirestore from "../hooks/useFirestore";

function Work() {
  const { docs } = useFirestore("images");
  const artworks = docs
    .filter((doc) => doc.url !== undefined)
    .map((doc) => ({
      src: doc.url,
      alt: doc.title,
      title: doc.title,
    }));

  return <MasonryGrid artworks={artworks} className="mt-6 md:mt-9" />;
}

export default Work;
