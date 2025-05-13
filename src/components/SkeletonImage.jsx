function SkeletonImage() {
  return (
    <div className="absolute inset-0 z-10 mb-4 aspect-square animate-pulse overflow-hidden rounded-md bg-gray-200">
      <div className="h-full w-full bg-gray-300" />
    </div>
  )
}

export default SkeletonImage
