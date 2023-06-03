import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, IArticleView } from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import { articlesSortReducer, IArticlesSortScheme } from "features/articlesSort";
import { ArticlesSort } from "features/articlesSort/ui/ArticlesSort";
import { useSearchParams } from 'react-router-dom';
import { fetchArticlesList } from "../model/services/fetchArticlesList/fetchArticlesList";
import { fetchNextArticlesList } from "../model/services/fetchNextArticlesList/fetchNextArticlesList";
import { initArticlesPage } from "../model/services/initArticlesPage/initArticlesPage";
import { getArticlesLoading, getArticlesView } from "../model/selectors/getArticlesPageState";
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

interface IArticlesPageProps {
   className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
    articlesSort: articlesSortReducer,
};

const ArticlesPage: FC<IArticlesPageProps> = (props) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesLoading);
    const view = useSelector(getArticlesView);

    const [searchParams, setSearchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onChangeView = useCallback((view: IArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesList());
    }, [dispatch]);

    const onChangeFilters = useCallback((filter?: DeepPartial<IArticlesSortScheme>) => {
        articlesPageActions.setHasMore(true);
        dispatch(fetchArticlesList({
            page: 1,
            newPage: true,
            resetPreviousData: true,
            filterField: filter,
        }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeReducerAfterUnmount={false}>
            <Page
                className={classNames('', {}, [className])}
                onScrollEnd={onLoadNextPart}
            >
                <ArticlesSort
                    view={view}
                    onViewClick={onChangeView}
                    onRequest={onChangeFilters}
                />
                <ArticleList
                    view={view}
                    isLoading={isLoading}
                    articles={articles}
                    className={cls.list}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
