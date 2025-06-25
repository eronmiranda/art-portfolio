import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import UploadForm from "../components/UploadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import ImageTable from "../components/ImageTable";
import useFirestore from "../hooks/useFirestore";
import { toast } from "sonner";

function Admin() {
  const { signOut } = useAuth();
  const [error, setError] = useState(null);
  const images = useFirestore("images");

  async function handleLogout() {
    setError("");
    await signOut()
      .then(() => {
        toast.success("Successfully logged out");
      })
      .error(() => {
        setError("Failed to log out");
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <Tabs defaultValue="featured" className="w-full max-w-2xl">
        <TabsList>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        <div className="mt-4 ml-2">
          <TabsContent
            value="featured"
            className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
          >
            <UploadForm />
          </TabsContent>
          <TabsContent
            value="portfolio"
            className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
          >
            <ImageTable images={images} />
          </TabsContent>
        </div>
      </Tabs>
      {error && <p className="text-red-500">{error}</p>}

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
