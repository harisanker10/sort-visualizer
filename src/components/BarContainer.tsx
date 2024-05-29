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
        className={`w-10 bg-blue-600`}
        style={{
          height: `${num}%`,
          backgroundColor: comparingIndices.includes(i) ? "yellow" : "#2563eb",
        }}
      ></div>
    ));
  };
  return (
    <div className="shadow border-b-black  w-3/4 h-3/4 flex items-end justify-evenly">
      {generateBars()}
    </div>
  );
}

export default BarContainer;
