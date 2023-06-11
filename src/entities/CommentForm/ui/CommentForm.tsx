import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './CommentForm.module.scss';

export interface IAddCommentFormProps {
    className?: string
    text: string | null
    error?: string
    onCommentTextChange: (value: string | null) => void
    onSendComment: (text: string) => void
}

export const CommentForm = memo((props: IAddCommentFormProps) => {
    const {
        className,
        text,
        error,
        onCommentTextChange,
        onSendComment,
    } = props;

    const { t } = useTranslation();

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
    }, [onSendComment, text]);

    return (
        <div className={classNames(cls.CommentForm, {}, [className])}>
            <Input
                className={cls.CommentForm__input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
            />
            <Button
                onClick={onSendHandler}
            >
                {t('Отправить')}
            </Button>
        </div>
    );
});
