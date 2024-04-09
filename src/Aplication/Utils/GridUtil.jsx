const GridUtil = ({ children, rows, cols, gap, pd = 0, mg = 0 }) => {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        display: "grid",
        gap: gap,
        width: "100%",
        height: "100%",
        padding: pd,
        margin: mg,
      }}
    >
      {children}
    </div>
  );
};

export default GridUtil;
