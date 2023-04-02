import { FC } from 'react';
import './PageLoader.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';

interface PageLoaderProps {
   className?: string
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <div className={classNames('page-loader', {}, [className])}>
            <Loader />
        </div>
    );
};
