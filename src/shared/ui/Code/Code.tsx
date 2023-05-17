import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from '../Button/Button';
import cls from './Code.module.scss';

interface ICodeProps {
   className?: string
   text?: string
}

export const Code = memo((props: ICodeProps) => {
    const {
        className,
        text = '',
    } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                onClick={onCopy}
                className={cls.copyBtn}
                theme={ButtonTheme.CLEAR}
            >
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});

