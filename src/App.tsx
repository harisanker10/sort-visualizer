import { ChangeEvent, useRef, useState } from "react";
import BarContainer from "./components/BarContainer";
import useSortVisualizer from "./sortingHooks/useSortVisualizer";
import { SortMethods } from "./types/sortMethods";
import VerticalDivider from "./components/VerticalDivider";

function App() {
  const [barNum] = useState<number>(30);
  const [sortMethod, setSortMethod] = useState<SortMethods>("bubble-sort");
  const delay = useRef(69);
  const [timeDelay, setTimeDelay] = useState(delay.current);
  const [randomNums, setRandomNums] = useState(
    Array.from({ length: barNum }, () => Math.floor(Math.random() * 100) + 1),
  );

  const [
    sort,
    { comparingIndices, stop, isSorting, swaps, nums, comparisons, clearStats },
  ] = useSortVisualizer({
    method: sortMethod,
    delayRef: delay,
    arr: randomNums,
  });

  const shuffle = () => {
    const arr = Array.from(
      { length: barNum },
      () => Math.floor(Math.random() * 100) + 1,
    );
    setRandomNums(arr);
  };

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
      <div className="w-screen h-screen bg-gray-950 flex flex-col gap-10 justify-center items-center">
        <div className="w-3/4 gap-3 text-white text-xl bg-gray-900 rounded-lg h-40 flex items-center justify-between px-16">
          <button
            type="button"
            className="text-blue-800 hover:text-white border border-blue-700 hover:bg-blue-800 flex items-center content-center gap-2 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-blue-500 disabled:opacity-30"
            onClick={shuffle}
            {...{ disabled: isSorting }}
          >
            Shuffle
            <svg
              className="w-4 h-4 text-blue-800 fill-blue-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />
            </svg>
          </button>

          <VerticalDivider />

          <div className="flex gap-2">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handleMethodChange(e)}
            >
              <option value="bubble-sort">Bubble sort</option>
              <option value="selection-sort">Selection sort</option>
              <option value="insertion-sort">Insertion sort</option>
            </select>

            <button
              type="button"
              className={`text-white ${isSorting ? " bg-red-600 hover:bg-red-800 " : " bg-blue-700 hover:bg-blue-800 "} w-20  font-bold rounded-lg text-sm px-5 py-2.5  focus:outline-none `}
              onClick={() => {
                if (isSorting) {
                  stop();
                } else {
                  sort();
                }
              }}
            >
              {isSorting ? "Stop" : "Sort"}
            </button>
          </div>
          <VerticalDivider />
          <div className="flex gap-1 items-center justify-center">
            <table className="table-auto w-full">
              <tbody>
                <tr className="">
                  <td className=" px-4 py-2">Swaps</td>
                  <td className=" px-4 py-2 w-20">{swaps}</td>
                </tr>

                <hr className="h-px w-full  bg-gray-200 border-0 dark:bg-gray-700" />

                <tr>
                  <td className=" px-4 py-2">Comparisons</td>
                  <td className=" px-4 py-2 w-20">{comparisons}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              onClick={clearStats}
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Clear
            </button>
          </div>
          <VerticalDivider />
          <div className="w-80 px-10 ">
            <label
              htmlFor="default-range"
              className="block  text-lg font-medium text-gray-900 dark:text-white"
            >
              <tr className="">
                <td className=" px-4 ">Delay</td>
                <td className=" px-4  w-20">{timeDelay}ms</td>
              </tr>
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
