function BarContainer({
  nums,
  comparingIndices,
}: {
  nums: number[];
  comparingIndices: [number | null, number | null];
}) {
  const generateBars = () => {
    return nums.map((num, i) => (
      <>
        <div
          className={`group justify-center relative bg-sky-700 w-4 md:w-7 flex sm:w-6 lg:w-9 ${comparingIndices.includes(i) ? " bg-yellow-500 " : " bg-sky-700 "}`}
          style={{
            height: `${num}%`,
          }}
        >
          <div key={i} className={`hover:bg-sky-800 `}>
            {
              // <button
              //   data-tooltip-target="tooltip-default"
              //   type="button"
              //   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              // >
              //   Default tooltip
              // </button>
            }
          </div>
          {
            // <button>Click me!</button>
          }
          <span className="pointer-events-none z-50 absolute -top-10 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-900 text-white rounded px-2 py-1">
            {num}
          </span>
        </div>
      </>
    ));
  };
  return (
    <div className="shadow border-b-black w-3/4 h-3/5 flex items-end justify-evenly">
      {generateBars()}
    </div>
  );
}

export default BarContainer;
