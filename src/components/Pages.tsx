import React from "react";
import { useParams } from "react-router-dom";

export default function Pages({ columns, boards }) {
  const { boardName } = useParams();
  const currentBoard = boards.find((board) => board.name === boardName);

  return (
    <div className="flex">
      <div className="p-[20px] flex flex-col overflow-auto">
        {/* Display the board name */}
        <h1 className="text-xl font-medium mb-4">
          {currentBoard ? currentBoard.name : "Board not found"}
        </h1>
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
            <p className="text-gray-500">No columns available</p>
          )}
        </div>
      </div>
      <div>
        <button>Add New</button>
      </div>
    </div>
  );
}
