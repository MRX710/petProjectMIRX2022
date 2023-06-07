import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import { Page } from "widgets/Page/Page";
import { IListBoxItem, ListBox } from "shared/ui/ListBox/ListBox";
import { HStack, VStack } from 'shared/ui/Stack';

const MainPage = () => {
    const { t } = useTranslation();

    const [value, setValue] = useState<string | null>(null);

    const onChange = (val: string | null) => {
        setValue(val);
    };


    const people = [
        { value: 1, content: 'Durw', unavailable: false },
        { value: 2, content: 'Kent', unavailable: false },
        { value: 3, content: 'There', unavailable: false },
        { value: 4, content: 'BKess', unavailable: true },
        { value: 5, content: 'K', unavailable: false },
    ];

    const [selectedItem, setSelectedItem] = useState();
    const onChangeListBox = useCallback((val) => {
        setSelectedItem(val);
    }, []);

    return (
        <Page>
            {t('Главная страница')}
            <Input onChange={onChange} value={value} placeholder="Введите текст" />
            <Text />
            {/* <HStack max> */}
            {/*    <ListBox */}
            {/*        defaultValue="Выберите значение" */}
            {/*        onChange={onChangeListBox} */}
            {/*        items={people} */}
            {/*        value={selectedItem} */}
            {/*    /> */}
            {/* </HStack> */}
        </Page>
    );
};

export default MainPage;
