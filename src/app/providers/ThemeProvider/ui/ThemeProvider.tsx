import React, {
    FC, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface IThemeProviderProps {
   initialTheme?: Theme,
   children: ReactNode
}

const ThemeProvider: FC<IThemeProviderProps> = (props) => {
    const {
        initialTheme,
        children,
    } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    const { setDefaultTheme, appendBodyClassnameTheme } = useTheme();
    useEffect(() => {
        const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        if (savedTheme) {
            appendBodyClassnameTheme(savedTheme as Theme);
        }
        else {
            setDefaultTheme();
        }
    }, [setDefaultTheme, appendBodyClassnameTheme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
