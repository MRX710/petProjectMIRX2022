import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from "entities/Article";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Page } from "widgets/Page/Page";
import { ArticleComments } from "features/ArticleComments";
import cls from './ArticleDetailPage.module.scss';


const ArticleDetailPage = () => {
    const { t } = useTranslation('article');

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailPage, {}, [])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <Page className={classNames('', {}, [])}>
            <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
                {t('Назад к спиcку')}
            </Button>
            <ArticleDetails id={id} />
            <ArticleComments id={id} />
        </Page>
    );
};
export default memo(ArticleDetailPage);
