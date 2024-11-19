import React, { useState } from "react";

export default function Pages({ boardName, columns }) {
  const [currentBoardName, setCurrentBoardName] = useState(boardName || "");
  const [currentColumns, setCurrentColumns] = useState(columns || []);
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState(currentBoardName);
  const [newColumns, setNewColumns] = useState([...currentColumns]);

  const toggleModal = () => {
    setNewBoardName(currentBoardName);
    setNewColumns([...currentColumns]);
    setShowModal(!showModal);
  };

  const handleColumnChange = (index, value) => {
    const updatedColumns = [...newColumns];
    updatedColumns[index].name = value;
    setNewColumns(updatedColumns);
  };

  const addNewColumn = () => {
    setNewColumns([...newColumns, { name: "", tasks: [] }]);
  };

  const deleteColumn = (index) => {
    const updatedColumns = newColumns.filter((_, i) => i !== index);
    setNewColumns(updatedColumns);
  };

  const handleSave = () => {
    setCurrentBoardName(newBoardName);
    setCurrentColumns(newColumns);
    toggleModal();
  };

  return (
    <div className="flex">
      <div className="p-[20px] flex flex-col overflow-auto">
        <h1 className="text-xl font-medium mb-4">
          {currentBoardName || "Board not found"}
        </h1>
        <div className="flex h-[100%] gap-[24px]">
          {Array.isArray(currentColumns) && currentColumns.length > 0 ? (
            currentColumns.map((column, columnIndex) => (
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
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add/Edit Board
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white border rounded shadow-lg w-[400px] p-6">
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
              {newColumns.map((column, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={column.name}
                    onChange={(e) => handleColumnChange(index, e.target.value)}
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
                className="bg-blue-500 text-white rounded p-2 mt-2"
              >
                Add Column
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
    </div>
  );
}
