import { useRef } from "react";
import LoadingModal from "../../Componentes/Utlities/LoadingModal";

const CustomGrid = ({
  children,
  rows,
  cols,
  gap,
  height,
  bg,
  className,
  loading,
}) => {
  const contRef = useRef(null);
  return (
    <>
      <div
        className={"Main-Content" + (className ? ` ${className}` : "")}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gap: gap,
          height: height,
        }}
        ref={contRef}
      >
        {children}
      </div>
      <LoadingModal show={loading} container={contRef.current} />
    </>
  );
};

export default CustomGrid;
