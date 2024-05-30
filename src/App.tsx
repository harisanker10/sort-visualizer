import { ChangeEvent, useEffect, useRef, useState } from "react";
import BarContainer from "./components/BarContainer";
import useSortVisualizer from "./hooks/useSortVisualizer";
import { SortMethods } from "./types/sortMethods";
import ControlPanel from "./components/ControlPanel";
import useWindowWidth from "./hooks/useWindowWidth";
import generateArray from "./utils/generateArray";

function App() {
  const windowWidth = useWindowWidth();
  const [barNum, setBarNum] = useState<number>(windowWidth > 1000 ? 30 : 15);
  const [sortMethod, setSortMethod] = useState<SortMethods>("bubble-sort");
  const delay = useRef(69);
  const [timeDelay, setTimeDelay] = useState(delay.current);
  const [randomNums, setRandomNums] = useState(generateArray(barNum));

  console.log({ windowWidth });

  const [
    sort,
    { comparingIndices, stop, isSorting, swaps, nums, comparisons, clearStats },
  ] = useSortVisualizer({
    method: sortMethod,
    delayRef: delay,
    arr: randomNums,
  });

  useEffect(() => {
    setBarNum(windowWidth > 1000 ? 30 : 15);
    setRandomNums(generateArray(windowWidth > 1000 ? 30 : 15));
  }, [windowWidth]);

  const shuffle = () => {
    setRandomNums(generateArray(barNum));
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
        {windowWidth <= 1000 ? (
          <BarContainer nums={nums} comparingIndices={comparingIndices} />
        ) : null}

        <ControlPanel
          shuffle={shuffle}
          timeDelay={timeDelay}
          stop={stop}
          isSorting={isSorting}
          clearStats={clearStats}
          sort={sort}
          swaps={swaps}
          comparisons={comparisons}
          handleDelayChange={handleDelayChange}
          handleMethodChange={handleMethodChange}
        />
        {windowWidth > 1000 ? (
          <BarContainer nums={nums} comparingIndices={comparingIndices} />
        ) : null}
      </div>
    </>
  );
}

export default App;
