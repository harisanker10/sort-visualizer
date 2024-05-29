import { useState } from "react";
import sleep from "../utils/sleep";
import { SortMethods } from "../types/sortMethods";

export default function useSortVisualizer({
  arr,
  delay,
  method,
}: {
  arr: number[];
  delay: number;
  method: SortMethods;
}) {
  const [comparingIndices, setComparingIndices] = useState<
    [null | number, null | number]
  >([null, null]);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [nums, setNums] = useState([...arr]);
  let sort;

  const bubbleSort = async () => {
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = 0; j < nums.length - 1 - i; j++) {
        setComparingIndices([j, j + 1]);
        setComparisons((prev) => prev + 1);
        await sleep(delay);
        if (nums[j] > nums[j + 1]) {
          const temp = nums[j];
          nums[j] = nums[j + 1];
          nums[j + 1] = temp;
          setSwaps((prev) => prev + 1);
          await sleep(delay);
          setNums([...nums]);
        }
      }
    }
    setComparingIndices([null, null]);
  };
  const selectionSort = async (arr: number[]) => {
    const nums = [...arr];
    let k, j;

    for (let i = 0; i < nums.length; i++) {
      k = i;
      j = i + 1;

      while (j < nums.length) {
        setComparingIndices([j, k]);
        await sleep(delay);
        if (nums[j] < nums[k]) k = j;
        j++;
      }
      const temp = nums[i];
      nums[i] = nums[k];
      nums[k] = temp;
      setNums([...nums]);
      await sleep(delay);
    }
    setComparingIndices([null, null]);
  };

  const insertionSort = async (arr: number[]) => {
    const nums = [...arr];
    for (let i = 1; i < nums.length; i++) {
      let j = i;
      setComparisons((prev) => prev + 1);
      while (j > 0 && nums[j - 1] > nums[j]) {
        setComparisons((prev) => prev + 1);
        setComparingIndices([j, j - 1]);
        await sleep(delay);
        const temp = nums[j - 1];
        nums[j - 1] = nums[j];
        nums[j] = temp;
        setSwaps((prev) => prev + 1);
        j--;
        setNums([...nums]);
        await sleep(delay);
      }
    }
    setComparingIndices([null, null]);
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
      break;
  }

  return [sort, { comparingIndices, swaps, nums, comparisons }];
}
