import SkeletonImage from "./SkeletonImage";

function SkeletonGallery() {
  return (
    <div className="lg:grid-cols-5 mt-6 grid grid-cols-2 gap-4 bg-clip-padding sm:grid-cols-3 md:mt-9 md:grid-cols-4">
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
    </div>
  );
}

export default SkeletonGallery;
