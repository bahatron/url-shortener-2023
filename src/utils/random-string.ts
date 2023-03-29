export function randomString(length: number = 6) {
    return Array(length)
        .fill(null)
        .map(() => Math.floor(Math.random() * 36).toString(36))
        .join("");
}
