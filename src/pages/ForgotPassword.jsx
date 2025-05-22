import FormCard from "../components/FormCard";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { cx } from "../lib/utils";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(data.email);
      setMessage("Check your inbox for further instructions");
      setShowToast(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/signin");
      }, 5000);
    } catch (error) {
      console.error(error);
      setError("Invalid email: failed to reset password");
      setShowToast(true);
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <Toast
          variant="danger"
          text={error}
          open={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
      {message && (
        <Toast
          variant="success"
          text={message}
          open={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="mt-15 flex flex-1 flex-col justify-center px-4 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Password Reset
          </h3>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
            Enter your email to reset your password.
          </p>
          <FormCard className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div>
              <form onSubmit={handleSubmit}>
                <div id="email">
                  <label
                    htmlFor="email"
                    className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="kali@email.com"
                    className="input-base mt-2.5"
                    required
                  />
                </div>
                <div
                  className={cx(
                    "mt-10 transition",
                    !loading && "active:translate-y-1",
                  )}
                >
                  <button
                    disabled={loading}
                    type="submit"
                    className={cx(
                      "flex w-full items-center justify-center gap-2 rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2",
                      loading && "animate-pulse",
                    )}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </FormCard>
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-500">
            Do you remember your password?{" "}
            <Link
              to="/signin"
              className="font-medium text-teal-500 hover:text-teal-600 dark:text-teal-500 hover:dark:text-teal-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
