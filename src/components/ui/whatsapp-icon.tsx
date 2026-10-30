import React from "react";

interface WhatsAppIconProps {
  className?: string;
  fill?: string;
  bubbleColor?: string;
  phoneColor?: string;
}

/**
 * Official WhatsApp Brand Vector Icon
 * Authentic silhouette with speech bubble pointer and telephone handset.
 * Can be rendered as single-color silhouette (fillRule="evenodd") or two-tone luxury.
 */
export function WhatsAppIcon({
  className = "w-4 h-4",
  fill = "currentColor",
  bubbleColor,
  phoneColor,
}: WhatsAppIconProps) {
  // If specific two-tone colors are requested (e.g. bubble in deep green and phone in white/gold)
  if (bubbleColor && phoneColor) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        {/* Official Speech Bubble Silhouette with Notch at bottom-left */}
        <path
          d="M12.04 2C6.5 2 2 6.5 2 12.04c0 1.76.46 3.48 1.33 5l-1.42 5.19 5.31-1.39a10.02 10.02 0 004.82 1.24h.01c5.54 0 10.04-4.5 10.04-10.04C22.09 6.5 17.58 2 12.04 2z"
          fill={bubbleColor}
        />
        {/* Telephone Handset Vector */}
        <path
          d="M17.83 16.36c-.24.68-1.4 1.3-1.93 1.38-.51.08-1.18.11-1.9-.12a14.1 14.1 0 01-1.7-.63c-2.99-1.31-4.95-4.35-5.1-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.47 1.06-2.19 1.33-2.49.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.09.93 2.24.08.15.12.33.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.31.31-.13.61.18.3.77 1.28 1.66 2.07 1.14 1.01 2.1 1.33 2.4 1.48.3.15.47.12.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.74.82 2.04 1.02.3.2.5.3.57.43.08.12.08.72-.16 1.4z"
          fill={phoneColor}
        />
      </svg>
    );
  }

  // Official single-path silhouette (Speech Bubble with Handset cutout hole)
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2C6.5 2 2 6.5 2 12.04c0 1.76.46 3.48 1.33 5l-1.42 5.19 5.31-1.39a10.02 10.02 0 004.82 1.24h.01c5.54 0 10.04-4.5 10.04-10.04C22.09 6.5 17.58 2 12.04 2zm5.79 14.36c-.24.68-1.4 1.3-1.93 1.38-.51.08-1.18.11-1.9-.12a14.1 14.1 0 01-1.7-.63c-2.99-1.31-4.95-4.35-5.1-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.47 1.06-2.19 1.33-2.49.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.09.93 2.24.08.15.12.33.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.31.31-.13.61.18.3.77 1.28 1.66 2.07 1.14 1.01 2.1 1.33 2.4 1.48.3.15.47.12.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.74.82 2.04 1.02.3.2.5.3.57.43.08.12.08.72-.16 1.4z"
      />
    </svg>
  );
}
