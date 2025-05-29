import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import FileUpload from "../components/FileUpload";

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
      <FileUpload onFileChange={changeHandler} />
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
