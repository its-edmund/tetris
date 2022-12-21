import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [player, setPlayer] = useState({
    xp: 0,
  });
  return (
    <div className="h-screen flex items-center justify-center bg-[#131313]">
      <Board />
    </div>
  );
}

export default App;
