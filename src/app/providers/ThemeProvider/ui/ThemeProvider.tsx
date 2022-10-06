import React, {useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from '../lib/ThemeContext';
import {IChildren} from "types/mainPropsTypes";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface IThemeProvider extends IChildren{

}

const ThemeProvider: React.FC<IThemeProvider> = ({children}) => {

   const [theme, setTheme] = useState<Theme>(defaultTheme)

   const defaultProps = useMemo(() => ({
      theme: theme,
      setTheme: setTheme
   }), [theme])

   return (
       <ThemeContext.Provider
         value={defaultProps}
       >
          {children}
       </ThemeContext.Provider>
   );
};

export default ThemeProvider;