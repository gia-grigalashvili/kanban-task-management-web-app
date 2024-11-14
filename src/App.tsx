import React, { useState } from "react";
import Header from "./components/Header"; // Adjust the path as necessary
import Pages from "./components/Pages"; // Adjust the path as necessary
import data from "./data.json";
export default function App() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boards, setBoards] = useState(data.boards);
  return (
    <div>
      <Header
        setBoards={setBoards}
        boards={boards}
        onSelectBoard={setSelectedBoard}
      />
      <Pages boards={boards} selectedBoard={selectedBoard} />
    </div>
  );
}

// import React, { useState } from "react";

// const App = () => {
//   // State for the board data
//   const [boards, setBoards] = useState([
//     {
//       name: "Platform Launch",
//       columns: [
//         // Column data...
//       ],
//     },
//     {
//       name: "Marketing Plan",
//       columns: [
//         // Column data...
//       ],
//     },
//     {
//       name: "Roadmap",
//       columns: [
//         // Column data...
//       ],
//     },
//   ]);

//   // State for the current name to display
//   const [currentName, setCurrentName] = useState(boards[0].name);

//   // State for the input value
//   const [inputValue, setInputValue] = useState("");

//   // Function to handle the button click and update the name
//   const handleUpdateName = () => {
//     setCurrentName(inputValue);
//     setInputValue(""); // Clear the input after setting the name
//   };

//   return (
//     <div>
//       <h1>{currentName}</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Enter new name"
//       />
//       <button onClick={handleUpdateName}>Update Name</button>
//     </div>
//   );
// };

// export default App;
