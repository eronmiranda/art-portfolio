import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import UploadForm from "../components/UploadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";

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
            <p>
              We ship worldwide via UPS Expedited. We offer flat rate shipping
              to customers in Canada ($30), the EU, Japan, and Singapore
              ($45–$65+), and Australia ($65). Note that most brokerage fees are
              included in the price of UPS Expedited shipping, with the
              exception of a possible $10 fee assessed in Canada only if prior
              arrangements to pay for duties and taxes are not made (see next
              question and answer).
            </p>
            <p>
              Outside of the United States, tariffs, duties, and taxes are the
              responsibility of the customer and are usually paid at time of
              delivery.
            </p>
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
