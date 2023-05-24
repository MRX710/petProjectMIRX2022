import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from "entities/Article";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from "entities/Comment";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useSelector } from "react-redux";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AddCommentForm } from "features/addCommentForm";
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { fetchCommentsByArticleId } from "../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { addCommentForArticle } from "../model/services/addCommentForArticle/addCommentForArticle";
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from "../model/selectors/comments";
import cls from './ArticleDetailPage.module.scss';
import { ArticleDetailsCommentsReducer, getArticleComments } from "../model/slice/ArticleDetailsCommentsSlice";

const reducers: ReducersList = {
    articleDetailsComments: ArticleDetailsCommentsReducer,
};

const ArticleDetailPage = () => {
    const { t } = useTranslation('article');

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const commentsError = useSelector(getArticleDetailsCommentsError);
    const navigate = useNavigate();

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailPage, {}, [])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeReducerAfterUnmount
        >
            <div className={classNames('', {}, [])}>
                <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
                    {t('Назад к спиcку')}
                </Button>
                <ArticleDetails id={id} />
                <Text
                    className={cls.commentTitle}
                    title={t('Комментарии')}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};
export default memo(ArticleDetailPage);
