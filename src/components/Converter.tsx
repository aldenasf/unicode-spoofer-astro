import React, { useState, useEffect } from "react";
import { FaCopy, FaRegCopy, FaTriangleExclamation } from "react-icons/fa6";

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
        { original: '"', modified: "", block: "" },
        { original: "<", modified: "", block: "" },
        { original: ">", modified: "", block: "" },
        { original: "?", modified: "", block: "" },
    ],

    spaces: [{ original: " ", modified: " ", block: "General Punctuation" }],
};

const LettersDisplay = {
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

interface Props {
    initialInput?: string;
}

const Converter: React.FC<Props> = (props) => {
    const [input, setInput] = useState(props.initialInput || "");
    const [output, setOutput] = useState("");
    const [replacements, setReplacements] = useState<
        {
            original: string;
            modified: string;
            block: string;
            utf8: string[];
            utf16le: string[];
            codePointHex: string;
        }[]
    >([]);
    const [blocks, setBlocks] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        spaces: true,
    });
    const [settings, setSettings] = useState({
        zero_width_spaces: false,
        show_preview: true,
        auto_convert: true,
    });
    const [warnLetters, setWarnLetters] = useState(false);
    const [totalSpoofedCount, setTotalSpoofedCount] = useState(0);
    const [inputStats, setInputStats] = useState({ total: 0, unique: 0 });

    useEffect(() => {
        if (props.initialInput) {
            convertText(props.initialInput);
        }
    }, []);

    function convertText(inputText: string, settingsOverwrite?: typeof settings, blocksOverwrite?: typeof blocks) {
        let localReplacements: typeof replacements = [];
        let localBlocks: typeof blocks = blocks;
        let localSettings: typeof settings = settings;
        let totalCount = 0;

        if (blocksOverwrite) localBlocks = { ...localBlocks, ...blocksOverwrite };
        if (settingsOverwrite) localSettings = { ...localSettings, ...settingsOverwrite };

        let result = inputText;

        const activeLetters = Object.keys(Letters)
            .filter((key) => localBlocks[key as keyof typeof Letters]) // Only include categories enabled in settings
            .flatMap((key) => Letters[key as keyof typeof Letters]) // Get all letter arrays for enabled categories
            .filter((l) => l.modified.length > 0); // Filter out empty modified characters

        activeLetters.forEach((letter) => {
            if (result.includes(letter.original)) {
                const occurrences = (result.match(new RegExp(letter.original, "g")) || []).length;
                totalCount += occurrences;
                result = result.replaceAll(letter.original, letter.modified);

                const utf8 = getUTF8Bytes(letter.modified);
                const utf16le = getUTF16LEBytes(letter.modified);
                const codePointHex =
                    letter.modified.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0") || "0000";

                localReplacements.push({ ...letter, utf8, utf16le, codePointHex });
            }
        });

        if (localSettings.zero_width_spaces) {
            result = result.split("").join("﻿");
            console.log(result.split("").join("﻿"));
        }

        setOutput(result);
        setReplacements(localReplacements);
        setTotalSpoofedCount(totalCount);
        setWarnLetters(() => localReplacements.length === 0);
    }

    function getUTF8Bytes(char: string): string[] {
        const encoder = new TextEncoder();
        return Array.from(encoder.encode(char)).map((b) => b.toString(16).toUpperCase().padStart(2, "0"));
    }

    function getUTF16LEBytes(char: string): string[] {
        const bytes = [];
        for (let i = 0; i < char.length; i++) {
            const code = char.charCodeAt(i);
            bytes.push(code & 0xff);
            bytes.push((code >> 8) & 0xff);
        }
        return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).toUpperCase().padStart(2, "0"));
    }

    const OptionBlock = ({
        text,
        description,
        block,
    }: {
        text: string;
        description: string;
        block: keyof typeof blocks;
    }) => {
        // displayText: {LettersDisplay[key as keyof typeof Letters]["display"] || key.charAt(0).toUpperCase() + key.slice(1)}
        // description: {LettersDisplay[key as keyof typeof Letters]["description"]}
        // block: keyof typeof blocks
        return (
            <label className="flex cursor-pointer flex-col text-lg">
                <span className="flex flex-row items-center">
                    <input
                        type="checkbox"
                        checked={blocks[block]}
                        onChange={(e) => {
                            const newBlocks = {
                                ...blocks,
                                [block]: e.target.checked,
                            };
                            setBlocks(newBlocks);
                            if (settings.auto_convert) convertText(input, undefined, newBlocks);
                        }}
                        className="mr-1 size-4 rounded-e-4xl accent-blue-600"
                    />
                    <span>{text}</span>
                    <span className={`ml-2 text-xs text-neutral-500 ${Letters[block].length == 1 && "hidden"}`}>
                        {Letters[block].length}
                    </span>
                </span>
                {description && <p className="max-w-56 text-sm text-wrap text-neutral-400">{description}</p>}
            </label>
        );
    };

    const OptionCheckbox = ({
        name,
        description,
        setting,
    }: {
        name: string;
        description: string;
        setting: keyof typeof settings;
    }) => {
        return (
            <label className="flex cursor-pointer flex-col text-lg">
                <span className="flex flex-row items-center">
                    <input
                        type="checkbox"
                        checked={settings[setting]}
                        onChange={(e) => {
                            const newValue = e.target.checked;
                            setSettings((prevSettings) => {
                                const newSettings = { ...prevSettings, [setting]: newValue };
                                console.log(`${newValue} ${newSettings[setting]}`);
                                if (newSettings.auto_convert) convertText(input, newSettings);
                                return newSettings;
                            });
                        }}
                        className="mr-1 size-4 rounded-e-4xl accent-blue-600"
                    />
                    {name}
                </span>

                <p className="max-w-56 text-sm text-wrap text-neutral-400">{description}</p>
            </label>
        );
    };

    return (
        <div className="flex w-screen max-w-6xl flex-col items-center justify-center">
            <div className="flex w-full flex-row gap-4">
                <div className="flex w-full flex-col">
                    <div className="flex flex-row items-center">
                        <p className="mb-2 text-xl font-semibold">Input</p>
                        <p className={`ml-2 text-sm text-neutral-500 ${inputStats.total == 0 && "hidden"}`}>
                            {inputStats.total} characters | {inputStats.unique} unique characters
                        </p>
                    </div>
                    <textarea
                        className="h-72 w-full resize-none rounded-lg border-2 border-neutral-600 bg-neutral-800 p-2"
                        placeholder="Input"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (settings.auto_convert) convertText(e.target.value);
                            setInputStats(() => {
                                return { total: e.target.value.length, unique: new Set(e.target.value).size };
                            });
                        }}
                    ></textarea>
                </div>
                <div className="flex w-full flex-col">
                    <div className="flex flex-row items-center">
                        <p className="mb-2 text-xl font-semibold">Output</p>
                        <p className={`ml-2 text-sm text-neutral-500 ${replacements.length == 0 && "hidden"}`}>
                            {totalSpoofedCount} characters spoofed | {replacements.length} unique characters spoofed
                        </p>
                    </div>
                    <textarea
                        className="h-72 w-full resize-none rounded-lg border-2 border-neutral-600 bg-neutral-800 p-2"
                        placeholder="Output"
                        value={output}
                        readOnly
                    ></textarea>
                </div>
            </div>
            <div className="mt-4 flex w-full max-w-4xl flex-col rounded-lg border-2 border-neutral-600 p-4">
                <div>
                    <p className="mb-2 text-center text-xl">Options</p>
                </div>
                <div className="flex w-full flex-row gap-8">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            {Object.keys(blocks).map((key) => (
                                <OptionBlock
                                    text={
                                        LettersDisplay[key as keyof typeof Letters]["display"] ||
                                        key.charAt(0).toUpperCase() + key.slice(1)
                                    }
                                    description={LettersDisplay[key as keyof typeof Letters]["description"]}
                                    block={key as keyof typeof blocks}
                                ></OptionBlock>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-2">
                            <OptionCheckbox
                                name="Insert Zero-width Spaces"
                                description="Add a space of zero length after each character in text."
                                setting={"zero_width_spaces"}
                            ></OptionCheckbox>
                            {/* <OptionCheckbox // TODO
                                name="Preview"
                                description="Highlight spoofed characters."
                                setting={"show_preview"}
                            ></OptionCheckbox> */}
                            <OptionCheckbox
                                name="Auto Convert"
                                description="Automatically convert when input is changed."
                                setting={"auto_convert"}
                            ></OptionCheckbox>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-row gap-4">
                    <button
                        onClick={() => {
                            let allOriginalChars: string[] = [];
                            Object.keys(Letters).map((key, index) => {
                                allOriginalChars = [
                                    ...allOriginalChars,
                                    ...Letters[key as keyof typeof Letters].map((item) => {
                                        if (item.modified.length) {
                                            return item.original;
                                        } else {
                                            return "";
                                        }
                                    }),
                                ];
                            });
                            const result = allOriginalChars.join("");
                            setInput(result);
                            convertText(result);
                        }}
                        className="mt-4 w-full cursor-pointer rounded-md border-2 border-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-neutral-700"
                    >
                        Test spoofable characters
                    </button>
                    <button
                        onClick={() => {
                            let allOriginalChars: string[] = [];
                            Object.keys(Letters).map((key, index) => {
                                allOriginalChars = [
                                    ...allOriginalChars,
                                    ...Letters[key as keyof typeof Letters].map((item) => {
                                        if (!item.modified.length) {
                                            return item.original;
                                        } else {
                                            return "";
                                        }
                                    }),
                                ];
                            });
                            const result = allOriginalChars.join("");
                            setInput(result);
                            convertText(result);
                        }}
                        className="mt-4 w-full cursor-pointer rounded-md border-2 border-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-neutral-700"
                    >
                        Test non-spoofable characters
                    </button>
                    <button
                        onClick={() => convertText(input)}
                        className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-blue-800"
                    >
                        Convert
                    </button>
                </div>
            </div>

            <div
                className={`mt-4 flex w-xl flex-row items-center rounded-lg bg-amber-600 p-4 ${!warnLetters && "hidden"}`}
            >
                <FaTriangleExclamation className="mr-2 text-xl"></FaTriangleExclamation>
                <p>No letters were replaced</p>
            </div>
            <table
                className={`mt-4 w-xl table-fixed border-collapse border-2 border-neutral-600 ${replacements.length == 0 && "hidden"}`}
            >
                <thead className="h-8 bg-neutral-700 text-white">
                    <tr>
                        <th className="w-20 border border-neutral-600">Base</th>
                        <th className="w-20 border border-neutral-600">Alt</th>
                        <th className="w-auto min-w-16 border border-neutral-600">Code</th>
                        <th className="w-auto min-w-18 border border-neutral-600">UTF-8</th>
                        <th className="w-auto min-w-18 border border-neutral-600">UTF-16</th>
                        <th className="border border-neutral-600">Block</th>
                    </tr>
                </thead>
                <tbody>
                    {replacements.map((replacement, index) => (
                        <tr key={index} className="h-10">
                            <td className="border border-neutral-600 text-center">
                                <span className="mx-0.5 bg-neutral-800 px-1 font-mono text-rose-400">
                                    {replacement.original}
                                </span>
                            </td>
                            <td className="border border-neutral-600 text-center">
                                <span className="mx-0.5 bg-neutral-800 px-1 font-mono text-rose-400">
                                    {replacement.modified}
                                </span>
                            </td>
                            <td className="border border-neutral-600 text-center">
                                <span className="mx-0.5 bg-neutral-800 px-1 font-mono text-rose-400">
                                    {replacement.codePointHex}
                                </span>
                            </td>
                            <td className="border border-neutral-600 text-center">
                                {replacement.utf8.map((byte, i) => (
                                    <span key={i} className="mx-0.5 bg-neutral-800 px-1 font-mono text-rose-400">
                                        {byte}
                                    </span>
                                ))}
                            </td>
                            <td className="border border-neutral-600 text-center">
                                {replacement.utf16le.map((byte, i) => (
                                    <span key={i} className="mx-0.5 bg-neutral-800 px-1 font-mono text-rose-400">
                                        {byte}
                                    </span>
                                ))}
                            </td>
                            <td className="border border-neutral-600 text-center">{replacement.block}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
            {/* <div className="mt-4 flex flex-row items-center gap-2"> // TODO
                <button
                    onClick={() => convertText(input)}
                    className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-blue-800"
                >
                    <span className="flex flex-row items-center">
                        <FaCopy className="text-md mr-1"></FaCopy>
                        Copy
                    </span>
                </button>
                <button
                    onClick={() => convertText(input)}
                    className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-blue-800"
                >
                    <span className="flex flex-row items-center">
                        <FaCopy className="text-md mr-1"></FaCopy>
                        Share
                    </span>
                </button>
            </div> */}
        </div>
    );
};

export default Converter;
