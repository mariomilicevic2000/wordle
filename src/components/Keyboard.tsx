import { regularKeys } from "../data";
import { KeyStatus } from "../types";
import Key from "./Key";

interface KeyboardProps {
  keyStatuses: KeyStatus[];
  onKeyClick: (key: string) => void;
}

export default function Keyboard({ keyStatuses, onKeyClick }: KeyboardProps) {
  const rows = [
    regularKeys.slice(0, 10),
    regularKeys.slice(10, 19),
    regularKeys.slice(19),
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row justify-center items-center">
      {/* Backspace on the left for mobile, stays in row for desktop */}
      <div className="sm:hidden flex justify-center mb-2">
        <Key key="backspace" letter="Backspace" keyStatus="not-guessed" onKeyClick={onKeyClick} />
      </div>

      {/* Keyboard rows */}
      <div className="flex flex-col items-center justify-center">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="m-1 flex flex-row justify-center">
            {/* Backspace on small screens left of middle row */}
            {rowIndex === 1 && (
              <div className="hidden sm:block mr-1">
                <Key key="backspace" letter="Backspace" keyStatus="not-guessed" onKeyClick={onKeyClick} />
              </div>
            )}
            
            {row.map((letter) => {
              const keyIndex = regularKeys.indexOf(letter);
              return (
                <Key
                  key={letter}
                  letter={letter}
                  keyStatus={keyStatuses[keyIndex] || "not-guessed"}
                  onKeyClick={onKeyClick}
                />
              );
            })}

            {/* Enter on small screens right of middle row */}
            {rowIndex === 1 && (
              <div className="hidden sm:block ml-1">
                <Key key="enter" letter="Enter" keyStatus="not-guessed" onKeyClick={onKeyClick} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enter on the right for mobile, stays in row for desktop */}
      <div className="sm:hidden flex justify-center mt-2">
        <Key key="enter" letter="Enter" keyStatus="not-guessed" onKeyClick={onKeyClick} />
      </div>
    </div>
  );
}
