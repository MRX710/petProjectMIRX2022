import { CSSProperties, FC, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface IAvatarProps {
   className?: string
   src?: string
   width?: number | string
   height?: number | string
}

export const Avatar: FC<IAvatarProps> = (props) => {
    const {
        className,
        src,
        width = 100,
        height = 100,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width,
        height,
    }), [width, height]);

    return (
        <img
            className={classNames(cls.Avatar, {}, [className])}
            style={styles}
            src={src}
            alt="avatar"
        />
    );
};

