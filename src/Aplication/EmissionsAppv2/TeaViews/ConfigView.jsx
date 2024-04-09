import { useState } from "react";
import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import { emissionsUnits, flowUnits } from "../conversions";
import { ComponentSelector } from "./ComponentsSelector";
import { Button, Tooltip } from "react-bootstrap";

const ConfigView = ({ flowUnit, emissionsUnit, handleChange }) => {
  const composition = [
    "C1",
    "C2",
    "C3",
    "I-C4",
    "C4",
    "N-C5",
    "I-C5",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "CO2",
    "N2",
    "H2O",
  ];
  const initiallySelected = [
    "C1",
    "C2",
    "C3",
    "I-C4",
    "C4",
    "N-C5",
    "I-C5",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "CO2",
    "N2",
    "H2O",
  ];

  const [aditional1, setAditional1] = useState("");
  const [aditional2, setAditional2] = useState("");
  const [aditional3, setAditional3] = useState("");
  const [model, setModel] = useState("West");

  const [wind, setWind] = useState(4);
  const [diameter, setDiameter] = useState(8.1);

  const handleSelect = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
  };
  return (
    <CustomGrid cols={2} rows={1} className={"TeaView"}>
      <GridElement cols={1} rows={1} className="grid-cell-white vert">
        <h4>Tea Components</h4>
        <ComponentSelector
          options={composition}
          onSelect={handleSelect}
          initiallySelected={initiallySelected}
        />
        <h5>Extra Components</h5>
        <div
          style={{
            display: "flex",
            gap: "5px",
            marginTop: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Component 1 name:
          <input
            value={aditional1}
            onChange={(event) => setAditional1(event.target.value)}
            name="AC1"
            placeholder="component name"
          />
          gwp:
          <input
            value={aditional1}
            onChange={(event) => setAditional1(event.target.value)}
            name="AC1"
            placeholder="gwp value"
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            marginTop: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Component 2 name:
          <input
            value={aditional2}
            onChange={(event) => setAditional2(event.target.value)}
            name="AC1"
            placeholder="component name"
          />
          gwp:
          <input
            value={aditional1}
            onChange={(event) => setAditional1(event.target.value)}
            name="AC1"
            placeholder="gwp value"
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            marginTop: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Component 3 name:
          <input
            value={aditional3}
            onChange={(event) => setAditional3(event.target.value)}
            name="AC1"
            placeholder="component name"
          />
          gwp:
          <input
            value={aditional1}
            onChange={(event) => setAditional1(event.target.value)}
            name="AC1"
            placeholder="gwp value"
          />
        </div>
      </GridElement>

      <GridElement className="grid-cell-white vert">
        <h4>Properties</h4>
        <div>
          Wind Speed (m/s):
          <input
            value={wind}
            onChange={(event) => setWind(event.target.value)}
            name="AC1"
          />
          <p style={{ font: "small-caption" }}>0 if dynamic</p>
        </div>
        <div>
          Tea Diameter (ft):
          <input
            value={diameter}
            onChange={(event) => setDiameter(event.target.value)}
            name="AC1"
          />
        </div>
        <Button style={{ marginTop: "1rem" }}>Apply</Button>
      </GridElement>
    </CustomGrid>
  );
};

export default ConfigView;
