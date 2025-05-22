import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cx } from "../lib/utils";
import { Link } from "react-router-dom";

export default function SignInForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      setError("");
      setLoading(true);
      await signIn(data.email, data.password);
      navigate("/admin");
    } catch {
      setError("Error signing in with email and password");
    }
    setLoading(false);
  }

  return (
    <form
      action="#"
      method="post"
      className="space-y-4"
      onSubmit={handleSignIn}
    >
      <div>
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
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-md font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Password
          </label>
          <Link
            to="/forgot-password"
            className="mt-2 text-sm font-medium text-teal-500 hover:text-teal-600 dark:text-teal-500 hover:dark:text-teal-600"
          >
            Forgot your password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          placeholder="Password"
          className="input-base mt-2.5"
          required
        />
      </div>
      <div
        className={cx("mt-10 transition", !loading && "active:translate-y-1")}
      >
        <button
          disabled={loading}
          type="submit"
          className={cx(
            "flex w-full items-center justify-center gap-2 rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2",
            loading && "animate-pulse",
          )}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
