import { useState } from "react";
import { algorithmInfo } from "./data/algorithms";
import { bubbleSort } from "./algorithms/bubbleSort";
import "./App.css";

const App = () => {
  //States
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(25);
  const [algorithm, setAlgorithm] = useState("Bubble sort");
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null);
  const [isSorting, setIsSorting] = useState(false);

  const currentAlgorithm = hoveredAlgorithm
    ? algorithmInfo[hoveredAlgorithm]
    : null;

  //Event Handlers
  const generateArray = () => {
    const size = Number(arraySize);

    if (size < 5 || size > 100) {
      alert("Please enter a number between 5 and 100.");
      return null;
    }

    const newArray = [];

    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      newArray.push(randomNumber);
    }

    setArray(newArray);
    return newArray;
  };

  const startSorting = (targetArray) => {
    if (algorithm !== "Bubble Sort") return;

    const animations = bubbleSort(targetArray);
    console.log("Animations:", animations);
  };

  const handleGoClick = () => {
    const newArray = generateArray();

    if (!newArray) return;

    startSorting(newArray);
  };

  //HTML
  return (
    <main className="home-page">
      <header className="top-bar">
        <button className="icon-button">↩</button>
        <button className="icon-button">☾</button>
      </header>

      <section className="home-content">
        <section className="left-panel">
          <h1 className="title">
            Sorting
            <br />
            Algorithm
            <br />
            Visualizer
          </h1>

          <section
            className="selected-card"
            style={{
              backgroundColor: currentAlgorithm?.color || "#FFD97D",
            }}
          >
            {currentAlgorithm ? (
              <>
                <div className="algorithm-icon">{currentAlgorithm.image}</div>

                <h2>{currentAlgorithm.title}</h2>
              </>
            ) : (
              <>
                <div className="algorithm-icon">⚙️</div>

                <h2>
                  Sorting
                  <br />
                  Algorithm
                </h2>
              </>
            )}
          </section>
        </section>

        <section className="right-panel">
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
              <button onClick={handleGoClick}>GO</button>
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
                className={`algorithm-button ${name
                  .toLowerCase()
                  .replace(" ", "-")} ${algorithm === name ? "active" : ""}`}
                onMouseEnter={() => setHoveredAlgorithm(name)}
                onMouseLeave={() => setHoveredAlgorithm(algorithm)}
                onClick={() => {
                  setAlgorithm(name);
                  setHoveredAlgorithm(name);
                }}
              >
                {name}
              </button>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};
export default App;
