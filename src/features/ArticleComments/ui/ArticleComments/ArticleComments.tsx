import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import cls from "pages/ArticleDetailPage/ui/ArticleDetailPage.module.scss";
import { Text } from "shared/ui/Text/Text";
import { CommentForm } from 'entities/CommentForm';
import { useSelector } from "react-redux";
import { CommentList } from 'entities/Comment';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from "../../model/selectors/ArticleCommentListSelectors/ArticleCommentListSelectors";
import {
    getArticleCommentFormError,
    getArticleCommentFormText,
} from "../../model/selectors/ArticleCommentFormSelectors/ArticleCommentFormSelectors";
import { ArticleCommentFormActions, ArticleCommentFormReducer } from '../../model/slices/ArticleCommentFormSlice';
import { ArticleCommentsListReducer, getArticleCommentsList } from '../../model/slices/ArticleCommentsListSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

export interface IArticleCommentsProps {
    id: string
}

const reducers: ReducersList = {
    ArticleCommentsList: ArticleCommentsListReducer,
    ArticleCommentForm: ArticleCommentFormReducer,
};

// эту компоненту можно использовать не как фичу, а вынести в дальнейшем в виджеты
const ArticleComments = memo((props: IArticleCommentsProps) => {
    const {
        id,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleCommentsList.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const commentsError = useSelector(getArticleCommentsError);

    const commentFormText = useSelector(getArticleCommentFormText);
    const commentFormError = useSelector(getArticleCommentFormError);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onCommentTextChange = useCallback((val: string | null) => {
        dispatch(ArticleCommentFormActions.setText(val));
    }, [dispatch]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
        dispatch(ArticleCommentFormActions.setText(''));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Text
                className={cls.commentTitle}
                title={t('Комментарии')}
            />
            <CommentForm
                onSendComment={onSendComment}
                onCommentTextChange={onCommentTextChange}
                text={commentFormText}
                error={commentFormError}
            />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </DynamicModuleLoader>
    );
});

export default ArticleComments;
