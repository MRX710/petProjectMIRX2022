import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailPage.module.scss';


const ArticleDetailPage = () => {
    const { t } = useTranslation('article');

    return (
        <div className={classNames(cls.ArticleDetailPage, {}, [])}>
            ArticleDetailPage
        </div>
    );
};
export default memo(ArticleDetailPage);
