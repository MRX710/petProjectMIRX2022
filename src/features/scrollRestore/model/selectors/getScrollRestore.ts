import { StateScheme } from "app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getScrollRestore = (state: StateScheme) => state.scrollRestore?.scroll;
export const getScrollRestoreByPath = createSelector(
    getScrollRestore,
    (state: StateScheme, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
