import { TileFeedback, TileStatus } from "../types";
import Row from "./Row";
import { motion } from "motion/react";

interface GridProps {
    guessesByLetters: string[][];
    tileFeedbacksRows: TileFeedback[][];
    currentRow: number;
    maxRows: number;
    flippingTiles: any;
    isShaking: boolean;
}

const shakeAnimation = {
    x: [-5, 5, -5, 5, -5, 0], // Moves left-right rapidly
    transition: { duration: 0.6 }
};

export default function Grid({ guessesByLetters, tileFeedbacksRows, currentRow, maxRows, flippingTiles, isShaking }: GridProps) {
    const tileStatuses: TileStatus[] = Array.from({ length: maxRows }, (_, index) =>
        index < currentRow ? "guessed"
            : index === currentRow ? "input"
                : "default"
    );

    return (
        <div className="flex flex-col items-center justify-center py-8">
            {Array.from({ length: maxRows }, (_, index) => (
                <motion.div
                    key={index}
                    animate={(isShaking && (index === currentRow)) ? shakeAnimation : {}}
                >
                    <Row
                        key={index}
                        rowIndex={index}
                        currentRow={currentRow}
                        tileStatus={tileStatuses[index]}
                        letters={guessesByLetters[index] || []}
                        tileFeedbacks={tileFeedbacksRows[index] || []}
                        flippingTiles={flippingTiles}
                    />
                </motion.div>
            ))}
        </div>
    );
}
