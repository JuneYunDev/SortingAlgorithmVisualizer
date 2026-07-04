import { useState } from "react";
import "./App.css";

const App = () => {
  //States
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(25);
  const [algorithm, setAlgorithm] = useState(false);

  //Event Handlers
  const generateArray = () => {
    const size = Number(arraySize);

    if (size < 1 || size > 100) {
      alert("Please enter a number from 1 to 100.");
      return;
    }

    const newArray = [];

    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      newArray.push(randomNumber);
    }

    setArray(newArray);
  };

  const startSorting = () => {
    console.log("Start Sorting");
  };

  //HTML
  return (
    <main className="app">
      <h1>Sorting Algorithm Visualizer</h1>
    </main>
  );
};
export default App;
