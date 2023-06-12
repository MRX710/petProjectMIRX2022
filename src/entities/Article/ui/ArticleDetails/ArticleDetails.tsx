import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from "react-redux";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIsOpenedIcon from 'shared/assets/icons/eyeIsOpened.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import { Icon } from "shared/ui/Icon/Icon";
import { checkArrayToMap } from "shared/lib/checkout/checkout";
import { rtkApi } from "shared/api/rtkApi";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { ArticleBlockEnum, TArticleBlock } from "../../model/types/article";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

interface IArticleDetailsProps {
    className?: string
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

// const articleDetailsApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         fetchArticleById: build.query({
//             query: (id: string) => ({
//                 url: `/articles/${id}`,
//                 // params: {
//                 //     _limit: limit,
//                 // },
//             }),
//         }),
//     }),
// });


export const ArticleDetails = memo((props: IArticleDetailsProps) => {
    const {
        className,
        id,
    } = props;

    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (__PROJECT__ !== "storybook") {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: TArticleBlock) => {
        switch (block?.type) {
        case ArticleBlockEnum.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockEnum.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockEnum.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
        }
    }, []);

    let content;

    if (isLoading) {
        content = (
            <div>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width="clamp(669px, 60%, 60%)" height={31} />
                <Skeleton className={cls.skeleton} width="clamp(339px, 25%, 25%)" height={31} />
                <Skeleton className={cls.skeleton} width="clamp(1090px, 100%, 100%)" height={231} />
                <Skeleton className={cls.skeleton} width="clamp(1090px, 100%, 100%)" height={231} />
            </div>
        );
    }
    else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    }
    else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        width={200}
                        height={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </div>
                <Text
                    size={TextSize.L}
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                />
                <div className={cls.articleInfo}>
                    <Icon Svg={EyeIsOpenedIcon} className={cls.logo} />
                    <Text
                        text={String(article?.views)}
                    />
                </div>
                <div className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} className={cls.logo} />
                    <Text
                        text={article?.createAt}
                    />
                </div>
                {
                    article?.blocks && checkArrayToMap(article?.blocks)
                        ? article?.blocks?.map(renderBlock) : null
                }
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeReducerAfterUnmount>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});

