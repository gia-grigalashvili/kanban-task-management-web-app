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
  selectedBoard?: Board | undefined;
};

type CompletedCounts = {
  [key: string]: {
    completed: number;
    total: number;
  };
};

export default function Pages({ selectedBoard }: PagesProps) {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [completedCounts, setCompletedCounts] = useState<CompletedCounts>({});
  const [showHiGia, setShowHiGia] = useState<boolean>(false); // New state for showing "Hi Gia" div

  useEffect(() => {
    if (selectedBoard && selectedBoard.columns) {
      const counts: CompletedCounts = {};

      selectedBoard.columns.forEach((column, columnIndex) => {
        column.tasks.forEach((task, taskIndex) => {
          const completedSubtasks = task.subtasks.filter(
            (subtask) => subtask.isCompleted
          ).length;
          counts[`${columnIndex}-${taskIndex}`] = {
            completed: completedSubtasks,
            total: task.subtasks.length,
          };
        });
      });

      setCompletedCounts(counts);
    }
  }, [selectedBoard]);

  if (!selectedBoard) {
    return <div>Please select a board to see its columns.</div>;
  }

  const { name, columns } = selectedBoard;

  const handleAddNewColumn = () => {
    setShowMessage(true);
    setShowHiGia(false); // Hide "Hi Gia" modal when new column modal appears
  };

  const handleShowHiGia = () => {
    setShowHiGia(true);
    setShowMessage(false); // Hide new column modal when "Hi Gia" modal appears
  };

  return (
    <div className="p-[20px] flex flex-col overflow-auto">
      <h1 className="text-xl font-medium mb-4">{name}</h1>

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
                    {column.tasks.map((task, taskIndex) => {
                      const taskKey = `${columnIndex}-${taskIndex}`;
                      const { completed, total } = completedCounts[taskKey] || {
                        completed: 0,
                        total: 0,
                      };

                      return (
                        <li
                          key={taskIndex}
                          className="w-[280px] flex flex-col font-bold rounded-[8px] bg-[#FFFFFF] text-black p-[20px] shadow-md"
                        >
                          <p>{task.title}</p>
                          <p className="text-sm text-gray-600">
                            {completed} of {total} subtasks completed
                          </p>
                        </li>
                      );
                    })}
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
              onClick={handleAddNewColumn}
              className="bg-blue-500 text-white p-[10px] rounded-[30px]"
            >
              + Add New Column
            </button>
          </div>
        )}

        <div className="p-[20px] flex rounded-[10px] justify-center items-center bg-green-200">
          <button
            onClick={handleShowHiGia}
            className="text-[25px] text-[#828FA3]"
          >
            + New Column
          </button>
        </div>
      </div>
    </div>
  );
}
