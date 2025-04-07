import { memo } from "react";
import { KeyStatus } from "../types";
import clsx from "clsx";
import { motion } from "motion/react";
import { ArrowRight, Delete } from "lucide-react";

interface KeyProps {
  letter: string;
  keyStatus: KeyStatus;
  onKeyClick: (key: string) => void;
}

const Key = ({ letter, keyStatus, onKeyClick }: KeyProps) => {
  return (
    <div className="inline-block">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onKeyClick(letter)}
        className={clsx(
          "flex justify-center items-center text-lg font-semibold rounded-sm m-0.5 transition-all",
          "w-[8vw] h-[8vw] min-w-[30px] min-h-[40px] max-w-[50px] max-h-[60px]", // Responsive size
          {
            "bg-gray-300": keyStatus === "not-guessed",
            "bg-yellow-500": keyStatus === "wrong-place",
            "bg-green-500": keyStatus === "correct",
            "bg-red-400": keyStatus === "wrong"
          }
        )}
      >
        {letter === "Enter" ? <ArrowRight size={20} /> : letter === "Backspace" ? <Delete size={20} /> : letter}
      </motion.button>
    </div>
  );
};

export default memo(Key);