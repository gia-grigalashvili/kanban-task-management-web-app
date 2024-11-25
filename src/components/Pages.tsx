import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// In Pages.tsx
type Column = {
  name: string;
  color?: string;
  tasks: {
    title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }[];
};

type Board = {
  name: string;
  columns: Column[];
};

interface Subtask {
  isCompleted: boolean;
}
interface PagesProps {
  boards: Board[]; // An array of `Board` objects
  activeBoard: Board | null; // `activeBoard` can be `null` if no board is selected
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

export default function Pages({
  boards,
  activeBoard,

  setBoards,
}: PagesProps) {
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [editedColumns, setEditedColumns] = useState<Column[]>([]);
  const [activeTask, setActiveTask] = useState<{
    columnIndex: number;
    taskIndex: number;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeBoard) {
      setNewBoardName(activeBoard.name || "");
      setEditedColumns(
        activeBoard?.columns.map((column: Column) => ({ ...column })) || []
      );
    }
  }, [activeBoard]);

  const toggleModal = () => setShowModal(!showModal);

  const addNewColumn = () => {
    setEditedColumns([...editedColumns, { name: "", color: "", tasks: [] }]);
  };

  const deleteColumn = (index: number) => {
    const updatedColumns = editedColumns.filter((_, i) => i !== index);
    setEditedColumns(updatedColumns);
  };

  const handleSave = () => {
    const updatedColumns = editedColumns.map((column, index) => ({
      ...column,
      name: column.name.trim(),
      color: column.color || getRandomColor(index),
    }));

    const updatedBoard = {
      ...activeBoard,
      name: newBoardName.trim(),
      columns: updatedColumns,
    };
    if (!activeBoard) {
      return;
    }
    const updatedBoards = boards.map((board) =>
      board.name === activeBoard.name ? updatedBoard : board
    );
    setBoards(updatedBoards);
    navigate(`/${newBoardName}`);
    toggleModal();
  };

  const handleColumnNameChange = (index: number, value: string): void => {
    const updatedColumns = [...editedColumns];
    updatedColumns[index].name = value;
    setEditedColumns(updatedColumns);
  };

  const getRandomColor = (index: number): string => {
    const predefinedColors = ["#49C4E5", "#67E2AE", "#8471F2"];
    return (
      predefinedColors[index] ||
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );
  };

  const handleTaskClick = (columnIndex: number, taskIndex: number) => {
    setActiveTask({ columnIndex, taskIndex });
  };

  const toggleSubtaskCompletion = (subtaskIndex: number) => {
    if (activeTask) {
      const { columnIndex, taskIndex } = activeTask;
      const updatedColumns = [...editedColumns];
      const updatedTask = { ...updatedColumns[columnIndex].tasks[taskIndex] };
      updatedTask.subtasks[subtaskIndex].isCompleted =
        !updatedTask.subtasks[subtaskIndex].isCompleted;
      updatedColumns[columnIndex].tasks[taskIndex] = updatedTask;
      setEditedColumns(updatedColumns);
    }
  };

  return (
    <div className="flex">
      <div className="p-[20px] flex  gap-[30px] overflow-auto">
        <div className="flex  flex-col gap-[20px]">
          <h2 className=" font-bold text-lg text-gray-800 ">
            {activeBoard?.name || "Board Not Found"}
          </h2>
          <div className="flex gap-[24px]">
            {Array.isArray(activeBoard?.columns) &&
            activeBoard.columns.length > 0 ? (
              activeBoard?.columns.map(
                (column: Column, columnIndex: number) => (
                  <div key={columnIndex} className="column">
                    <div className="flex items-center  w-[200px]  gap-[20px]">
                      <div
                        className="w-[15px] h-[15px] rounded-[50%]"
                        style={{
                          backgroundColor:
                            column.color || getRandomColor(columnIndex),
                        }}
                      ></div>
                      <h2 className="font-semibold text-lg">
                        {column.name} ({column.tasks?.length || 0})
                      </h2>
                    </div>
                    <div className="tasks mt-[20px]">
                      {Array.isArray(column.tasks) &&
                      column.tasks.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                          {column.tasks.map((task, taskIndex) => (
                            <li
                              key={taskIndex}
                              className="task w-[250px] bg-white shadow-md sm:w-[300px] p-[20px] rounded-[5px] cursor-pointer hover:bg-[#4d01c9c6] "
                              onClick={() =>
                                handleTaskClick(columnIndex, taskIndex)
                              }
                            >
                              <p className="font-bold">{task.title}</p>
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
                )
              )
            ) : (
              <p className="text-gray-500">No columns available</p>
            )}
          </div>
        </div>

        <div className="w-auto p-[20px] rounded-[4px] flex items-center bg-[#dadada4b]">
          <button
            onClick={toggleModal}
            className=" font-extrabold text-[#808080] p-2 text-[20px] rounded"
          >
            + New column
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" modal-content bg-white p-6 rounded shadow-lg  sm:w-[500px] w-[350px]">
            <h1 className="text-lg font-bold mb-4">Edit Board</h1>
            <div className="mb-4">
              <label className="block text-gray-700">Board Name:</label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>
            <div>
              <h2 className="text-gray-700 mb-2">Board Columns:</h2>
              {editedColumns.map((column, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={column.name}
                    onChange={(e) =>
                      handleColumnNameChange(index, e.target.value)
                    }
                    className="border rounded w-full p-2"
                    placeholder="Enter column name"
                  />
                  <button
                    onClick={() => deleteColumn(index)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={addNewColumn}
                className="bg-[#5737e2] text-white rounded p-2 mt-2"
              >
                + Add New Column
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-gray-700 rounded p-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white rounded p-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTask && (
        <div
          onClick={() => setActiveTask(null)}
          className="task-details fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded shadow-lg  sm:w-[500px]   w-[350px]"
          >
            <h2 className="font-bold text-xl">
              Task:{" "}
              {
                activeBoard?.columns[activeTask.columnIndex].tasks[
                  activeTask.taskIndex
                ].title
              }
            </h2>
            <p className="text-gray-600 mb-4">
              Current Column:{" "}
              {activeBoard?.columns[activeTask.columnIndex].name}
            </p>
            <p className="text-gray-600 mb-4">
              Total Columns: {activeBoard?.columns.length}
            </p>

            {/* Dropdown to select a column */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Move Task to:
              </label>
              <select
                className="border rounded w-full p-2"
                value={activeTask.columnIndex}
                onChange={(e) => {
                  const newColumnIndex = parseInt(e.target.value, 10);
                  if (newColumnIndex !== activeTask.columnIndex) {
                    const updatedColumns = [...editedColumns];

                    const taskToMove = updatedColumns[
                      activeTask.columnIndex
                    ].tasks.splice(activeTask.taskIndex, 1)[0];

                    updatedColumns[newColumnIndex].tasks.push(taskToMove);

                    setEditedColumns(updatedColumns);
                  }
                }}
              >
                {activeBoard?.columns.map((column: Column, index: number) => (
                  <option key={index} value={index}>
                    {column.name}
                  </option>
                ))}
              </select>
            </div>

            <ul className="mt-[20px] flex flex-col gap-[10px]">
              <p className="text-sm text-gray-600">
                {
                  activeBoard?.columns[activeTask.columnIndex].tasks[
                    activeTask.taskIndex
                  ].subtasks.filter((sub: Subtask) => sub.isCompleted).length
                }{" "}
                of{" "}
                {
                  activeBoard?.columns[activeTask.columnIndex].tasks[
                    activeTask.taskIndex
                  ].subtasks.length
                }{" "}
                subtasks completed
              </p>

              {activeBoard?.columns[activeTask.columnIndex].tasks[
                activeTask.taskIndex
              ].subtasks.map((subtask, subtaskIndex) => (
                <li
                  key={subtaskIndex}
                  className={`subtask flex items-center gap-2 p-[15px] rounded-[3px] ${
                    subtask.isCompleted ? "bg-green-400" : "bg-red-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={subtask.isCompleted}
                    onChange={() => toggleSubtaskCompletion(subtaskIndex)}
                  />
                  <span>{subtask.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
