import { useState, useEffect, useRef } from "react";
import { Letters, LettersDisplay, getCodePointHex, getUTF16LEBytes, getUTF8Bytes } from "../scripts/letters";
const Characters = () => {
    const Font = {
        mono: "mono",
        sans: "sans",
        serif: "symbola",
    };

    type FontType = keyof typeof Font;

    const [font, setFont] = useState<FontType>("serif");
    const [isSticky, setIsSticky] = useState(false);
    const stickyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the element is not intersecting (is sticking), set isSticky to true
                setIsSticky(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: [1],
                rootMargin: "-1px 0px 0px 0px", // 1px margin to detect when element leaves viewport
            },
        );

        if (stickyRef.current) {
            observer.observe(stickyRef.current);
        }

        return () => {
            if (stickyRef.current) {
                observer.unobserve(stickyRef.current);
            }
        };
    }, []);

    const FontSelectorInput = ({ name, displayText }: { name: FontType; displayText: string }) => {
        return (
            <label
                htmlFor={`font-${Font[name]}`}
                className={`flex h-auto w-auto cursor-pointer flex-row rounded-lg border-2 p-2 transition-colors duration-150 hover:border-blue-700 ${font === name ? "border-blue-700" : "border-neutral-600"}`}
            >
                <span>
                    <input
                        type="radio"
                        name="font"
                        id={`font-${Font[name]}`}
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
        <div className="flex flex-col">
            {/* Background that appears when sticky */}
            <div
                className={`fixed top-0 right-0 left-0 z-10 h-40 backdrop-blur-xs transition-opacity duration-150 ${isSticky ? "opacity-100" : "hidden opacity-0"}`}
                style={{
                    backdropFilter: `
                        blur(0px) 
                        linear-gradient(
                            to bottom, 
                            rgba(255, 255, 255, 0) 0%, 
                            rgba(255, 255, 255, 0.1) 30%, 
                            rgba(255, 255, 255, 0.3) 100%
                        )
                    `,
                    WebkitBackdropFilter: `
                        blur(0px) 
                        linear-gradient(
                            to bottom, 
                            rgba(255, 255, 255, 0) 0%, 
                            rgba(255, 255, 255, 0.1) 30%, 
                            rgba(255, 255, 255, 0.3) 100%
                        )
                    `,
                    maskImage: `
                        linear-gradient(
                            to bottom, 
                            rgba(0, 0, 0, 1) 0%, 
                            rgba(0, 0, 0, 0.7) 70%, 
                            rgba(0, 0, 0, 0) 100%
                        )
                    `,
                    WebkitMaskImage: `
                        linear-gradient(
                            to bottom, 
                            rgba(0, 0, 0, 1) 0%, 
                            rgba(0, 0, 0, 0.7) 70%, 
                            rgba(0, 0, 0, 0) 100%
                        )
                    `,
                }}
            ></div>
            <div ref={stickyRef} className="sticky top-0 z-20 w-full p-4 lg:px-0">
                <div className="flex flex-row items-center gap-3 rounded-lg border-2 border-neutral-600 bg-neutral-800 p-4">
                    <p className="text-lg font-semibold">Fonts</p>
                    <div className="flex flex-row gap-2">
                        <FontSelectorInput name="serif" displayText="Sans Serif"></FontSelectorInput>
                        <FontSelectorInput name="sans" displayText="Sans"></FontSelectorInput>
                        <FontSelectorInput name="mono" displayText="Monospace"></FontSelectorInput>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex max-w-full flex-col overflow-x-auto">
                <table className="w-auto table-auto border-collapse overflow-x-auto border-2 border-neutral-600 lg:w-3xl">
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
                        {Object.keys(Letters).map((key, index1) =>
                            Letters[key as keyof typeof Letters].map((letter, index2) => (
                                <tr key={index1 + index2} className={`h-10 ${!letter.modified && "bg-red-950"}`}>
                                    <td className="border border-neutral-600 text-center">
                                        <span className={`mx-0.5 px-1 text-2xl font-${Font[font]}`}>
                                            {letter.original}
                                        </span>
                                    </td>
                                    <td className="border border-neutral-600 text-center">
                                        <span className={`mx-0.5 px-1 text-2xl font-${Font[font]}`}>
                                            {letter.modified}
                                        </span>
                                    </td>
                                    <td className="border border-neutral-600 text-center">
                                        <span className="mx-0.5 px-1 font-mono text-rose-400">
                                            {letter.modified && getCodePointHex(letter.modified)}
                                        </span>
                                    </td>
                                    <td className="border border-neutral-600 text-center">
                                        {letter.modified &&
                                            getUTF8Bytes(letter.modified).map((byte, i) => (
                                                <span key={i} className="mx-0.5 px-1 font-mono text-rose-400">
                                                    {byte}
                                                </span>
                                            ))}
                                    </td>
                                    <td className="border border-neutral-600 text-center">
                                        {letter.modified &&
                                            getUTF16LEBytes(letter.modified).map((byte, i) => (
                                                <span key={i} className="mx-0.5 px-1 font-mono text-rose-400">
                                                    {byte}
                                                </span>
                                            ))}
                                    </td>
                                    <td className="border border-neutral-600 text-center">{letter.block}</td>
                                </tr>
                            )),
                        )}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>

            <a
                href="https://github.com/aldenasf/unicode-spoofer-astro/blob/HEAD/src/scripts/letters.ts"
                className="transition-color mt-4 rounded-lg border-2 border-neutral-600 bg-neutral-800 px-4 py-2 duration-150 hover:bg-neutral-600"
            >
                Contribute to this list
            </a>
        </div>
    );
};

export default Characters;
