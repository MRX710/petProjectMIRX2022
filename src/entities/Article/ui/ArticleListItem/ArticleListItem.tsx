import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIsOpenedIcon from 'shared/assets/icons/eyeIsOpened.svg';
import { Card } from "shared/ui/Card/Card";
import { useHover } from "shared/lib/hooks/useHover/useHover";
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import {
    ArticleBlockEnum, IArticle, IArticleTextBlock, IArticleView, 
} from "../../model/types/article";
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface IArticleListItemProps {
   className?: string
   article: IArticle
   view: IArticleView
}

export const ArticleListItem = memo((props: IArticleListItemProps) => {
    const {
        className,
        article,
        view,
    } = props;

    const { t } = useTranslation();
    const [isHover, bindHover] = useHover();
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        navigate(RoutePath.article_details + article?.id);
    }, [article, navigate]);

    const componentArticleAvatar = (
        <img
            alt={article?.title}
            src={article?.img}
            className={cls.ArticleListItem__image}
        />
    );

    const componentArticleTypes = (
        <Text
            text={article?.type.join(', ')}
            className={cls.ArticleListItem__types}
        />
    );
    const componentArticleViews = (
        <>
            <Text
                text={String(article?.views)}
                className={cls.ArticleListItem__views}
            />
            <Icon Svg={EyeIsOpenedIcon} />
        </>
    );

    if (view === IArticleView.LIST) {
        const textBlock = article?.blocks?.find((block) => block?.type === ArticleBlockEnum.TEXT) as IArticleTextBlock;

        return (
            <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.ArticleListItem__header}>
                        <Avatar width={30} height={30} src={article?.user?.avatar} />
                        <Text
                            text={article?.user?.username}
                            className={cls.ArticleListItem__username}
                        />
                        <Text
                            text={article?.createAt}
                            className={cls.ArticleListItem__date}
                        />
                    </div>
                    <Text
                        text={article?.title}
                        className={cls.ArticleListItem__title}
                    />
                    {componentArticleTypes}
                    {componentArticleAvatar}
                    {!!textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.ArticleListItem__textBlock}
                        />
                    )}

                    <div className={cls.ArticleListItem__footer}>
                        <Button onClick={onOpenArticle}>
                            {t('Читать далее')} ...
                        </Button>
                        <div className={cls.ArticleListItem__row}>
                            {componentArticleViews}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }


    return (
        <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card onClick={onOpenArticle}>
                <div className={cls.ArticleListItem__imageWrapper}>
                    {componentArticleAvatar}
                    <Text
                        text={article?.createAt}
                        className={cls.ArticleListItem__date}
                    />
                </div>
                <div className={cls.ArticleListItem__infoWrapper}>
                    {componentArticleTypes}
                    {componentArticleViews}
                </div>
                <Text
                    text={article?.title}
                    className={cls.ArticleListItem__title}
                />
            </Card>
        </div>
    );
});

