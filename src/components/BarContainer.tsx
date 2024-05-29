function BarContainer({
  nums,
  comparingIndices,
}: {
  nums: number[];
  comparingIndices: [number | null, number | null];
}) {
  const generateBars = () => {
    return nums.map((num, i) => (
      <div
        key={i}
        className={`w-10 bg-stone-600 ${comparingIndices.includes(i) ? " bg-yellow-500 " : " bg-sky-700 "}`}
        style={{
          height: `${num}%`,
        }}
      ></div>
    ));
  };
  return (
    <div className="shadow border-b-black w-3/4 h-3/5 flex items-end justify-evenly">
      {generateBars()}
    </div>
  );
}

export default BarContainer;
