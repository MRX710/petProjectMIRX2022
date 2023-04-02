import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// @ts-ignore
import cls from './NotFoundPage.module.scss';
import { useTranslation } from "react-i18next";

interface NotFoundPageProps {
   className?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
   const {className, children, ...otherProps} = props;

   const {t} = useTranslation()

   return (
       <div className={classNames(cls.NotFoundPage, {}, [className])} >
          {t('Страница не найдена')}
       </div>
   );
};
