/** @type {import('tailwindcss').Config} */
// Design tokens ported from Google Stitch "Acoustic Precision Light" (src/ui-reference/acoustic_precision_light/DESIGN.md)
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e11d48',
        'primary-container': '#e11d48',
        'primary-fixed': '#ffe4e6',
        'primary-fixed-dim': '#fecdd3',
        'on-primary': '#ffffff',
        secondary: '#0284c7',
        'secondary-container': '#e0f2fe',
        'secondary-fixed': '#e0f2fe',
        'on-secondary-container': '#00476e',
        tertiary: '#4f46e5',
        'tertiary-container': '#6366f1',
        'tertiary-fixed': '#e0e7ff',
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
        'error-container': '#fee2e2',
        background: '#f8fafc',
        surface: '#ffffff',
        'surface-dim': '#f1f5f9',
        'surface-variant': '#f1f5f9',
        'surface-container': '#ffffff',
        'surface-container-low': '#f8fafc',
        'surface-container-high': '#edf2f7',
        'surface-container-highest': '#e2e8f0',
        'on-surface': '#0f172a',
        'on-surface-variant': '#475569',
        outline: '#cbd5e1',
        'outline-variant': '#e2e8f0'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        'display-hero': ['"Plus Jakarta Sans"'],
        'ipa-display': ['"JetBrains Mono"'],
        'ipa-inline': ['"JetBrains Mono"'],
        'label-mono': ['"JetBrains Mono"'],
        'telemetry-data': ['"JetBrains Mono"']
      },
      fontSize: {
        'display-hero': ['48px', { lineHeight: '56px', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-hero-mobile': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'headline-sm': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body-md': ['15px', { lineHeight: '24px' }],
        'body-sm': ['13px', { lineHeight: '20px' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: '600' }],
        'label-mono': ['11px', { lineHeight: '16px', letterSpacing: '0.06em', fontWeight: '600' }],
        'ipa-display': ['24px', { lineHeight: '32px', letterSpacing: '0.04em', fontWeight: '600' }],
        'ipa-inline': ['15px', { lineHeight: '20px', letterSpacing: '0.02em', fontWeight: '500' }],
        'telemetry-data': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }]
      },
      boxShadow: {
        card: '0 2px 8px rgba(15,23,42,0.03)',
        'card-md': '0 4px 16px rgba(15,23,42,0.04)',
        pop: '0 12px 32px rgba(15,23,42,0.12)'
      }
    }
  },
  plugins: []
};
