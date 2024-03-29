import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { SidebarItemType } from "../../model/types/sidebar";
import cls from './SidebarItem.module.scss';

interface ISidebarItemProps {
   item: SidebarItemType
   collapsed: boolean
}

export const SidebarItem = memo((props: ISidebarItemProps) => {
    const {
        item,
        collapsed,
    } = props;

    const mods: Record<string, boolean> = {
        [cls.collapsed]: collapsed,
    };

    const { t } = useTranslation();


    const isAuth = useSelector(getUserAuthData);

    if (item?.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.SidebarItem, mods, [])}
        >
            <item.icon className={cls.icon} />
            <span className={cls.link}>
                {t(`${item?.text}`)}
            </span>
        </AppLink>
    );
});

