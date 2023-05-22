import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IComment } from "entities/Comment";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import cls from './CommentCard.module.scss';

interface ICommentCardProps {
   className?: string
   comment?: IComment
   isLoading?: boolean
}

export const CommentCard = memo((props: ICommentCardProps) => {
    const {
        className,
        comment,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className, cls.CommentCard__isLoading])}>
                <div className={cls.CommentCard__header}>
                    <Skeleton
                        width={30}
                        height={30}
                        border="50%"
                    />
                    <Skeleton
                        width={100}
                        height={16}
                        className={cls.CommentCard__username}
                    />
                </div>
                <Skeleton
                    width="100%"
                    height={50}
                    className={cls.CommentCard__text}
                />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink
                to={`${RoutePath.profile}${comment?.user?.id}`}
                className={cls.CommentCard__header}
            >
                {
                    comment?.user?.avatar
                        ? (
                            <Avatar
                                width={30}
                                height={30}
                                src={comment?.user?.avatar}
                            />
                        )
                        : null
                }
                <Text
                    className={cls.CommentCard__username}
                    title={comment?.user?.username}
                />
            </AppLink>
            <Text
                className={cls.CommentCard__text}
                text={comment?.text}
            />
        </div>
    );
});

