import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IComment } from "entities/Comment";
import { checkArrayToMap } from 'shared/lib/checkout/checkout';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";
import cls from './CommentList.module.scss';

interface ICommentListProps {
   className?: string
   comments?: IComment[]
   isLoading?: boolean
}

export const CommentList = memo((props: ICommentListProps) => {
    const {
        className,
        isLoading,
        comments,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {
                comments && checkArrayToMap(comments)
                    ? comments.map((comment) => (
                        <CommentCard
                            className={cls.CommentList__comment}
                            key={comment?.id}
                            comment={comment}
                            isLoading={isLoading}
                        />
                    ))
                    : <Text text={t('Комментарии отсутствуют')} />
            }
        </div>
    );
});
