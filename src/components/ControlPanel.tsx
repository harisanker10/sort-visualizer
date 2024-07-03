import { ChangeEvent } from "react";
import VerticalDivider from "./VerticalDivider";

const ControlPanel = ({
  shuffle,
  timeDelay,
  handleDelayChange,
  isSorting,
  handleMethodChange,
  swaps,
  comparisons,
  clearStats,
  stop,
  sort,
}: {
  shuffle: () => void;
  timeDelay: number;
  handleDelayChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSorting: boolean;
  handleMethodChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  swaps: number;
  comparisons: number;
  clearStats: () => void;
  stop: () => void;
  sort: () => Promise<void>;
}) => {
  return (
    <div className="w-full px-10 lg:w-3/4 gap-3 text-white text-xl bg-gray-900 rounded-lg h-auto lg:h-40 flex flex-col lg:flex-row items-center justify-between p-4 lg:px-16">
      <button
        type="button"
        className="text-blue-800 hover:text-white border border-blue-700 hover:bg-blue-800 items-center justify-center gap-2 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 disabled:bg-gray-600  disabled:hover:bg-gray-600 disabled:hover:text-blue-500 disabled:opacity-30 w-full lg:w-auto mb-2 lg:mb-0 hidden lg:flex"
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

      <VerticalDivider className="hidden lg:flex" />

      <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-auto mb-2 lg:mb-0">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleMethodChange(e)}
        >
          <option value="bubble-sort">Bubble sort</option>
          <option value="selection-sort">Selection sort</option>
          <option value="insertion-sort">Insertion sort</option>
          <option value="quick-sort">Quick sort</option>
        </select>

        <button
          type="button"
          className={`text-white ${isSorting ? " bg-red-600 hover:bg-red-800 " : " bg-blue-700 hover:bg-blue-800 "} font-bold rounded-lg text-sm px-5 py-2.5 focus:outline-none w-full lg:w-auto`}
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

      <VerticalDivider className="hidden lg:flex" />

      <div className="flex flex-col lg:flex-row gap-2 items-center justify-center w-full lg:w-auto mb-2 lg:mb-0">
        <table className="table-auto w-full lg:w-auto">
          <tbody>
            <tr>
              <td className="px-4 py-2 text-sm">Swaps</td>
              <td className="px-4 py-2 text-sm">{swaps}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 text-sm">Comparisons</td>
              <td className="px-4 py-2 text-sm">{comparisons}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-center w-full gap-1">
          <button
            type="button"
            onClick={clearStats}
            className="text-blue-700 hover:text-white border h-full border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 w-1/2 lg:w-auto"
          >
            Clear
          </button>
          <button
            type="button"
            className="text-blue-800 hover:text-white border border-blue-700 hover:bg-blue-800 items-center justify-center gap-2 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-blue-500 disabled:opacity-30 w-1/2 lg:w-auto h-full lg:mb-0 flex lg:hidden"
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
        </div>
      </div>

      <VerticalDivider className="hidden lg:flex" />

      <div className="w-full lg:w-80 lg:px-10">
        <label
          htmlFor="default-range"
          className="block text-lg font-medium text-gray-900 dark:text-white"
        >
          Delay: {timeDelay}ms
        </label>
        <input
          id="default-range"
          type="range"
          min="0"
          max="500"
          onChange={(e) => handleDelayChange(e)}
          value={timeDelay}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </div>
  );
};

export default ControlPanel;
