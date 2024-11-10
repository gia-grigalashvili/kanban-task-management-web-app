export default function Pages({ selectedBoard }) {
  if (!selectedBoard) {
    return <div>Please select a board to see its columns.</div>;
  }

  const { name, columns } = selectedBoard;

  return (
    <div className="flex flex-col  h-[calc(100vh-80px)] overflow-y-auto">
      <h1 className="text-xl font-medium mb-4">{name}</h1>

      <div className="flex gap-[24px]">
        {Array.isArray(columns) && columns.length > 0 ? (
          columns.map((column, columnIndex) => (
            <div key={columnIndex} className="">
              <h2 className="font-semibold mb-4 text-lg">
                {column.name} ({column.tasks?.length || 0})
              </h2>

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
            <button className="bg-blue-500  text-white p-[10px] rounded-[30px]">
              + Add New Column
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
