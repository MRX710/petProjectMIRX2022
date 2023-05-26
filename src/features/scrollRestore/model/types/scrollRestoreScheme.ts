// адрес страницы, позиция скролла
export type ScrollScheme = Record<string, number>

export interface IScrollRestoreScheme {
   scroll: ScrollScheme
}
