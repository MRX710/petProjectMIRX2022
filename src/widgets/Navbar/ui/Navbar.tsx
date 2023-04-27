import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import React, { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const onToggleModal = useCallback(() => {
        setIsAuthModal((prevState) => !prevState);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>

            <Modal
                isOpen={isAuthModal}
                onClose={onToggleModal}
            >
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {/* eslint-disable-next-line i18next/no-literal-string */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.
                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.
                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.
                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.
            </Modal>
        </div>
    );
};
