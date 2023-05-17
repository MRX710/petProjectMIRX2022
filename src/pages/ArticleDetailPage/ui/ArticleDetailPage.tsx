import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import cls from './ArticleDetailPage.module.scss';


const ArticleDetailPage = () => {
    const { t } = useTranslation('article');

    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailPage, {}, [])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailPage, {}, [])}>
            <ArticleDetails id={id} />
        </div>
    );
};
export default memo(ArticleDetailPage);
