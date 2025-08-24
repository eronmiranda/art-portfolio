import { person } from "../resources/content.js";
import SocialLinks from "./SocialLinks";
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="mt-auto border-t border-transparent bg-transparent py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-8 lg:px-12">
        <p className="text-sm text-zinc-500 dark:text-zinc-100">
          © {currentYear} {person.name}. All rights reserved.
        </p>
        <SocialLinks compact />
      </div>
    </footer>
  );
}

export default Footer;
