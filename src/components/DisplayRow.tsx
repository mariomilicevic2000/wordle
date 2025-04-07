import { memo } from "react";
import { TileFeedback, TileStatus } from "../types";
import Tile from "./Tile";

interface RowProps {
    rowIndex: number;
    currentRow: number;
    tileStatus: TileStatus;
    letters?: string[];
    tileFeedbacks?: TileFeedback[];
}

const DisplayRow = ({ tileStatus, letters = [], tileFeedbacks = [] }: RowProps) => {
    return (
        <div className="flex flex-row m-2">
            {Array.from({ length: 5 }, (_, index) => (
                <Tile
                    key={index}
                    letter={letters[index] || ""}
                    tileStatus={tileStatus}
                    tileFeedback={tileFeedbacks[index] || ""}
                    isFlipping={false}  // Disable the flipping effect for display purposes
                />
            ))}
        </div>
    );
}

export default memo(DisplayRow);
