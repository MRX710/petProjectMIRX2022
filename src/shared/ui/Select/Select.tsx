import {
    ChangeEvent, FC, memo, useMemo,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { checkArrayToMap } from "shared/lib/checkout/checkout";
import cls from './Select.module.scss';

interface ISelectOption {
   value: string
   content: string
}

interface ISelectProps {
   className?: string
   label?: string
   options?: ISelectOption[]
   value?: string
   onChange?: (value: string) => void
   readonly?: boolean
}

export const Select = memo((props: ISelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly,
    } = props;

    const optionsList = useMemo(() => {
        if (checkArrayToMap(options)) {
            return (options?.map((item) => (
                <option
                    className={cls.Select__option}
                    value={item?.value}
                    key={item?.value}
                >
                    {item?.content ?? ''}
                </option>
            )));
        }
        return [];
    }, [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.Select__readonly]: readonly,
    };

    return (
        <div className={classNames(cls.Select__wrapper, {}, [className])}>
            {
                label
                    ? (
                        <span className={cls.Select__label}>
                            {`${label}>`}
                        </span>
                    )
                    : null
            }
            <select
                className={classNames(cls.Select, mods, [])}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {
                    optionsList
                }
            </select>
        </div>
    );
});

