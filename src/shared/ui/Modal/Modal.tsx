import React, {
    FC, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
   className?: string
   children?: ReactNode
   isOpen?: boolean
   onClose?: () => void
   lazy?: boolean
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
    const {
        className,
        isOpen,
        onClose,
        lazy,

        children,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
         timeRef!.current = setTimeout(() => {
             onClose();
             setIsClosing(false);
         }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // при каждом перерендере создается новая функция поэтому используем useCallback
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);


    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        if (isOpen) {
         timeRef!.current = setTimeout(() => {
             setIsOpening(true);
         }, 0);
         window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            setIsOpening(false);
            if (timeRef!.current) clearTimeout(timeRef!.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);


    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Mods = {
        [cls.opened]: isOpening,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div aria-hidden="true" className={cls.overlay} onClick={closeHandler}>
                    <div aria-hidden="true" className={cls.content} onClick={onContentClick}>
                        {children || null}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
