export type ThemeMode = 'user' | 'light' | 'dark'

// 'user'  → users can toggle between light and dark (toggle button shown)
// 'light' → locked to light mode, toggle hidden
// 'dark'  → locked to dark mode, toggle hidden
export const THEME_MODE: ThemeMode = 'light'
