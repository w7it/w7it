export function debounce<T extends (...args: unknown[]) => unknown>(
    cb: T,
    wait = 20,
) {
    let timer: ReturnType<typeof setTimeout>;
    const callable = (...args: unknown[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => cb(...args), wait);
    };

    return callable as unknown as T;
}
