import { useAuth } from "../contexts/AuthContext";
import UploadForm from "../components/UploadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import ImageTable from "../components/ImageTable";
import useFirestore from "../hooks/useFirestore";
import { toast } from "sonner";

function Admin() {
  const { signOut } = useAuth();
  const portfolioCollection = useFirestore("portfolio");

  async function handleLogout() {
    await signOut()
      .then(() => {
        toast.success("Successfully logged out");
      })
      .catch(() => {
        toast.error("Failed to log out");
      });
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back, Marave
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm leading-4 font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Content Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your portfolio collection
          </p>
        </div>

        <Tabs defaultValue="portfolio" className="w-full">
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <TabsList className="h-auto bg-transparent p-0">
              <TabsTrigger
                value="portfolio"
                className="rounded-none px-4 py-3 font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none dark:text-gray-400 dark:hover:text-gray-300"
              >
                Portfolio Collection
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="portfolio" className="space-y-8">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <UploadForm collectionName="portfolio" />
            </div>
            <ImageTable
              collectionName="portfolio"
              images={portfolioCollection}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Admin;
