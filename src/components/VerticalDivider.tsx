const VerticalDivider = ({ className }: { className: string }) => {
  return (
    <div
      className={`flex flex-col h-full items-center justify-center ${className}`}
    >
      <div className="h-3/4 w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
    </div>
  );
};

export default VerticalDivider;
