import CTAButton from "./CTAButton";

function CTASection({ description, label, link }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="mb-4 text-center text-lg text-zinc-700 dark:text-zinc-300">
        {description ?? "Ready to see more?"}
      </p>
      <div className="flex justify-center">
        <CTAButton to={link}>{label ?? "Explore my Portfolio"}</CTAButton>
      </div>
    </div>
  );
}

export default CTASection;
