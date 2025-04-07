import { motion } from "motion/react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router";

interface GameOverModalProps {
  onClose: () => void;
  hasWon: boolean;
  hasLost: boolean;
  wordToGuess : string
}

export default function GameOverModal({ onClose, hasWon, hasLost, wordToGuess }: GameOverModalProps) {
  const winCount = Number(localStorage.getItem("wordleWins")) || 0;
  const lossCount = Number(localStorage.getItem("wordleLosses")) || 0;

  const navigate = useNavigate();

  function handleRedirect(){
    navigate('/analyzer');
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg text-center"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
      >
        {hasWon &&
          <div>
            <Confetti/>
            <h2 className="text-2xl font-bold">🎉 You Won! 🎉</h2>
            <p className="text-gray-600 mt-2">Great job guessing the word!</p>
            <p>You correctly guessed the word:</p>
            <p className="font-black text-green-500 text-xl">{wordToGuess}</p>
            <p>You have won the game {winCount} out of {lossCount+winCount} times!</p>
          </div>}

          {hasLost &&
          <div>
            <h2 className="text-2xl font-bold">🍅 You Lost! 🍅</h2>
            <p className="text-gray-600 mt-2">Try again, you'll get it next time!</p>
            <p>The correct word was: </p>
            <p className="font-black text-red-500 text-xl">{wordToGuess}</p>
            <p>You have won the game {winCount} out of {lossCount+winCount} times!</p>
          </div>}

        <button
          className="m-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          Play Again
        </button>

        <button
          className="m-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={handleRedirect}
        >Analyze Game</button>
      </motion.div>
    </motion.div>
  );
}
