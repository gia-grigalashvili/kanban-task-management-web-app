import React, { useState } from "react";

export default function Pages({ selectedBoard }) {
  // State to track visibility of the small div
  const [showMessage, setShowMessage] = useState(false);

  if (!selectedBoard) {
    return <div>Please select a board to see its columns.</div>;
  }

  const { name, columns } = selectedBoard;

  // Function to handle the button click
  const handleAddNewColumn = () => {
    setShowMessage(true); // Show the small div with the message
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
      <h1 className="text-xl font-medium mb-4">{name}</h1>

      <div className="flex gap-[24px]">
        {Array.isArray(columns) && columns.length > 0 ? (
          columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              <div className="flex gap-[20px]  justify-center items-center ">
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
                <h2 className="font-semibold mb-4 text-lg">
                  {column.name} ({column.tasks?.length || 0})
                </h2>
              </div>

              <div>
                {Array.isArray(column.tasks) && column.tasks.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {column.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="w-[280px] font-bold rounded-[8px] bg-[#FFFFFF] text-black p-[20px] shadow-md flex items-center"
                      >
                        {task.title}
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
          <div className="flex mt-[100px] justify-center items-center h-full flex justify-center text-center flex-col">
            <h1>This board is empty. Create a new column to get started.</h1>
            <button
              onClick={handleAddNewColumn} // Handle button click
              className="bg-blue-500 text-white p-[10px] rounded-[30px]"
            >
              + Add New Column
            </button>
          </div>
        )}
      </div>

      {/* Conditionally render the small div when showMessage is true */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50">
          <div className="bg-[#FFFFFF] rounded  w-[343px] p-[15px] ">
            <h1>Add New Board</h1>
            <div className="flex flex-col gap-[10px]">
              <h1 className="text-[15px]">Board Name</h1>
              <input
                className="w-[295px] h-[40px] p-[10px] border bg-transparent border-[#828FA340]"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1>Board Columns</h1>
              <div>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
