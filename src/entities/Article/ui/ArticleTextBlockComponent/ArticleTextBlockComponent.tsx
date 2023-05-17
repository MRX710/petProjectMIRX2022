import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from "shared/ui/Text/Text";
import { checkArrayToMap } from "shared/lib/checkout/checkout";
import { IArticleTextBlock } from "../../model/types/article";
import cls from './ArticleTextBlockComponent.module.scss';

interface IArticleTextBlockComponentProps {
   className?: string
   block: IArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props: IArticleTextBlockComponentProps) => {
    const {
        className,
        block,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames('', {}, [className])}>
            {
                block?.title
                    ? <Text title={block?.title} className={cls.title} /> : null
            }
            {
                block?.paragraphs && checkArrayToMap(block?.paragraphs)
                    ? block?.paragraphs?.map((paragraph) => (
                        <Text
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    )) : null
            }
        </div>
    );
});

