import { cx } from "../lib/utils";
import InstagramIcon from "./icons/InstagramIcon";
import EtsyIcon from "./icons/EtsyIcon";
import EmailIcon from "./icons/EmailIcon";
import PhoneIcon from "./icons/PhoneIcon";

function SocialLinks({ className = "", compact = false }) {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/stickersbymarave",
      icon: InstagramIcon,
      color: "hover:text-pink-500",
    },
    {
      name: "Email",
      href: "mailto:stickersbymarave@gmail.com",
      icon: EmailIcon,
      color: "hover:text-blue-600",
    },
    {
      name: "Phone",
      href: "tel:587-936-2253",
      icon: PhoneIcon,
      color: "hover:text-green-600",
    },
    {
      name: "Etsy",
      href: "https://etsy.com/shop/stickersbymarave",
      icon: EtsyIcon,
      color: "hover:text-orange-500",
      comingSoon: true,
    },
  ];

  // Filter out coming soon items in compact mode
  const displayLinks = compact
    ? socialLinks.filter((social) => !social.comingSoon)
    : socialLinks;

  return (
    <div
      className={cx("flex flex-wrap", compact ? "gap-3" : "gap-4", className)}
    >
      {displayLinks.map((social) => {
        const IconComponent = social.icon;

        if (social.comingSoon && !compact) {
          return (
            <div
              key={social.name}
              className={cx(
                "group relative flex items-center gap-2",
                "text-zinc-600 dark:text-zinc-400",
              )}
            >
              <IconComponent className={cx("h-6 w-6")} />
              <span className="text-sm">{social.name}</span>
              <span
                className={cx(
                  "rounded-full px-2 py-1 text-xs",
                  "bg-zinc-200 dark:bg-zinc-700",
                )}
              >
                Coming Soon
              </span>
            </div>
          );
        }

        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              "flex items-center transition-colors duration-200",
              "text-zinc-600 dark:text-zinc-400",
              social.color,
              compact ? "gap-0" : "gap-2",
            )}
            aria-label={`Follow on ${social.name}`}
          >
            <IconComponent className={cx(compact ? "h-5 w-5" : "h-6 w-6")} />
            {!compact && <span className="text-sm">{social.name}</span>}
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
