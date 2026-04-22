/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green:        '#006e2f',
          'green-mid':  '#008a3c',
          'green-light':'#e6f4ec',
          'green-glow': '#d1fae5',
          bg:           '#f5f7f2',
          text:         '#0f1f14',
          muted:        '#6b7280',
          subtle:       '#9ca3af',
          amber:        '#d97706',
          'amber-bg':   '#fef3c7',
          'amber-text': '#92400e',
          red:          '#ba1a1a',
          border:       '#e5e7eb',
          'border-green':'#a7f3d0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'stat': ['3rem', { lineHeight: '1', fontWeight: '800' }],
      },
      boxShadow: {
        'level-1': '0 1px 4px rgba(0,0,0,0.07)',
        'level-2': '0 4px 16px rgba(0,0,0,0.10)',
        'level-3': '0 8px 32px rgba(0,110,47,0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
