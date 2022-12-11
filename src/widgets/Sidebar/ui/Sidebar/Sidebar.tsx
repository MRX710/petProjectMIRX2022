import React, {FC, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import {ThemeSwitcher} from "widgets/ThemeSwitcher";
import {LangSwitcher} from 'widgets/LangSwitcher/LangSwitcher';

interface SidebarProps {
   className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
   const {className, children, ...otherProps} = props;

   const [collapsed, setCollapsed] = useState<boolean>(false)
   const onToggle = () => {
      setCollapsed(prevValue => !prevValue)
   }

   return (
       <div className={
          classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])
       }>
          <button onClick={onToggle}>toggle</button>
          <div className={cls.switchers}>
             <ThemeSwitcher/>
             <LangSwitcher className={cls.langSwitcher}/>
          </div>
       </div>
   );
};

