import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface BugButtonProps {
   className?: string
}

// компонент для тестирования
export const BugButton: FC<BugButtonProps> = (props) => {
    const { className, children, ...otherProps } = props;
    const { t } = useTranslation();

    const [error, setError] = useState<boolean>(false);
    const throwError = () => setError(true);

    useEffect(() => {
        if (error) throw new Error();
    }, [error]);

    return (
        <Button onClick={throwError} className={classNames('', {}, [className])}>
            {t('Выбросить ошибку')}
        </Button>
    );
};
