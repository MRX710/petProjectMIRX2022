import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from "shared/ui/Card/Card";
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { IArticleView } from "../../model/types/article";
import cls from './ArticleListItem.module.scss';

interface IArticleListItemSkeletonProps {
   className?: string
   view: IArticleView
}

export const ArticleListItemSkeleton = memo((props: IArticleListItemSkeletonProps) => {
    const {
        className,
        view,
    } = props;


    if (view === IArticleView.LIST) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.ArticleListItem__header}>
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton width={150} height={16} className={cls.ArticleListItem__username} />
                        <Skeleton width={150} height={16} className={cls.ArticleListItem__date} />
                    </div>
                    <Skeleton width={250} height={24} className={cls.ArticleListItem__title} />
                    <Skeleton height={200} className={cls.ArticleListItem__image} />

                    <div className={cls.ArticleListItem__footer}>
                        <Skeleton width={200} height={36} />
                    </div>
                </Card>
            </div>
        );
    }


    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card>
                <div className={cls.ArticleListItem__imageWrapper}>
                    <Skeleton width={200} height={200} className={cls.ArticleListItem__image} />
                </div>
                <div className={cls.ArticleListItem__infoWrapper}>
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton
                    width={150}
                    height={16}
                    className={cls.ArticleListItem__title}
                />
            </Card>
        </div>
    );
});

