import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from "shared/ui/Select/Select";
// eslint-disable-next-line mirx-eslint-plugin/path-checker
import { Country } from "entities/Country";

interface ICountrySelectProps {
   className?: string
   value?: Country
   onChange?: (value: Country) => void
   readonly?: boolean
}

const CountryOptions = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];


export const CountrySelect = memo((props: ICountrySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;

    const { t } = useTranslation();
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Страна')}
            options={CountryOptions}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});

