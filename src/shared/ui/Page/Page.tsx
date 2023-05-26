import {
    FC, MutableRefObject, ReactNode, useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { Button } from 'shared/ui/Button/Button';
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

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
            {children}
            <div ref={triggerRef} />
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

