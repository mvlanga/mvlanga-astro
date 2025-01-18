const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Averta', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                base: '1.1rem',
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                    '2xl': '6rem',
                },
            },
            colors: {
                black: {
                    DEFAULT: '#080808',
                },
                purple: {
                    DEFAULT: '#8860FF',
                    500: '#8860FF',
                    600: '#4b29af',
                },
            },
            animation: {
                'spin': 'spin 10s linear infinite',
            }
        },
    },
    plugins: [],
}