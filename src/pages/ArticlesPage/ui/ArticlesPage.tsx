import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, IArticle, IArticleView } from "entities/Article";

interface IArticlesPageProps {
   className?: string
}

const ArticlesPage: FC<IArticlesPageProps> = (props) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames('', {}, [className])}>
            <ArticleList
                view={IArticleView.LIST}
                isLoading={false}
                articles={[]}
            />
        </div>
    );
};

export default memo(ArticlesPage);
