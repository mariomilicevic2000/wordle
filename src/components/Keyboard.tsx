import { regularKeys } from "../data";
import { KeyStatus } from "../types";
import Key from "./Key";

interface KeyboardProps {
    keyStatuses: KeyStatus[];
    onKeyClick: (key: string) => void;
}

export default function Keyboard({ keyStatuses, onKeyClick }: KeyboardProps) {
    const rows = [
        regularKeys.slice(0, 10), // First row
        regularKeys.slice(10, 19), // Second row
        regularKeys.slice(19), // Third row
    ];

    return (
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center w-full">
            {/* <Key key="backspace" letter="Backspace" keyStatus="not-guessed" onKeyClick={onKeyClick} /> */}
            <div className="flex flex-col items-center justify-center w-full sm:w-auto">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center w-full">
                        {row.map((letter) => {
                            const keyIndex = regularKeys.indexOf(letter); // Get the actual QWERTY index
                            return (
                                <Key
                                    key={letter}
                                    letter={letter}
                                    keyStatus={keyStatuses[keyIndex] || "not-guessed"} // Default to "not-guessed" if undefined
                                    onKeyClick={onKeyClick}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            {/* <Key key="enter" letter="Enter" keyStatus="not-guessed" onKeyClick={onKeyClick} /> */}
        </div>
    );
}
