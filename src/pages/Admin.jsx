import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Admin() {
  const { signOut } = useAuth();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpg", "image/jpeg"];

  function changeHandler(event) {
    let selected = event.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (png, jpg, jpeg)");
    }
    console.log("File selected:", file);
  }

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
      <form>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/png, image/jpg, image/jpeg"
            onChange={changeHandler}
            className="block w-full file:my-2 file:mr-2 file:cursor-pointer file:rounded-md file:border file:border-solid file:border-gray-200 file:bg-white file:px-4 file:py-1.5 file:shadow-xs file:hover:border-gray-300 file:active:bg-gray-100 file:disabled:bg-gray-100 file:hover:disabled:cursor-not-allowed file:hover:disabled:border-gray-200 file:active:disabled:bg-white dark:file:border-gray-700 dark:file:bg-gray-950 file:dark:hover:border-gray-600 file:dark:hover:disabled:border-gray-700"
          />
        </label>
      </form>
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
