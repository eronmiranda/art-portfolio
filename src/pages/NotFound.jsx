export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] pb-40">
      <div className="mb-2 text-6xl font-extrabold tracking-tight">404</div>
      <h1 className="mb-6 text-2xl font-semibold">Page Not Found</h1>
      <p className="text-neutral-500 text-lg">
        The page you are looking for does not exist.
      </p>
    </section>
  );
}
