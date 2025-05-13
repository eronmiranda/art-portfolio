import { MotionImg } from "./Motion";

function LazyImage({ ...props }) {
  return (
    <MotionImg
      {...props}
      loading="lazy"
      decoding="async"
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
}

export default LazyImage;
