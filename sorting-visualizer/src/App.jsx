import { useState } from "react";
import "./App.css";

const App = () => {
  //States
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(25);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);

  //Event Handlers
  const generateArray = () => {
    const size = Number(arraySize);

    if (size < 5 || size > 100) {
      alert("Please enter a number between 5 and 100.");
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
    <main className="home-page">
      <header className="top-bar">
        <button className="icon-button">↩</button>
        <button className="icon-button">☾</button>
      </header>

      <section className="home-content">
        <h1 className="title">
          Sorting
          <br />
          Algorithm
          <br />
          Visualizer
        </h1>

        <section className="array-card">
          <h2>Array Size</h2>
          <p>Enter a number between 5 and 100</p>

          <div className="input-row">
            <input
              type="number"
              min="5"
              max="100"
              value={arraySize}
              onChange={(event) => setArraySize(event.target.value)}
            />
            <button onClick={generateArray}>GO</button>
          </div>
        </section>

        <section className="algorithm-list">
          {[
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Merge Sort",
            "Quick Sort",
            "Heap Sort",
          ].map((name) => (
            <button
              key={name}
              className="algorithm-button"
              onClick={() => setAlgorithm(name)}
            >
              {name}
            </button>
          ))}
        </section>
      </section>
    </main>
  );
};
export default App;
