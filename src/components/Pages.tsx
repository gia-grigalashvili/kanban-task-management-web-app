import { useState, useEffect } from "react";

type Subtask = {
  title: string;
  isCompleted: boolean;
};

type Task = {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

type Column = {
  name: string;
  tasks: Task[];
};

type Board = {
  name: string;
  columns: Column[];
};

type PagesProps = {
  selectedBoard?: Board;
  boards: Board[]; // Add boards as a prop
  setSelectedBoard?: (board: Board) => void;
};

type CompletedCounts = {
  [key: string]: {
    completed: number;
    total: number;
  };
};

export default function Pages({
  selectedBoard,
  boards,
  setSelectedBoard,
}: PagesProps) {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [completedCounts, setCompletedCounts] = useState<CompletedCounts>({});
  const [showHiGia, setShowHiGia] = useState<boolean>(false);
  const [columnsState, setColumnsState] = useState<string[]>([]);
  const [newBoardName, setNewBoardName] = useState<string>("");
  const [edittex, setedittex] = useState<string>("");
  useEffect(() => {
    if (showHiGia && selectedBoard) {
      setColumnsState(selectedBoard.columns.map((column) => column.name));
      setNewBoardName(selectedBoard.name);
    }
  }, [showHiGia, selectedBoard]);
  const handleAddColumn = () => {
    setColumnsState([...columnsState, ""]);
  };
  const handleDeleteColumn = (index: number) => {
    const updatedColumns = columnsState.filter((_, i) => i !== index);
    setColumnsState(updatedColumns);
  };
  if (!selectedBoard) {
    return <div>Please select a board to see its columns.</div>;
  }

  const { name, columns } = selectedBoard;

  const handleShowHiGia = () => {
    setShowHiGia(true);
    setShowMessage(false);
  };

  const handleClothe = () => {
    if (setSelectedBoard && selectedBoard) {
      // Filter out empty column names and map updated names
      const updatedColumns = columnsState
        .filter((name) => name.trim() !== "")
        .map((name) => {
          const existingColumn = selectedBoard.columns.find(
            (col) => col.name === name
          );
          return {
            name,
            tasks: existingColumn ? existingColumn.tasks : [], // Retain tasks for existing columns
          };
        });

      // Update the board with the new name and columns
      const updatedBoard = {
        ...selectedBoard,
        name: newBoardName.trim() || selectedBoard.name, // Use the typed name or keep the current name
        columns: updatedColumns,
      };

      // Update the selected board
      setSelectedBoard(updatedBoard);
    }

    // Close the modal
    setShowHiGia(false);
  };

  if (!selectedBoard) {
    return <div>Please select a board to see its columns.</div>;
  }

  return (
    <div className="p-[20px] flex flex-col overflow-auto">
      <h1 className="text-xl font-medium mb-4">{selectedBoard.name}</h1>
      <div className="flex h-[100%] gap-[24px]">
        {Array.isArray(columns) && columns.length > 0 ? (
          columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              <div className="flex gap-[20px] justify-center items-center">
                <div
                  className="w-[15px] h-[15px] rounded-[50%]"
                  style={{
                    backgroundColor:
                      column.name.toLowerCase() === "todo"
                        ? "#49C4E5"
                        : column.name.toLowerCase() === "done"
                        ? "#67E2AE"
                        : column.name.toLowerCase() === "doing"
                        ? "#8471F2"
                        : "#5a2d2d",
                  }}
                ></div>
                <h2 className="font-semibold text-lg">
                  {column.name} ({column.tasks?.length || 0})
                </h2>
              </div>

              <div className="mt-[20px]">
                {Array.isArray(column.tasks) && column.tasks.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {column.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="w-[280px] flex flex-col font-bold rounded-[8px] bg-[#FFFFFF] text-black p-[20px] shadow-md"
                      >
                        <p>{task.title}</p>
                        <p className="text-sm text-gray-600">
                          {
                            task.subtasks.filter((sub) => sub.isCompleted)
                              .length
                          }{" "}
                          of {task.subtasks.length} subtasks completed
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No tasks available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex mt-[100px] justify-center items-center h-full flex-col">
            <h1>This board is empty. Create a new column to get started.</h1>
            <button
              onClick={handleShowHiGia}
              className="bg-blue-500 text-white p-[10px] rounded-[30px]"
            >
              + Add New Column
            </button>
          </div>
        )}

        {Array.isArray(columns) && columns.length > 0 && (
          <div className="p-[20px] flex rounded-[10px] justify-center items-center bg-green-200">
            <button
              onClick={handleShowHiGia}
              className="text-[25px] text-[#828FA3]"
            >
              + New Column
            </button>
          </div>
        )}
      </div>
      {showHiGia && (
        <div className="fixed inset-0 flex justify-center items-center z-30 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="bg-[#2B2C37] p-[24px] max-w-[420px] w-[300px] gap-[15px] flex flex-col bg-gray-100 shadow-lg rounded-md max-h-[340px] overflow-y-auto">
              <h1>Edit Board</h1>
              <div>
                <h1>Board Name</h1>
                <input
                  type="text"
                  placeholder="Board Name"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <h1>Board Columns</h1>
                {columnsState.map((column, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={column}
                      onChange={(e) => {
                        const newColumns = [...columnsState];
                        newColumns[index] = e.target.value;
                        setColumnsState(newColumns);
                      }}
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      onClick={() => handleDeleteColumn(index)}
                      className="text-[20px] text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddColumn}
                className="bg-gray-200 text-sm px-2 py-1 rounded mt-2"
              >
                + Add New Column
              </button>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleClothe}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  clothe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
