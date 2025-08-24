import { useState } from "react";

function ContactForm({ submitLabel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return "First name can only contain letters";
        return "";

      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return "Last name can only contain letters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return "";

      case "message":
        if (value && value.length < 10)
          return "Message must be at least 10 characters";
        if (value && value.length > 1000)
          return "Message must be less than 1000 characters";
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, message: true });
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setSubmitStatus("success");

      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "input-base transition-colors duration-200";
    const hasError = errors[fieldName] && touched[fieldName];
    const isValid =
      touched[fieldName] && !errors[fieldName] && formData[fieldName];

    if (hasError) {
      return `${baseClass} !outline-rose-300 dark:!outline-rose-400/60 focus:!outline-rose-400 dark:focus:!outline-rose-400/80`;
    }
    if (isValid) {
      return `${baseClass} !outline-teal-300 dark:!outline-teal-400/60 focus:!outline-teal-400 dark:focus:!outline-teal-400/80`;
    }
    return baseClass;
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
      {submitStatus === "success" && (
        <div className="mb-6 rounded-md bg-teal-50/70 p-4 dark:bg-teal-900/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-teal-400 dark:text-teal-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200">
                Message sent successfully! I'll get back to you soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 rounded-md bg-rose-50/70 p-4 dark:bg-rose-900/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-rose-400 dark:text-rose-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-rose-600 dark:text-rose-300">
                Something went wrong. Please try again later.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            First name *
          </label>
          <div className="mt-2.5">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={getInputClassName("firstName")}
              aria-invalid={
                errors.firstName && touched.firstName ? "true" : "false"
              }
              aria-describedby={
                errors.firstName && touched.firstName
                  ? "firstName-error"
                  : undefined
              }
            />
            {errors.firstName && touched.firstName && (
              <p
                id="firstName-error"
                className="mt-2 text-sm text-rose-500 dark:text-rose-400"
              >
                {errors.firstName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Last name *
          </label>
          <div className="mt-2.5">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={getInputClassName("lastName")}
              aria-invalid={
                errors.lastName && touched.lastName ? "true" : "false"
              }
              aria-describedby={
                errors.lastName && touched.lastName
                  ? "lastName-error"
                  : undefined
              }
            />
            {errors.lastName && touched.lastName && (
              <p
                id="lastName-error"
                className="mt-2 text-sm text-rose-500 dark:text-rose-400"
              >
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Email *
          </label>
          <div className="mt-2.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane.doe@email.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={getInputClassName("email")}
              aria-invalid={errors.email && touched.email ? "true" : "false"}
              aria-describedby={
                errors.email && touched.email ? "email-error" : undefined
              }
            />
            {errors.email && touched.email && (
              <p
                id="email-error"
                className="mt-2 text-sm text-rose-500 dark:text-rose-400"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Message
            {formData.message && (
              <span className="ml-2 text-sm font-normal text-zinc-500">
                ({formData.message.length}/1000)
              </span>
            )}
          </label>
          <div className="mt-2.5">
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={getInputClassName("message")}
              aria-invalid={
                errors.message && touched.message ? "true" : "false"
              }
              aria-describedby={
                errors.message && touched.message ? "message-error" : undefined
              }
            />
            {errors.message && touched.message && (
              <p
                id="message-error"
                className="mt-2 text-sm text-rose-500 dark:text-rose-400"
              >
                {errors.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 transition active:translate-y-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            (submitLabel ?? "Let's talk!")
          )}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
