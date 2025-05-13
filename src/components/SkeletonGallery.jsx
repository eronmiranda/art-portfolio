import SkeletonImage from "./SkeletonImage"

function SkeletonGallery() {
  return (
    <div className="mt-6 bg-clip-padding md:mt-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gris-cols-5 gap-4">
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
  )
}

export default SkeletonGallery
