import SkeletonImage from "./SkeletonImage";

function SkeletonGallery({ count = 10 }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 bg-clip-padding sm:grid-cols-3 md:mt-9 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonImage key={index} />
      ))}
    </div>
  );
}

export default SkeletonGallery;
