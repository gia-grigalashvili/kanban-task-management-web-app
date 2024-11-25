import { useParams } from "react-router";
import { useState } from "react";
// Make sure you import useTheme
import Header from "../components/Header";
import Pages from "../components/Pages";
import data from "../data.json";

import ThemeProvider from "../contexts/ThemeContext";

export default function Layout() {
  const [boards, setBoards] = useState(data.boards);

  const boardname = useParams().boardname;
  const activeBoard = boards.find((board) => board.name === boardname) || null;

  return (
    <ThemeProvider>
      <Header activeBoard={activeBoard} boards={boards} setBoards={setBoards} />

      <main>
        {activeBoard ? (
          <Pages
            activeBoard={activeBoard}
            setBoards={setBoards}
            boards={boards}
          />
        ) : (
          <h1 className="p-8 text-center">Please choose a platform</h1>
        )}
      </main>
    </ThemeProvider>
  );
}
