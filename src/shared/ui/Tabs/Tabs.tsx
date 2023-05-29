import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { checkArrayToMap } from 'shared/lib/checkout/checkout';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { typedMemo } from "shared/types/memo";
import cls from './Tabs.module.scss';

export interface ITabItem<T extends string> {
   value: T
   content: ReactNode
}

interface ITabsProps<T extends string> {
   className?: string
   tabs: ITabItem<T>[]
   value: string
   onTabClick: (tab: ITabItem<T>) => void
}

export const Tabs = typedMemo(<T extends string>(props: ITabsProps<T>) => {
    const {
        className,
        tabs,
        value,
        onTabClick,
    } = props;

    const { t } = useTranslation();

    const clickHandler = useCallback((tab: ITabItem<T>) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {
                tabs && checkArrayToMap(tabs)
                    ? tabs.map((tab) => (
                        <Card
                            theme={tab?.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                            className={cls.tab}
                            key={tab?.value}
                            onClick={clickHandler(tab)}
                        >
                            {tab?.content}
                        </Card>
                    )) : null
            }
        </div>
    );
});

