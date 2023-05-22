import { FC, lazy } from 'react';
import { IAddCommentFormProps } from "./AddCommentForm";

export const AddCommentFormAsync = lazy<FC<IAddCommentFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!
    setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}));
