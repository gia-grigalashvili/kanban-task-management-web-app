import React, { useState } from "react";
import Header from "./components/Header"; // Adjust the path as necessary
import Pages from "./components/Pages"; // Adjust the path as necessary

export default function App() {
  const [selectedBoard, setSelectedBoard] = useState(null);

  return (
    <div>
      <Header onSelectBoard={setSelectedBoard} />
      <Pages selectedBoard={selectedBoard} />
    </div>
  );
}
