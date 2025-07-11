import React, { useState, useEffect } from "react";
import { FaCopy, FaRegCopy, FaTriangleExclamation } from "react-icons/fa6";
import { getCodePointHex, getUTF8Bytes, getUTF16LEBytes } from "../scripts/letters_utilities";
import { Letters, LettersDisplay } from "../scripts/letters";
import type { CharacterAlternative } from "../scripts/letters";

interface Props {
    initialInput?: string;
}

interface Replacement extends CharacterAlternative {
    utf8: string[];
    utf16le: string[];
    codePointHex: string;
}

const Converter: React.FC<Props> = (props) => {
    const [input, setInput] = useState(props.initialInput || "");
    const [output, setOutput] = useState("");
    const [replacements, setReplacements] = useState<Replacement[]>([]);
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

    type Font = "sans" | "symbola" | "mono" | "serif";

    const [font, setFont] = useState<Font>("sans");

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
            .filter((l) => l.alt.length > 0); // Filter out empty alt characters

        activeLetters.forEach((letter) => {
            if (result.includes(letter.base)) {
                const occurrences = (result.match(new RegExp(escapeRegExp(letter.base), "g")) || []).length;
                totalCount += occurrences;
                result = result.replaceAll(letter.base, letter.alt);

                const utf8 = getUTF8Bytes(letter.alt);
                const utf16le = getUTF16LEBytes(letter.alt);
                const codePointHex = getCodePointHex(letter.alt);

                localReplacements.push({ ...letter, utf8, utf16le, codePointHex });
            }
        });

        if (localSettings.zero_width_spaces) {
            result = result.split("").join("﻿");
            console.log(result.split("").join("﻿"));
        }

        setInputStats(() => {
            return { total: inputText.length, unique: new Set(inputText).size };
        });
        setOutput(result);
        setReplacements(localReplacements);
        setTotalSpoofedCount(totalCount);
        setWarnLetters(() => localReplacements.length === 0);
    }

    /**
     * Escapes special regex characters in a string so it can be used safely in a RegExp constructor.
     * This prevents special characters from being interpreted as regex metacharacters.
     *
     * For example:
     * - "." becomes "\\." (matches literal dot instead of any character)
     * - "?" becomes "\\?" (matches literal question mark instead of zero-or-one quantifier)
     *
     * The following special regex characters are escaped:
     * [ \ ^ $ . | ? * + ( ) { } ]
     *
     * @param string - The input string containing possible regex special characters
     * @returns A new string with all regex special characters properly escaped
     *
     * @example
     * // Returns "\\?\\.\\*"
     * escapeRegExp("?.*");
     *
     * @example
     * // Safe usage in RegExp:
     * const searchText = "file.txt";
     * const regex = new RegExp(escapeRegExp(searchText)); // Matches "file.txt" literally
     */

    function escapeRegExp(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

    const FontSelectorInput = ({ name, displayText }: { name: Font; displayText: string }) => {
        return (
            <label
                htmlFor={`font-${name}`}
                className={`flex h-auto w-auto cursor-pointer flex-row rounded-lg border-2 p-2 transition-colors duration-150 hover:border-blue-700 ${font === name ? "border-blue-700" : "border-neutral-600"}`}
            >
                <span>
                    <input
                        type="radio"
                        name="font"
                        id={`font-${name}`}
                        className="hidden"
                        checked={font === name}
                        onChange={(e) => {
                            setFont((prev) => name);
                        }}
                    />
                    <span>{displayText}</span>
                </span>
            </label>
        );
    };

    return (
        <div className="flex w-screen max-w-6xl flex-col items-center justify-center px-4">
            <div className="flex w-full max-w-4xl flex-col gap-4 lg:flex-row">
                <div className="flex w-full flex-col">
                    <div className="flex flex-row items-center">
                        <p className="mb-2 text-xl font-semibold">Input</p>
                        <p className={`ml-2 text-sm text-neutral-500 ${inputStats.total == 0 && "hidden"}`}>
                            {inputStats.total} characters | {inputStats.unique} unique characters
                        </p>
                    </div>
                    <textarea
                        className={`h-72 w-full resize-none rounded-lg border-2 border-neutral-600 bg-neutral-800 p-2 font-${font}`}
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
                        <p
                            className={`ml-2 text-sm ${inputStats.total == 0 && "hidden"} ${replacements.length == 0 ? "text-amber-500" : "text-neutral-500"}`}
                        >
                            {totalSpoofedCount} characters spoofed | {replacements.length} unique characters spoofed
                        </p>
                    </div>
                    <textarea
                        className={`h-72 w-full resize-none rounded-lg border-2 border-neutral-600 bg-neutral-800 p-2 font-${font}`}
                        placeholder="Output"
                        value={output}
                        readOnly
                    ></textarea>
                </div>
            </div>

            <div className="mt-4 w-full max-w-4xl lg:px-0">
                <div className="flex flex-row items-center gap-3 rounded-lg border-2 border-neutral-600 bg-neutral-800 p-4">
                    <p className="text-lg font-semibold">Fonts</p>
                    <div className="flex flex-row gap-2 overflow-x-auto text-nowrap">
                        <FontSelectorInput name="serif" displayText="Sans Serif"></FontSelectorInput>
                        <FontSelectorInput name="sans" displayText="Sans"></FontSelectorInput>
                        <FontSelectorInput name="mono" displayText="Monospace"></FontSelectorInput>
                        <FontSelectorInput name="symbola" displayText="Symbola"></FontSelectorInput>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex w-full max-w-4xl flex-col rounded-lg border-2 border-neutral-600 bg-neutral-800 p-4">
                <div>
                    <p className="mb-2 text-center text-xl">Options</p>
                </div>
                <div className="flex w-full flex-col gap-8 lg:flex-row">
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
                                    key={key}
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

                <div className="mt-4 flex w-full flex-col gap-2 lg:flex-row lg:gap-4">
                    <button
                        onClick={() => {
                            let allOriginalChars: string[] = [];
                            Object.keys(Letters).map((key, index) => {
                                allOriginalChars = [
                                    ...allOriginalChars,
                                    ...Letters[key as keyof typeof Letters].map((item) => {
                                        if (item.alt.length) {
                                            return item.base;
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
                        className="w-full cursor-pointer rounded-md border-2 border-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-neutral-700"
                    >
                        Test all spoofable characters
                    </button>
                    <button
                        onClick={() => {
                            let allOriginalChars: string[] = [];
                            Object.keys(Letters).map((key, index) => {
                                allOriginalChars = [
                                    ...allOriginalChars,
                                    ...Letters[key as keyof typeof Letters].map((item) => {
                                        if (!item.alt.length) {
                                            return item.base;
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
                        className="w-full cursor-pointer rounded-md border-2 border-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-neutral-700"
                    >
                        Test all non-spoofable characters
                    </button>
                    <button
                        onClick={() => convertText(input)}
                        className="w-full cursor-pointer rounded-md bg-blue-600 px-4 py-2 transition-colors duration-150 hover:bg-blue-800"
                    >
                        Convert
                    </button>
                </div>
            </div>

            <div
                className={`b mt-4 flex w-full max-w-screen flex-row items-center rounded-lg border-2 border-amber-500 bg-amber-600 p-4 lg:max-w-4xl ${!warnLetters && "hidden"}`}
            >
                <FaTriangleExclamation className="mr-2 text-xl"></FaTriangleExclamation>
                <p>No letters were replaced</p>
            </div>
            <div className={`mt-4 flex w-full overflow-auto lg:max-w-4xl ${replacements.length == 0 && "hidden"}`}>
                <table className="min-w-full table-auto border-collapse overflow-auto border-2 border-neutral-600 lg:w-xl">
                    <thead className="h-8 bg-neutral-700 text-white">
                        <tr>
                            <th className="border-neutral-600 lg:w-20">Base</th>
                            <th className="border-neutral-600 lg:w-20">Alt</th>
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
                                    <span className={`font-${font} mx-0.5 px-1 text-2xl`}>{replacement.base}</span>
                                </td>
                                <td className="border border-neutral-600 text-center">
                                    <span className={`font-${font} mx-0.5 px-1 text-2xl`}>{replacement.alt}</span>
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
            </div>
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
