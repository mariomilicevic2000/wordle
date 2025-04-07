import { useEffect, useState } from "react";

interface TimerProps{
    wordToGuess : string,
    key : number
}

export default function Timer({wordToGuess, key} : TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [wordToGuess]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <p className="text-center text-lg font-mono text-gray-600">
      ⏱️ {formatTime(seconds)}
    </p>
  );
}
