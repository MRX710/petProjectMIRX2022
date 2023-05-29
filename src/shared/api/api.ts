import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';


// eslint-disable-next-line import/no-mutable-exports
export let $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});

// eslint-disable-next-line no-return-assign
export const changeApi = (newApi: any) => $api = newApi;


