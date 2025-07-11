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
