import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, KeyboardEvent, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export type onChangeInputFuncType = (value: string | null, emptyString: boolean) => any | void

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string | number | null;
   onChange?: onChangeInputFuncType;
   autofocus?: boolean;
   readOnly?: boolean
   onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
   onRequest?: () => void
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readOnly,
        onRequest,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }

        return () => setIsFocused(false);
    }, [autofocus]);


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const resultOfOperation = onChange?.(e.target.value !== '' ? e.target.value : null, e.target.value.length <= 0);
        if (resultOfOperation instanceof Error) {
            console.log('Error');
        }
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const onKeyDown = useCallback((e) => {
        if (e.keyCode === 13) {
            onRequest?.();
        }
    }, [onRequest]);

    const inputMods: Mods = {
        [cls.readOnly]: readOnly,
    };

    const caretMods: Mods = {
        [cls.readOnlyCaret]: readOnly,
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value ? String(value) : ''}
                    onChange={onChangeHandler}
                    className={classNames(cls.input, inputMods, [])}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readOnly}
                    onKeyDown={onKeyDown}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={classNames(cls.caret, caretMods, [])}
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    );
});
