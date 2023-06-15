import {
    MutableRefObject, useCallback, useEffect, useRef,
} from "react";

export function useCallbackInTimeout(delay: number) {
    const timeoutRef: MutableRefObject<any> | null = useRef(null);

    useEffect(() => {
        console.log('timeout');
        const timer = timeoutRef!.current;
        return () => {
            if (timer) {
                clearTimeout(timer);
                console.log('clear timeout');
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeoutRef!.current]);

    return useCallback((callback: Function) => {
        timeoutRef.current = setTimeout(() => {
            callback?.();
        }, delay);
    }, [timeoutRef, delay]);
}
