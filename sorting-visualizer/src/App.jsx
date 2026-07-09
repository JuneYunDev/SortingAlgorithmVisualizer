import { useRef, useState } from "react";
import { algorithmInfo } from "./data/algorithms";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";
import "./App.css";

const App = () => {
  //States
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [speedLabel, setSpeedLabel] = useState("x1");
  const animationSpeedRef = useRef(animationSpeed);
  const currentAlgorithm =
    algorithmInfo[hoveredAlgorithm] ?? algorithmInfo.default;

  //Event Handlers
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const generateArray = () => {
    const size = Number(arraySize);

    if (size < 5 || size > 100) {
      alert("Please enter a number between 5 and 100.");
      return null;
    }

    const newArray = [];

    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;

      newArray.push({
        id: crypto.randomUUID(),
        value: randomNumber,
      });
    }

    setArray(newArray);
    return newArray;
  };

  const startSorting = async (targetArray = array) => {
    if (isSorting) return;

    let animations = [];

    if (algorithm === "Bubble Sort") {
      animations = bubbleSort(targetArray);
    }

    if (algorithm === "Selection Sort") {
      animations = selectionSort(targetArray);
    }

    if (algorithm === "Insertion Sort") {
      animations = insertionSort(targetArray);
    }

    if (algorithm === "Merge Sort") {
      animations = mergeSort(targetArray);
    }

    if (algorithm === "Quick Sort") {
      animations = quickSort(targetArray);
    }

    if (algorithm === "Heap Sort") {
      animations = heapSort(targetArray);
    }

    if (animations.length === 0) return;

    setIsSorting(true);
    setActiveIndices([]);
    setSortedIndices([]);

    for (const step of animations) {
      if (step.type === "compare") {
        setActiveIndices(step.indices);
        await sleep(animationSpeedRef.current);
      }

      if (step.type === "swap") {
        setArray([...step.array]);
        await sleep(animationSpeedRef.current);
      }

      if (step.type === "reset") {
        setActiveIndices([]);
        await sleep(animationSpeedRef.current / 2);
      }

      if (step.type === "sorted") {
        setActiveIndices([]);
        setSortedIndices((prev) => [...prev, step.index]);
        await sleep(animationSpeedRef.current);
      }

      if (step.type === "overwrite") {
        setArray([...step.array]);
        await sleep(animationSpeedRef.current);
      }
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const handleGoClick = () => {
    if (!arraySize || !algorithm) {
      alert("Please enter array size and select a sorting algorithm");
      return;
    }

    const newArray = generateArray();

    if (!newArray) return;

    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentPage("visualizer");
  };

  const speedOptions = [
    { label: "x1", value: 100 },
    { label: "x2", value: 50 },
    { label: "x3", value: 25 },
  ];

  const barWidth = Math.max(10, Math.floor(900 / array.length));

  //HTML
  return (
    <main className="app">
      {currentPage === "home" ? (
        //Home Page
        <section className="home-page">
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

            <section
              className="selected-card"
              style={{
                backgroundColor: currentAlgorithm.color,
              }}
            >
              {currentAlgorithm.image && (
                <img
                  className="algorithm-image"
                  src={currentAlgorithm.image}
                  alt={currentAlgorithm.title}
                />
              )}

              <h2 style={{ whiteSpace: "pre-line" }}>
                {currentAlgorithm.title}
              </h2>
            </section>

            <section className="array-card">
              <h2>Array Size</h2>
              <p>Enter a number between 5 and 100</p>

              <div className="input-row">
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={arraySize}
                  placeholder="Enter array size"
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
      ) : (
        //Visualizer Page
        <section className="visualizer-page">
          <header
            className="visualizer-header"
            style={{ backgroundColor: algorithmInfo[algorithm].color }}
          >
            <button
              className="visualizer-icon-button"
              onClick={() => setCurrentPage("home")}
            >
              ↩
            </button>

            <h1>{algorithm}</h1>

            <button
              className="start-button"
              onClick={() => startSorting(array)}
              disabled={isSorting}
              style={{
                color: currentAlgorithm.color,
              }}
            >
              {isSorting ? "Sorting" : "Start"}
            </button>
          </header>
          <section className="speed-buttons">
            {speedOptions.map((speed) => {
              const selected = speedLabel === speed.label;

              return (
                <button
                  key={speed.label}
                  className="speed-button"
                  style={{
                    backgroundColor: selected
                      ? currentAlgorithm.color
                      : "#ffffff",

                    color: selected ? "#ffffff" : currentAlgorithm.color,
                  }}
                  onClick={() => {
                    setAnimationSpeed(speed.value);
                    setSpeedLabel(speed.label);
                    animationSpeedRef.current = speed.value;
                  }}
                >
                  {speed.label}
                </button>
              );
            })}
          </section>
          <section className="bar-container">
            {array.map((item, index) => {
              const isActive = activeIndices.includes(index);
              const isSorted = sortedIndices.includes(index);

              return (
                <div
                  key={item.id}
                  className={`array-bar ${isActive ? "active" : ""} ${
                    isSorted ? "sorted" : ""
                  }`}
                  style={{
                    height: `${item.value * 5}px`,
                    width: `${barWidth}px`,
                  }}
                >
                  {array.length <= 100 ? item.value : ""}
                </div>
              );
            })}
          </section>
        </section>
      )}
    </main>
  );
};
export default App;
