import { cx } from "../lib/utils";

function LazyImage({ src, alt, className, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cx("object-contain", className)}
      loading="lazy"
      decoding="async"
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      {...props}
    />
  );
}

export default LazyImage;
