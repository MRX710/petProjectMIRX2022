import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ToggleViewOfList } from "features/toggleViewOfList";
import { IArticleView } from "entities/Article";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from "shared/types/baseFilters";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import { ITabItem, Tabs } from "shared/ui/Tabs/Tabs";
import { ArticleEnum } from "entities/Article/model/types/article";
import { IArticleSortField } from "../model/types/articlesSort";
import { ArticlesSortSelector } from "./ArticlesSortSelector/ArticlesSortSelector";
import { IArticlesSortScheme } from "../model/types/articlesSortScheme";
import {
    getArticlesFiltersOrder,
    getArticlesFiltersSearch,
    getArticlesFiltersSort, getArticlesFiltersType,
} from "../model/selectors/getArticlesSort";
import cls from './ArticlesSort.module.scss';
import { articlesSortActions } from '../model/slice/articlesSortSlice';

interface IArticlesSortProps {
   className?: string
   view: IArticleView
   onViewClick?: (view: IArticleView) => void
   onRequest?: (filter?: DeepPartial<IArticlesSortScheme>) => void
}

export const ArticlesSort = memo((props: IArticlesSortProps) => {
    const {
        className,
        view,
        onViewClick,
        onRequest,
    } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const order = useSelector(getArticlesFiltersOrder);
    const sort = useSelector(getArticlesFiltersSort);
    const search = useSelector(getArticlesFiltersSearch);
    const type = useSelector(getArticlesFiltersType);

    const fetchData = useCallback((filter?: DeepPartial<IArticlesSortScheme>) => {
        onRequest?.(filter);
    }, [onRequest]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: IArticleView) => {
        onViewClick?.(view);
        fetchData();
    }, [onViewClick, fetchData]);

    const setSearch = useCallback((value: string | null) => {
        dispatch(articlesSortActions.setSearch(value));
        debouncedFetchData({ search: value });
    }, [debouncedFetchData, dispatch]);

    const onChangeOrderHandler = useCallback((value: SortOrder) => {
        dispatch(articlesSortActions.setOrder(value));
        fetchData({ order: value });
    }, [dispatch, fetchData]);

    const onChangeSortHandler = useCallback((value: IArticleSortField) => {
        dispatch(articlesSortActions.setSort(value));
        fetchData({ sort: value });
    }, [dispatch, fetchData]);

    const typeTabs = useMemo<ITabItem<ArticleEnum>[]>(() => [
        {
            value: ArticleEnum.ALL,
            content: t('Все статьи'),
        },
        {
            value: ArticleEnum.IT,
            content: t('Айти'),
        },
        {
            value: ArticleEnum.ECONOMICS,
            content: t('Экономика'),
        },
        {
            value: ArticleEnum.SCIENCE,
            content: t('Наука'),
        },
    ], [t]);

    const onChangeType = useCallback((tab: ITabItem<ArticleEnum>) => {
        dispatch(articlesSortActions.setType(tab.value));
        fetchData({ type: tab?.value });
    }, [dispatch, fetchData]);

    return (
        <div className={classNames('', {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticlesSortSelector
                    order={order}
                    onChangeOrder={onChangeOrderHandler}
                    sort={sort}
                    onChangeSort={onChangeSortHandler}
                />
                <ToggleViewOfList
                    view={view}
                    onViewClick={onChangeView}
                />
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder={t('Поиск')}
                    value={search}
                    onChange={setSearch}
                    onRequest={fetchData}
                />
            </Card>
            <Tabs
                className={cls.tabs}
                tabs={typeTabs}
                value={type}
                onTabClick={onChangeType}
            />
        </div>
    );
});

