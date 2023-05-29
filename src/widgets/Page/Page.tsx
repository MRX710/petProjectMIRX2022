import {
    FC, MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getScrollRestoreByPath, scrollRestoreActions } from "features/scrollRestore";
import { useLocation } from "react-router-dom";
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateScheme } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";
import cls from './Page.module.scss';

interface IPageProps {
   className?: string
   children: ReactNode
   onScrollEnd?: () => void
}

export const Page: FC<IPageProps> = (props) => {
    const {
        className,
        children,
        onScrollEnd,
    } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateScheme) => getScrollRestoreByPath(state, pathname));

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
      wrapperRef!.current!.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollRestoreActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 2000);

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
            {
                !!onScrollEnd && wrapperRef?.current && wrapperRef?.current?.scrollHeight <= wrapperRef?.current?.clientHeight
                    ? (
                        <div style={{ width: '100%', display: "flex", justifyContent: "flex-start" }}>
                            <Button onClick={onScrollEnd}>
                                Показать ещё
                            </Button>
                        </div>
                    ) : null
            }
        </section>
    );
};

