import { contact } from "../resources/content";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

function Contact() {
  return (
    <div className="isolate px-6 py-8 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-25">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          {contact.headline}
        </h2>
        <p className="mt-6 max-w-2xl text-xl text-zinc-600 dark:text-zinc-300">
          {contact.subline}
        </p>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Find me here on my socials
          </h3>
          <SocialLinks />
        </div>
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Or, get in touch with me via the form below
          </h3>
          <ContactForm submitLabel={contact.submitLabel} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
