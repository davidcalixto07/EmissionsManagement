const GridElement = ({
  children,
  cols = 1,
  rows = 1,
  ns,
  className = "",
  center,
  style = {},
  padding,
}) => {
  const classes = (ns ? "grid-cell-ns " : "grid-cell ") + className;

  style.gridColumn = "span " + cols;
  style.gridRow = "span " + rows;
  style.padding = padding;

  if (center) style.display = "flex";

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default GridElement;
