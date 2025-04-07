import clsx from "clsx";
import { TileStatus, TileFeedback } from "../types";
import { memo } from "react";
import { motion } from "motion/react";

interface TileProps {
    letter?: string;
    tileStatus: TileStatus;
    tileFeedback?: TileFeedback;
    isFlipping : boolean;
}

// const tileStyle = "h-12 w-12 rounded-sm border-gray-400 border-2 mx-1 uppercase text-[24px] text-center font-bold flex items-center justify-center sm:h-16 sm:w-16 sm:text-[36px]";
const tileStyle =
"h-12 w-12 rounded-sm border-gray-400 border-2 mx-1 uppercase text-[24px] text-center font-bold flex items-center justify-center sm:h-16 sm:w-16 sm:text-[36px] lg:h-16 lg:w-16 lg:text-[40px]";

const Tile = ({ letter = "", tileStatus, tileFeedback, isFlipping }: TileProps) => {
    return (
        <motion.div
            initial={{scale : 1}}
            animate={isFlipping ? "flip" : "scale"}
            variants={{
                flip: {
                    rotateX: [0, 90, 0],
                    transition : {duration: 0.5, ease: "easeInOut"}
                },
                scale: {
                    scale: letter ? [1, 1.2, 1] : [1, 0.8, 1],
                    transition: { type:"keyframes", stiffness:10, damping:10}
                }
            }}
        >
            <div
                className={clsx(tileStyle, {
                    "border-black": tileStatus === "input",
                    "bg-green-500": tileFeedback === "correct",
                    "bg-yellow-500": tileFeedback === "wrong-place",
                    "bg-gray-500": tileFeedback === "wrong",
                })}
            >
                {letter}
            </div>
        </motion.div>

    );
}

export default memo(Tile);