export const generateNumbers = (size: number) => {
    return [...Array(size).keys()].map(i => i + 1);
}
