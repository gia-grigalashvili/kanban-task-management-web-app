import React, { useState } from "react";
import Header from "./components/Header"; // Adjust the path as necessary
import Pages from "./components/Pages"; // Adjust the path as necessary
import data from "./data.json";
export default function App() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boards, setBoards] = useState(data.boards);
  return (
    <div>
      <Header
        setBoards={setBoards}
        boards={boards}
        onSelectBoard={setSelectedBoard}
      />
      <Pages selectedBoard={selectedBoard} />
    </div>
  );
}
