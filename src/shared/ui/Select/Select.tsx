import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { checkArrayToMap } from "shared/lib/checkout/checkout";
import { typedMemo } from "shared/types/memo";
import cls from './Select.module.scss';

export interface ISelectOption<T extends string> {
   value: T
   content: string
}

// T extends string сделано, чтобы при прокидывании пропсов снаружи, например onChange, не делать снаружи as type
interface ISelectProps<T extends string> {
   className?: string
   label?: string
   options?: ISelectOption<T>[]
   value?: T
   onChange?: (value: T) => void
   readonly?: boolean
}

export const Select = typedMemo(<T extends string>(props: ISelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly,
    } = props;

    const optionsList = useMemo(() => options?.map?.((item) => (
        <option
            className={cls.Select__option}
            value={item?.value}
            key={item?.value}
        >
            {item?.content ?? ''}
        </option>
    )), [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
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

