export function checkArrayToMap(value: any): boolean {
    return !!(!!value && Array.isArray(value) && value?.length);
}
