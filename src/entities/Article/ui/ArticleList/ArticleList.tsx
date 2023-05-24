import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { checkArrayToMap } from 'shared/lib/checkout/checkout';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { IArticle, IArticleView } from "../../model/types/article";
import cls from './ArticleList.module.scss';

interface IArticleListProps {
   className?: string
   articles: IArticle[]
   isLoading?: boolean
   view?: IArticleView
}

const getSkeletons = (view: IArticleView) => new Array(view === IArticleView.TILE ? 9 : 3).fill(0)
    .map((item, index) => (
        <ArticleListItemSkeleton className={cls.ArticleList__item} view={view} key={index} />
    ));

export const ArticleList = memo((props: IArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = IArticleView.TILE,
    } = props;

    const { t } = useTranslation();

    const renderArticle = (article: IArticle) => (
        <ArticleListItem
            article={article}
            view={view}
            className={cls.ArticleList__item}
            key={article?.id}
        />
    );

    if (isLoading) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                {
                    getSkeletons(view)
                }
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {
                articles && checkArrayToMap(articles)
                    ? articles?.map(renderArticle) : null
            }
        </div>
    );
});

