import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ISelectOption, Select } from "shared/ui/Select/Select";
import { SortOrder } from "shared/types/baseFilters";
import { IArticleSortField } from "../../model/types/articlesSort";
import cls from './ArticlesSortSelector.module.scss';

interface IArticlesSortSelectorProps {
   className?: string
   order: SortOrder
   sort: IArticleSortField
   onChangeOrder: (newOrder: SortOrder) => void
   onChangeSort: (newSort: IArticleSortField) => void
}

export const ArticlesSortSelector = memo((props: IArticlesSortSelectorProps) => {
    const {
        className,
        order,
        onChangeOrder,
        sort,
        onChangeSort,
    } = props;

    const { t } = useTranslation();

    const sortFieldOptions = useMemo<ISelectOption<IArticleSortField>[]>(() => [
        {
            value: IArticleSortField.CREATED,
            content: t('дате создания'),
        },
        {
            value: IArticleSortField.TITLE,
            content: t('названию'),
        },
        {
            value: IArticleSortField.VIEWS,
            content: t('просмотрам'),
        },
    ], [t]);

    const orderOptions = useMemo<ISelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    return (
        <div className={classNames(cls.ArticlesSortSelector, {}, [className])}>
            <Select
              <IArticleSortField>
                value={sort}
                onChange={onChangeSort}
                options={sortFieldOptions}
                label={t('Сортировать ПО ')}
            />
            <Select
              <SortOrder>
                className={cls.order}
                value={order}
                onChange={onChangeOrder}
                options={orderOptions}
                label={t('по ')}
            />
        </div>
    );
});

