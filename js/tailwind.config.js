// Safe Tailwind CSS Play CDN Configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    green: '#5C9E31',
                    'green-dark': '#477A25',
                    'green-light': '#E6F2DE',
                    'green-glow': 'rgba(92, 158, 49, 0.25)',
                    orange: '#E88923',
                    'orange-hover': '#D47614',
                    'orange-glow': 'rgba(232, 137, 35, 0.25)',
                    dark: '#1A1A1A',
                },
                paper: {
                    50: '#FAFBF6',
                    100: '#F2F4EB',
                    200: '#E4E8D7',
                },
                ink: {
                    900: '#1A1A1A',
                    700: '#3D4035',
                    500: '#66695C',
                    400: '#949887',
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                brand: ['"Montserrat"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(26, 26, 26, 0.06)',
                'glass-hover': '0 12px 40px 0 rgba(132, 154, 70, 0.15)',
                'glow-orange': '0 6px 20px 0 rgba(232, 137, 35, 0.35)',
                'glow-green': '0 6px 20px 0 rgba(132, 154, 70, 0.35)',
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        }
    }
};
