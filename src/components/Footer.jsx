import { person } from '../resources/content.js';

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="mt-auto bg-zinc-100 border-t border-zinc-100 py-8">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 flex flex-col items-center sm:flex-row sm:justify-end">
      <p className="text-sm text-zinc-500">
        © {currentYear} {person.name}. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
