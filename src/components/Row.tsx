import { memo } from "react";
import { TileFeedback, TileStatus } from "../types";
import Tile from "./Tile";

interface RowProps {
    rowIndex : number;
    currentRow : number;
    tileStatus: TileStatus;
    letters?: string[];
    tileFeedbacks?: TileFeedback[];
    flippingTiles : any;
}

const Row = ({ rowIndex, currentRow, tileStatus, letters = [], tileFeedbacks = [], flippingTiles }: RowProps) => {
    return (
        <div className="flex flex-row m-2">
            {Array.from({ length: 5 }, (_, index) => (
                <Tile
                    key={index}
                    letter={letters[index] || ""}
                    tileStatus={tileStatus}
                    tileFeedback={tileFeedbacks[index] || ""}
                    isFlipping={flippingTiles.includes(index) && rowIndex === currentRow}
                />
            ))}
        </div>
    );
}

export default memo(Row);
