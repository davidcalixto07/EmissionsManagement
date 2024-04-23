import { Button } from "react-bootstrap";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";

const License = () => {
  return (
    <CustomGrid cols={2} rows={10} className={"Overview-100"}>
      <GridElement
        cols={2}
        rows={1}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h2> LICENSE MANANGER</h2>
      </GridElement>
      <GridElement
        cols={2}
        rows={3}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h2> Remaining days of license </h2>
        <h1> 200 Days </h1>
        <span>
          {" "}
          <Button> Re-new License</Button>{" "}
        </span>
      </GridElement>
    </CustomGrid>
  );
};

export default License;
