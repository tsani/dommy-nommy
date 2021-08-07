export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
        randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

/**
 * Computes a random number in the range [lo, hi).
 * @param lo The lower bound of the random number (inclusive).
 * @param hi The upper bound of the random number (exclusive).
 */
export const randomRange = (lo: number, hi: number): number => lo + (hi - lo) * Math.random();

/**
 * Parses an integer from a string, returning undefined (instead of NaN) in case the parse fails.
 * @param s
 */
export const smartParseInt = (s: string): undefined | number => {
    const x = parseInt(s);
    return isNaN(x) ? undefined : x;
};
