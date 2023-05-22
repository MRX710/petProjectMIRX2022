import { StateScheme } from "app/providers/StoreProvider";

export const getAddCommentFormText = (state: StateScheme) => state?.addCommentForm?.text;
export const getAddCommentFormError = (state: StateScheme) => state?.addCommentForm?.error;
