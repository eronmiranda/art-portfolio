import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import UploadForm from "../components/UploadForm";

function Admin() {
  const { signOut } = useAuth();
  const [error, setError] = useState(null);

  async function handleLogout() {
    setError("");

    try {
      await signOut();
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <UploadForm />
      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}

export default Admin;
