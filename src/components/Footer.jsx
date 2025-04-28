import { person } from "../resources/content.js";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="mt-auto border-t border-zinc-100 bg-zinc-100 py-8">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:flex-row sm:justify-end sm:px-8 lg:px-12">
      <p className="text-sm text-zinc-500">
        © {currentYear} {person.name}. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
