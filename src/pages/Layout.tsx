import { useParams } from "react-router";
import { useState } from "react";
import Header from "../components/Header";
import Pages from "../components/Pages";
import data from "../data.json";

export default function Layout() {
  const [boards, setBoards] = useState(data.boards);

  const boardname = useParams().boardname; // Get current board name
  const activeBoard = boards.find((board) => board.name === boardname);

  return (
    <div>
      <Header boards={boards} setBoards={setBoards} />
      <main>
        {activeBoard ? (
          <Pages setBoards={setBoards} boards={boards} />
        ) : (
          <h1 className="p-8 text-center">Please choose a platform</h1>
        )}
      </main>
    </div>
  );
}
