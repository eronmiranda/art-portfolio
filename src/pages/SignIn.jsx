import SignInForm from "../components/SignInForm";
import FormCard from "../components/FormCard";

export default function SignIn() {
  return (
    <>
      <div className="mt-15 flex flex-1 flex-col justify-center px-4 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Welcome Back
          </h3>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
            Enter your credentials to access your account.
          </p>
          <FormCard className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <SignInForm />
          </FormCard>
        </div>
      </div>
    </>
  );
}
