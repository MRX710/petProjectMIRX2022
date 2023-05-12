import { lazy } from 'react';

export const ArticleDetailPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!
    setTimeout(() => resolve(import('./ArticleDetailPage')), 1500);
}));
