export function debounce<T extends Function>(cb: T, wait = 20) {
    let timer: ReturnType<typeof setTimeout>;
    const callable = (...args: any) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => cb(...args), wait);
    };

    return callable as unknown as T;
}
