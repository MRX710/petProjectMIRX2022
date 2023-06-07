import { Fragment, memo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './ListBox.module.scss';


export interface IListBoxItem {
   value: string | number
   content: string
   disabled?: boolean
}

type TListBoxSelectedItem = IListBoxItem | string | number

export type DropdownDirection = 'top' | 'bottom'
const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop,
};

interface IListBoxProps {
   className?: string
   items?: IListBoxItem[]
   // выбранный элемент - может быть объектом
   value?: TListBoxSelectedItem
   onChange: (value: TListBoxSelectedItem) => void
   defaultValue?: string
   direction?: DropdownDirection
}

export const ListBox = memo((props: IListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        direction = 'bottom',
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];


    return (
        <HListbox
            as="div"
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <HListbox.Button
                className={cls.trigger}
            >
                <Button>
                    {
                        (
                            typeof value === "string" || typeof value === "number"
                                ? value : value?.content
                        ) ?? defaultValue
                    }
                </Button>
            </HListbox.Button>
            <HListbox.Options
                className={classNames(cls.options, {}, optionsClasses)}
            >
                {
                    items?.map((item: any) => (
                        <HListbox.Option
                            key={item.value}
                            value={item}
                            disabled={item?.unavailable}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                        [cls.disabled]: item?.disabled,
                                    }, [])}
                                >
                                    {!!selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))
                }
            </HListbox.Options>
        </HListbox>
    );
});
