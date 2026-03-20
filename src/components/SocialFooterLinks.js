import React from "react"
import { buildTrackedSocialUrl } from "../utils/socialProfiles"

const iconClassName = "h-5 w-5"

const socialPlatforms = [
  {
    key: "google",
    label: "Google Business Profile",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={iconClassName}
      >
        <path
          d="M20.5 12.23c0-.7-.06-1.21-.19-1.74H12v3.19h4.88c-.1.79-.64 1.99-1.84 2.79l-.02.11 2.55 1.94.18.02c1.65-1.49 2.75-3.69 2.75-6.31Z"
          fill="currentColor"
        />
        <path
          d="M12 20.75c2.39 0 4.4-.77 5.87-2.09l-2.8-2.07c-.75.51-1.76.87-3.07.87-2.34 0-4.33-1.49-5.04-3.56l-.11.01-2.65 2.01-.04.1A8.86 8.86 0 0 0 12 20.75Z"
          fill="currentColor"
        />
        <path
          d="M6.96 13.9A5.33 5.33 0 0 1 6.66 12c0-.66.11-1.29.29-1.9l-.01-.13-2.69-2.04-.09.04A8.53 8.53 0 0 0 3.25 12c0 1.44.35 2.8.96 4l2.75-2.1Z"
          fill="currentColor"
        />
        <path
          d="M12 6.54c1.65 0 2.76.69 3.39 1.26l2.47-2.34C16.38 4.12 14.39 3.25 12 3.25A8.86 8.86 0 0 0 4.16 7.98l2.79 2.13c.72-2.07 2.71-3.57 5.05-3.57Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={iconClassName}
      >
        <path d="M13.36 21v-7.3h2.45l.37-2.85h-2.82V9.04c0-.83.23-1.39 1.43-1.39H16.3V5.1c-.26-.03-1.14-.1-2.16-.1-2.14 0-3.61 1.31-3.61 3.71v2.14H8.1v2.85h2.43V21h2.83Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={iconClassName}
      >
        <rect
          x="3.25"
          y="3.25"
          width="17.5"
          height="17.5"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4.1"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={iconClassName}
      >
        <path d="M6.94 8.5A1.72 1.72 0 1 1 6.93 5a1.72 1.72 0 0 1 .01 3.5ZM5.5 9.86h2.87V19H5.5V9.86Zm4.67 0h2.75v1.25h.04c.38-.72 1.32-1.48 2.72-1.48 2.9 0 3.44 1.91 3.44 4.39V19h-2.87v-4.42c0-1.06-.02-2.41-1.47-2.41-1.48 0-1.7 1.15-1.7 2.33V19h-2.91V9.86Z" />
      </svg>
    ),
  },
]

export default function SocialFooterLinks() {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-3">
        {socialPlatforms.map(platform => (
          <a
            key={platform.key}
            href={buildTrackedSocialUrl(platform.key)}
            target="_blank"
            rel="noreferrer nofollow"
            aria-label={`Visit Zen Car Buying on ${platform.label}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors duration-200 hover:bg-white/10 hover:border-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
          >
            {platform.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
