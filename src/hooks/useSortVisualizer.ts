import { useEffect, useRef, useState } from "react";
import sleep from "../utils/sleep";
import { SortMethods } from "../types/sortMethods";

export default function useSortVisualizer({
  arr,
  delayRef,
  method,
}: {
  arr: number[];
  delayRef: React.MutableRefObject<number>;
  method: SortMethods;
}) {
  const [comparingIndices, setComparingIndices] = useState<
    [null | number, null | number]
  >([null, null]);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [nums, setNums] = useState([...arr]);
  const [isSorting, setIsSorting] = useState(false);
  const stopped = useRef(false);
  useEffect(() => {
    setNums([...arr]);
  }, [arr]);
  let sort;

  const bubbleSort = async () => {
    setIsSorting(true);
    stopped.current = false;
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = 0; j < nums.length - 1 - i; j++) {
        if (stopped.current) {
          setComparingIndices([null, null]);
          return;
        }
        setComparingIndices([j, j + 1]);
        setComparisons((prev) => prev + 1);
        await sleep(delayRef.current);
        if (nums[j] > nums[j + 1]) {
          const temp = nums[j];
          nums[j] = nums[j + 1];
          nums[j + 1] = temp;
          setSwaps((prev) => prev + 1);
          await sleep(delayRef.current);
          setNums([...nums]);
        }
      }
    }
    setIsSorting(false);
    setComparingIndices([null, null]);
  };
  const selectionSort = async () => {
    setIsSorting(true);
    stopped.current = false;
    const nums = [...arr];
    let k, j;

    for (let i = 0; i < nums.length; i++) {
      k = i;
      j = i + 1;

      while (j < nums.length) {
        if (stopped.current) {
          setComparingIndices([null, null]);
          return;
        }
        setComparingIndices([j, k]);
        setComparisons((prev) => prev + 1);
        await sleep(delayRef.current);
        if (nums[j] < nums[k]) k = j;
        j++;
      }
      const temp = nums[i];
      nums[i] = nums[k];
      nums[k] = temp;
      setSwaps((prev) => prev + 1);
      setNums([...nums]);
      await sleep(delayRef.current);
    }
    setIsSorting(false);
    setComparingIndices([null, null]);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    stopped.current = false;
    const nums = [...arr];
    for (let i = 1; i < nums.length; i++) {
      let j = i;
      setComparisons((prev) => prev + 1);
      while (j > 0 && nums[j - 1] > nums[j]) {
        if (stopped.current) {
          setComparingIndices([null, null]);
          return;
        }
        setComparisons((prev) => prev + 1);
        setComparingIndices([j, j - 1]);
        await sleep(delayRef.current);
        const temp = nums[j - 1];
        nums[j - 1] = nums[j];
        nums[j] = temp;
        setSwaps((prev) => prev + 1);
        j--;
        setNums([...nums]);
        await sleep(delayRef.current);
      }
    }
    setIsSorting(false);
    setComparingIndices([null, null]);
  };

  const stop = () => {
    stopped.current = true;
    setIsSorting(false);
  };

  const clearStats = () => {
    setComparisons(0);
    setSwaps(0);
  };

  switch (method) {
    case "bubble-sort": {
      sort = bubbleSort;
      break;
    }

    case "selection-sort": {
      sort = selectionSort;
      break;
    }

    case "insertion-sort": {
      sort = insertionSort;
      break;
    }

    default:
      throw new Error("Invalid sort method");
  }

  return [
    sort,
    { comparingIndices, swaps, stop, nums, comparisons, isSorting, clearStats },
  ] as const;
}
