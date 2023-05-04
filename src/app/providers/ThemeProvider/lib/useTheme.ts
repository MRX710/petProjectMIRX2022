import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
   toggleTheme: () => void;
   theme: Theme;
   setDefaultTheme: () => void
   appendBodyClassnameTheme: (theme: Theme) => void
}

export function useTheme(): UseThemeResult {
    const {
        theme,
        setTheme,
    } = useContext(ThemeContext);

    const appendBodyClassnameTheme = (theme: Theme) => {
        document.body.className = theme;
    };

    const setDefaultTheme = () => {
        const defaultTheme = Theme.LIGHT;
        setTheme?.(defaultTheme);
        appendBodyClassnameTheme(defaultTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, defaultTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme?.(newTheme);
        appendBodyClassnameTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
        setDefaultTheme,
        appendBodyClassnameTheme,
    };
}
