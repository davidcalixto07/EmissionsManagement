import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";

const License = () => {
  return (
    <CustomGrid cols={1} rows={4} className={"Overview-100"}>
      <GridElement className="grid-cell-white vert">LICENSE</GridElement>
    </CustomGrid>
  );
};

export default License;
