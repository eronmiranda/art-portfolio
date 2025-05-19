import { cx, inputBaseStyles, focusInput } from "../lib/utils";

function handleForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  console.log("Form submitted:", data);
}

function ContactForm({ submitLabel }) {
  return (
    <form
      onSubmit={handleForm}
      action="#"
      method="POST"
      className="mx-auto max-w-xl"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            First name
          </label>
          <div className="mt-2.5">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              required
              className={cx(inputBaseStyles, focusInput)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Last name
          </label>
          <div className="mt-2.5">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              required
              className={cx(inputBaseStyles, focusInput)}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane.doe@email.com"
              required
              className={cx(inputBaseStyles, focusInput)}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Message
          </label>
          <div className="mt-2.5">
            <textarea
              id="message"
              name="message"
              rows={4}
              className={cx(inputBaseStyles, focusInput)}
              placeholder="Write your message here..."
            />
          </div>
        </div>
      </div>
      <div className="mt-10 transition active:translate-y-1">
        <button
          type="submit"
          className="block w-full rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {submitLabel ?? "Let's talk!"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
