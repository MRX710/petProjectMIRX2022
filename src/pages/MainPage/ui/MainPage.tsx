import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import { Page } from "widgets/Page/Page";

const MainPage = () => {
    const { t } = useTranslation();

    const [value, setValue] = useState<string | null>(null);

    const onChange = (val: string | null) => {
        setValue(val);
    };

    return (
        <Page>
            {t('Главная страница')}
            <Input onChange={onChange} value={value} placeholder="Введите текст" />
            <Text />
        </Page>
    );
};

export default MainPage;
