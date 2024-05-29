import { ChangeEvent, useRef, useState } from "react";
import BarContainer from "./components/BarContainer";
import useSortVisualizer from "./sortingHooks/useSortVisualizer";
import { SortMethods } from "./types/sortMethods";

function App() {
  const [barNum] = useState<number>(30);
  const [sortMethod, setSortMethod] = useState<SortMethods>("bubble-sort");
  const delay = useRef(69);
  const [timeDelay, setTimeDelay] = useState(delay.current);

  const [nums, setNums] = useState<number[]>(
    Array.from({ length: barNum }, () => Math.floor(Math.random() * 100) + 1),
  );

  const [sort, { comparingIndices, swaps, nums, comparisons }] =
    useSortVisualizer({
      method: sortMethod,
      delay: delay.current,
      arr: nums,
    });

  const handleDelayChange = (e: ChangeEvent<HTMLInputElement>) => {
    delay.current = parseInt(e.target.value);
    setTimeDelay(delay.current);
  };

  const handleMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (
      "bubble-sort" === e.target.value ||
      "selection-sort" === e.target.value ||
      "insertion-sort" === e.target.value
    ) {
      setSortMethod(e.target.value);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-800 flex flex-col gap-2 justify-center items-center">
        <div className="w-3/4 gap-3 text-white text-xl border h-20 flex items-center justify-start px-4">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleMethodChange(e)}
          >
            <option value="bubble-sort">Bubble sort</option>
            <option value="selection-sort">Selection sort</option>
            <option value="insertion-sort">Insertion sort</option>
          </select>

          <button
            className="px-3 py-1 bg-blue-400 rounded shadow-black "
            onClick={sort}
          >
            Sort
          </button>
          <div className="min-w-80">
            <div className="">Swaps: {swaps}</div>
            <div className="">Comparisons: {comparisons}</div>
          </div>
          <div className="w-80 px-10 overflow-hidden">
            <label
              htmlFor="default-range"
              className="block  text-lg font-medium text-gray-900 dark:text-white"
            >
              Time delay: {timeDelay}ms
            </label>
            <input
              id="default-range"
              type="range"
              min="0"
              max="500"
              onChange={(e) => handleDelayChange(e)}
              value={delay.current}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
        <BarContainer nums={nums} comparingIndices={comparingIndices} />
      </div>
    </>
  );
}

export default App;
