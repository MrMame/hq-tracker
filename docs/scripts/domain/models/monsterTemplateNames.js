export const Easy = "Easy";
export const Normal = "Normal";
export const Hard = "Hard";
export const Elite = "Elite";

export function parse(textToParse) {
    if (!textToParse) return "";

    const cleanedText = textToParse.toLowerCase();

    if (cleanedText.includes("easy")) return Easy;
    if (cleanedText.includes("normal")) return Normal;
    if (cleanedText.includes("hard")) return Hard;
    if (cleanedText.includes("elite")) return Elite;

    return "";
}
