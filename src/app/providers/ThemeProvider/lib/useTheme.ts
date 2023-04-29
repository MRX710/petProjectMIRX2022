import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
   toggleTheme: () => void;
   theme: Theme;
   setDefaultTheme: () => void
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const setDefaultTheme = () => {
        const defaultTheme = Theme.LIGHT;
        setTheme?.(defaultTheme);
        document.body.className = defaultTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, defaultTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme,
        toggleTheme,
        setDefaultTheme,
    };
}
