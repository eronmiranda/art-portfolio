import { useState } from "react";
import {
  validators,
  getInputClassName,
  LoadingSpinner,
  SuccessMessage,
  ErrorMessage,
} from "./FormUtils";

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
        return (
          validators.required(value, "First name") ||
          validators.minLength(value, 2, "First name") ||
          validators.lettersOnly(value, "First name")
        );

      case "lastName":
        return (
          validators.required(value, "Last name") ||
          validators.minLength(value, 2, "Last name") ||
          validators.lettersOnly(value, "Last name")
        );

      case "email":
        return validators.email(value);

      case "message":
        return (
          validators.minLength(value, 10, "Message") ||
          validators.maxLength(value, 1000, "Message")
        );

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

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
      {submitStatus === "success" && (
        <SuccessMessage>
          Message sent successfully! I'll get back to you soon.
        </SuccessMessage>
      )}

      {submitStatus === "error" && (
        <ErrorMessage>
          Something went wrong. Please try again later.
        </ErrorMessage>
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
              className={getInputClassName(
                "firstName",
                errors,
                touched,
                formData,
              )}
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
              className={getInputClassName(
                "lastName",
                errors,
                touched,
                formData,
              )}
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
              className={getInputClassName("email", errors, touched, formData)}
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
              className={getInputClassName(
                "message",
                errors,
                touched,
                formData,
              )}
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
              <LoadingSpinner className="mr-3 -ml-1" />
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
