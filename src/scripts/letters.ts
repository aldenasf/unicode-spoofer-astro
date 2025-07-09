export const Letters = {
    uppercase: [
        { original: "A", modified: "А", block: "Cyrillic" },
        { original: "B", modified: "В", block: "Cyrillic" },
        { original: "C", modified: "С", block: "Cyrillic" },
        { original: "D", modified: "D", block: "Cyrillic" },
        { original: "E", modified: "Е", block: "Cyrillic" },
        { original: "F", modified: "", block: "" },
        { original: "G", modified: "", block: "" },
        { original: "H", modified: "Н", block: "Cyrillic" },
        { original: "I", modified: "І", block: "Cyrillic" },
        { original: "J", modified: "Ј", block: "Cyrillic" },
        { original: "K", modified: "К", block: "Cyrillic" },
        { original: "L", modified: "", block: "" },
        { original: "M", modified: "М", block: "Cyrillic" },
        { original: "N", modified: "Ν", block: "Greek and Coptic" },
        { original: "O", modified: "О", block: "Cyrillic" },
        { original: "P", modified: "Р", block: "Cyrillic" },
        { original: "Q", modified: "", block: "" },
        { original: "R", modified: "", block: "" },
        { original: "S", modified: "Ѕ", block: "Cyrillic" },
        { original: "T", modified: "Т", block: "Cyrillic" },
        { original: "U", modified: "", block: "" },
        { original: "V", modified: "", block: "" },
        { original: "W", modified: "", block: "" },
        { original: "X", modified: "Х", block: "Cyrillic" },
        { original: "Y", modified: "Ү", block: "Cyrillic" },
        { original: "Z", modified: "Ζ", block: "Greek and Coptic" },
    ],

    lowercase: [
        { original: "a", modified: "а", block: "Cyrillic" },
        { original: "b", modified: "", block: "" },
        { original: "c", modified: "с", block: "Cyrillic" },
        { original: "d", modified: "", block: "" },
        { original: "e", modified: "е", block: "Cyrillic" },
        { original: "f", modified: "", block: "" },
        { original: "g", modified: "", block: "" },
        { original: "h", modified: "һ", block: "Cyrillic" },
        { original: "i", modified: "і", block: "Cyrillic" },
        { original: "j", modified: "ј", block: "Cyrillic" },
        { original: "k", modified: "", block: "" },
        { original: "l", modified: "l", block: "Cyrillic" },
        { original: "m", modified: "", block: "" },
        { original: "n", modified: "", block: "" },
        { original: "o", modified: "о", block: "Cyrillic" },
        { original: "p", modified: "р", block: "Cyrillic" },
        { original: "q", modified: "", block: "" },
        { original: "r", modified: "", block: "" },
        { original: "s", modified: "ѕ", block: "Cyrillic" },
        { original: "t", modified: "", block: "" },
        { original: "u", modified: "", block: "" },
        { original: "v", modified: "", block: "" },
        { original: "w", modified: "", block: "" },
        { original: "x", modified: "х", block: "Cyrillic" },
        { original: "y", modified: "у", block: "Cyrillic" },
        { original: "z", modified: "", block: "" },
    ],

    numbers: [
        { original: "0", modified: "", block: "" },
        { original: "1", modified: "", block: "" },
        { original: "2", modified: "", block: "" },
        { original: "3", modified: "З", block: "Cyrillic" },
        { original: "4", modified: "", block: "" },
        { original: "5", modified: "", block: "" },
        { original: "6", modified: "", block: "" },
        { original: "7", modified: "", block: "" },
        { original: "8", modified: "", block: "" },
        { original: "9", modified: "", block: "" },
    ],

    symbols: [
        { original: "/", modified: "∕", block: "Mathematical Operators" },
        { original: "!", modified: "ǃ", block: "Latin Extended-B" },
        { original: ".", modified: "․", block: "General Punctuation" },
        { original: ",", modified: "‚", block: "General Punctuation" },
        { original: ";", modified: ";", block: "General Punctuation" },
        { original: '"', modified: "", block: "" },
        { original: "@", modified: "", block: "" },
        { original: "#", modified: "", block: "" },
        { original: "$", modified: "", block: "" },
        { original: "%", modified: "", block: "" },
        { original: "^", modified: "", block: "" },
        { original: "&", modified: "", block: "" },
        { original: "*", modified: "", block: "" },
        { original: "(", modified: "", block: "" },
        { original: ")", modified: "", block: "" },
        { original: "`", modified: "", block: "" },
        { original: "-", modified: "", block: "" },
        { original: "=", modified: "", block: "" },
        { original: "[", modified: "", block: "" },
        { original: "]", modified: "", block: "" },
        { original: "\\", modified: "", block: "" },
        { original: "'", modified: "", block: "" },
        { original: "~", modified: "", block: "" },
        { original: "_", modified: "", block: "" },
        { original: "+", modified: "", block: "" },
        { original: "{", modified: "", block: "" },
        { original: "}", modified: "", block: "" },
        { original: "|", modified: "", block: "" },
        { original: ":", modified: "", block: "" },
        { original: "<", modified: "", block: "" },
        { original: ">", modified: "", block: "" },
        { original: "?", modified: "", block: "" },
    ],

    spaces: [{ original: " ", modified: " ", block: "General Punctuation" }],
};

export const LettersDisplay = {
    uppercase: {
        display: "Spoof Uppercase Letters",
        description: "",
    },
    lowercase: {
        display: "Spoof Lowercase Letters",
        description: "",
    },
    numbers: {
        display: "Spoof Numbers",
        description: "",
    },
    symbols: {
        display: "Spoof Symbols",
        description: "",
    },
    spaces: {
        display: "Spoof Spaces",
        description: "Replace regular spaces with 1/4em spaces.",
    },
};

export function getCodePointHex(letter: string) {
    return letter.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0") || "0000";
}

export function getUTF8Bytes(char: string): string[] {
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(char)).map((b) => b.toString(16).toUpperCase().padStart(2, "0"));
}

export function getUTF16LEBytes(char: string): string[] {
    const bytes = [];
    for (let i = 0; i < char.length; i++) {
        const code = char.charCodeAt(i);
        bytes.push(code & 0xff);
        bytes.push((code >> 8) & 0xff);
    }
    return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).toUpperCase().padStart(2, "0"));
}
