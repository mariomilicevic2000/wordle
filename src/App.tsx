import Wordle from "./components/Wordle";
import GameAnalyzer from "./components/GameAnalyzer";
import { Routes, Route } from "react-router";

function App() {

  return (
    <Routes>
    <Route path="/" element={<Wordle />} />
    <Route path="/analyzer" element={<GameAnalyzer />} />
  </Routes>
  )
}

export default App;
