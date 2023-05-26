import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import { Page } from "widgets/Page/Page";
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
   className?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
    const { className, children, ...otherProps } = props;

    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </Page>
    );
};
