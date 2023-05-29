export function getQueryParams(params: OptionalRecord<string, string | null>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

export function addQueryParams(params: OptionalRecord<string, string | null>) {
    window.history.pushState(null, '', getQueryParams(params));
}

/**
 *  Функция добавления параметров строки запроса # URL
 *
 */
