import React, { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
   className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
    const { className } = props;

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const onToggle = () => {
        setCollapsed((prevValue) => !prevValue);
    };

    return (
        <div className={
            classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])
        }
        >
            <button type="button" onClick={onToggle}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.langSwitcher} />
            </div>
        </div>
    );
};
