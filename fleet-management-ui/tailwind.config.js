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
                "primary": "#258cf4", // Transjakarta Blue-ish
                "secondary": "#ef4444", // Red accent for stops/alerts
                "background-light": "#f8fafc", // Very light slate
                "background-dark": "#0f172a", // Dark slate
                "card-light": "#ffffff",
                "card-dark": "#1e293b",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["Inter", "sans-serif"],
            },
            borderRadius: {
                "xl": "0.75rem",
            },
        },
    },
    plugins: [],
}
