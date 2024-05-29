import { ChangeEvent, useRef, useState } from "react";
import BarContainer from "./components/BarContainer";
import useSortVisualizer from "./sortingHooks/useSortVisualizer";
import { SortMethods } from "./types/sortMethods";

function App() {
  const [barNum] = useState<number>(30);
  const [sortMethod, setSortMethod] = useState<SortMethods>("bubble-sort");
  const delay = useRef(69);
  const [timeDelay, setTimeDelay] = useState(delay.current);

  const [sort, { comparingIndices, isSorting, swaps, nums, comparisons }] =
    useSortVisualizer({
      method: sortMethod,
      delayRef: delay,
      arr: Array.from(
        { length: barNum },
        () => Math.floor(Math.random() * 100) + 1,
      ),
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
      <div className="w-screen h-screen bg-gray-950 flex flex-col gap-2 justify-center items-center">
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
            className="px-3 py-1 bg-blue-400 rounded disabled:bg-blue-100 shadow-black "
            onClick={() => {
              sort();
            }}
            {...{ disabled: isSorting }}
          >
            {isSorting ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Sort"
            )}
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
