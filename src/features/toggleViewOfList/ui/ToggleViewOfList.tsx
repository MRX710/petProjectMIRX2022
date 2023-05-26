import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import TileIcon from 'shared/assets/icons/tile.svg';
import ListIcon from 'shared/assets/icons/list.svg';
import { IArticleView } from "entities/Article";
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ToggleViewOfList.module.scss';

interface IToggleViewOfListProps {
   className?: string
   view: IArticleView
   onViewClick?: (view: IArticleView) => void
}

const viewTypes = [
    {
        view: IArticleView.TILE,
        icon: TileIcon,
    },
    {
        view: IArticleView.LIST,
        icon: ListIcon,
    },
];

export const ToggleViewOfList = memo((props: IToggleViewOfListProps) => {
    const {
        className,
        view,
        onViewClick,
    } = props;

    const onClick = (newView: IArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames('', {}, [className])}>
            {
                viewTypes.map((viewType) => (
                    <Button
                        onClick={onClick(viewType.view)}
                        theme={ButtonTheme.CLEAR}
                    >
                        <Icon
                            Svg={viewType.icon}
                            className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                        />
                    </Button>
                ))
            }
        </div>
    );
});

