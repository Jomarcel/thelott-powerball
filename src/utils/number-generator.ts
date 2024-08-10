/**
 * Generates an array of sequential numbers starting from 1.
 *
 * @param {number} size - The total number of sequential numbers to generate
 * @returns {number[]} An array containing numbers from 1 to the specified size.
 */
export const generateNumbers = (size: number): number[] => {
    return [...Array(size).keys()].map(i => i + 1);
}
