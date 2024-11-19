import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Pages from "./components/Pages";
import data from "./data.json";

export default function App() {
  const [boards, setBoards] = useState(data.boards);

  return (
    <Router>
      <div>
        <Header boards={boards} setBoards={setBoards} />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="p-8 text-center">Please Choose Platform</h1>
            }
          />
          {boards.map((board, index) => (
            <Route
              key={index}
              path={`/board/${board.name}`}
              element={<Pages boardName={board.name} columns={board.columns} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
