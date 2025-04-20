const Footer = () => {
  return (
    <footer className="mt-auto bg-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-zinc-100 pt-6 pb-10">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="flex flex-col items-center justify-end sm:flex-row">
              <p className="text-sm text-zinc-500">
                © {new Date().getFullYear()} Marave Bautista. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
