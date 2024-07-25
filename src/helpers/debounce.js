function debounce(fn, delay = 1000) {
    let timeout = 0
    return (...arg) => {
        timeout = setTimeout(() => {
            fn(...arg)
        }, delay)
    }
}