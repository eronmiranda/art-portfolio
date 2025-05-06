import { useState } from "react";

function Admin() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpg", "image/jpeg"];
  const changeHandler = (event) => {
    let selected = event.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (png, jpg, jpeg)");
    }
  };

  console.log("File selected:", file);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      {file && <p className="text-green-500">File selected: {file.name}</p>}
      <form>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={changeHandler}
          />
          <span>+</span>
        </label>
      </form>
    </div>
  );
}

export default Admin;
