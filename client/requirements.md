## Packages
zustand | Global state management for cart, locale, and theme
recharts | Analytics charts for dashboards
framer-motion | Smooth page transitions and animations
react-i18next | Localization handling
i18next | Localization core
clsx | Utility for conditional class names (usually installed, but ensuring)
tailwind-merge | Utility for merging tailwind classes (usually installed, but ensuring)

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  sans: ["Cairo", "var(--font-sans)"], // Arabic friendly font
  display: ["Cairo", "var(--font-display)"],
}
RTL support is required. The 'dir' attribute on HTML tag will be toggled.
Mock data will be used in place of backend calls.
Primary color is Teal (#00BFA5).
