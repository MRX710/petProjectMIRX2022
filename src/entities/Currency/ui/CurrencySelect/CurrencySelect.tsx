import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from "shared/ui/Select/Select";
import { Currency } from "../../model/consts/currency";

interface ICurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
    readonly?: boolean
}

const CurrencyOptions = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
];


export const CurrencySelect = memo((props: ICurrencySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;

    const { t } = useTranslation();
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Валюта')}
            options={CurrencyOptions}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});

