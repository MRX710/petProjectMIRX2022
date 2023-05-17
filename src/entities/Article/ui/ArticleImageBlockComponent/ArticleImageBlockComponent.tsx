import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from "shared/ui/Text/Text";
import { IArticleImageBlock } from "../../model/types/article";
import cls from './ArticleImageBlockComponent.module.scss';

interface IArticleImageBlockComponentProps {
   className?: string
   block: IArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: IArticleImageBlockComponentProps) => {
    const {
        className,
        block,
    } = props;

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img
                src={block?.src}
                className={cls.img}
                alt={block?.title}
            />
            {
                block?.title ? (
                    <Text
                        text={block?.title}
                        align={TextAlign.CENTER}
                    />
                ) : null
            }
        </div>
    );
});

