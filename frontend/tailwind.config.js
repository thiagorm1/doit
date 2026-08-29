/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FF5252",
        "secondary": "#FFB74D",
        "background": "#121212",
        "surface": "#121212",
        "surface-container": "#1E1E1E",
        "surface-container-high": "#272727",
        "surface-container-highest": "#272727",
        "surface-container-low": "#121212",
        "outline": "#333333",
        "outline-variant": "rgba(255, 255, 255, 0.05)",
        "on-surface": "#FFFFFF",
        "on-surface-variant": "#B3B3B3",
        "error": "#ffb4ab",
        "on-error": "#690005",
        "tertiary": "#FF5252",
        "on-secondary": "#121212",
        "secondary-fixed": "#FFC77D",
        "primary-container": "#FF5252",
        "on-primary-container": "#121212",
        "on-primary": "#121212",
        "primary-fixed": "#FF8A8A",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "16px",
        "xs": "4px",
        "md": "16px",
        "unit": "4px",
        "margin-desktop": "32px",
        "lg": "24px",
        "gutter": "24px",
        "sm": "8px",
        "xl": "40px",
        "container-max": "1440px"
      },
      fontFamily: {
        "headline-md": ["Hanken Grotesk", "sans-serif"],
        "display-lg": ["Hanken Grotesk", "sans-serif"],
        "headline-xl-mobile": ["Hanken Grotesk", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-xl": ["Hanken Grotesk", "sans-serif"],
        "body-sm": ["Plus Jakarta Sans", "sans-serif"],
        "label-caps": ["Hanken Grotesk", "sans-serif"]
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-xl-mobile": ["28px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-xl": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "700" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}
