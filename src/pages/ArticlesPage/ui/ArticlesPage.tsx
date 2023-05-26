import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, IArticleView } from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { ToggleViewOfList } from 'features/toggleViewOfList';
import { Page } from "shared/ui/Page/Page";
import { fetchNextArticlesList } from "pages/ArticlesPage/model/services/fetchNextArticlesList/fetchNextArticlesList";
import { fetchArticlesList } from "../model/services/fetchArticlesList/fetchArticlesList";
import {
    getArticlesError, getArticlesHasMore,
    getArticlesLoading,
    getArticlesPageNum,
    getArticlesView,
} from "../model/selectors/getArticlesPageState";
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';

interface IArticlesPageProps {
   className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<IArticlesPageProps> = (props) => {
    const { className } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesLoading);
    const error = useSelector(getArticlesError);
    const view = useSelector(getArticlesView);
    const page = useSelector(getArticlesPageNum);
    const hasMore = useSelector(getArticlesHasMore);

    useInitialEffect(() => {
        dispatch(articlesPageActions.initView());
        dispatch(articlesPageActions.initPagination());
        dispatch(fetchArticlesList({
            page: 1,
        }));
    });

    const onChangeView = useCallback((view: IArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesList());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames('', {}, [className])}
                onScrollEnd={onLoadNextPart}
            >
                <ToggleViewOfList
                    view={view}
                    onViewClick={onChangeView}
                />
                <ArticleList
                    view={view}
                    isLoading={isLoading}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
