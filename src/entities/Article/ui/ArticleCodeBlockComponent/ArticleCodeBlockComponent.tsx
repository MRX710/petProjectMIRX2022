import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Code } from "shared/ui/Code/Code";
import { IArticleCodeBlock } from "../../model/types/article";

interface IArticleCodeBlockComponentProps {
   className?: string
   block: IArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: IArticleCodeBlockComponentProps) => {
    const {
        className,
        block,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames('', {}, [className])}>
            <Code text={block?.code} />
        </div>
    );
});

