import React, {FC} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import {Theme, useTheme} from "app/providers/ThemeProvider";
import LightIcon from 'shared/assets/icons/themeLight.svg'
import DarkIcon from 'shared/assets/icons/themeDark.svg'
import {Button, ThemeButton} from "widgets/Button/Button";

interface ThemeSwitcherProps {
   className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
   const {className, children, ...otherProps} = props;
   const {theme, toggleTheme} = useTheme();

   return (
          <Button
               theme={[ThemeButton.CLEAR]}
               className={classNames(cls.ThemeSwitcher, {}, [className])}
               onClick={toggleTheme}>
             {
                theme === Theme.DARK ?
                <DarkIcon/> : <LightIcon/>
             }
          </Button>
   );
};

