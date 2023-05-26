import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, IArticleView } from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { ToggleViewOfList } from 'features/toggleViewOfList';
import { Page } from "widgets/Page/Page";
import { fetchNextArticlesList } from "pages/ArticlesPage/model/services/fetchNextArticlesList/fetchNextArticlesList";
import { initArticlesPage } from "../model/services/initArticlesPage/initArticlesPage";
import { getArticlesLoading, getArticlesView } from "../model/selectors/getArticlesPageState";
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';

interface IArticlesPageProps {
   className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<IArticlesPageProps> = (props) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesLoading);
    const view = useSelector(getArticlesView);

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    });

    const onChangeView = useCallback((view: IArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesList());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeReducerAfterUnmount={false}>
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
                {

                }
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
