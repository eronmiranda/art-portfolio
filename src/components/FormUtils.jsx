// Shared form utilities and components
import { cx } from "../lib/utils";

// Common input validation functions
export const validators = {
  required: (value, fieldName) => {
    if (!value?.trim()) return `${fieldName} is required`;
    return "";
  },

  email: (value) => {
    if (!value?.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  },

  minLength: (value, min, fieldName) => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return "";
  },

  maxLength: (value, max, fieldName) => {
    if (value && value.length > max) {
      return `${fieldName} must be less than ${max} characters`;
    }
    return "";
  },

  lettersOnly: (value, fieldName) => {
    if (value && !/^[a-zA-Z\s'-]+$/.test(value)) {
      return `${fieldName} can only contain letters`;
    }
    return "";
  },
};

// Common input styling function
export const getInputClassName = (fieldName, errors, touched, formData) => {
  const baseClass = "input-base transition-colors duration-200";
  const hasError = errors[fieldName] && touched[fieldName];
  const isValid =
    touched[fieldName] && !errors[fieldName] && formData[fieldName];

  if (hasError) {
    return cx(
      baseClass,
      "!outline-rose-300 focus:!outline-rose-400 dark:!outline-rose-400/60 dark:focus:!outline-rose-400/80",
    );
  }
  if (isValid) {
    return cx(
      baseClass,
      "!outline-teal-300 focus:!outline-teal-400 dark:!outline-teal-400/60 dark:focus:!outline-teal-400/80",
    );
  }
  return baseClass;
};

// Loading spinner component
export function LoadingSpinner({ size = "h-5 w-5", className = "" }) {
  return (
    <svg
      className={cx(size, "animate-spin text-white", className)}
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
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Status message components
export function SuccessMessage({ children }) {
  return (
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
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ErrorMessage({ children }) {
  return (
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
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
