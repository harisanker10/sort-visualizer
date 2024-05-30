export default function generateArray(length: number) {
  return Array.from(
    { length: length },
    () => Math.floor(Math.random() * 100) + 1,
  );
}
