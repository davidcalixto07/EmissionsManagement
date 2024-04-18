import { useState } from "react";
import CustomGrid from "../Utils/CustomGrid";
import GridUtil from "../Utils/GridUtil";
import GridElement from "../Utils/GridElement";
import { ComponentSelector } from "./TeaViews/ComponentsSelector";
import {
  emissionsUnits,
  flowUnits,
  pressureUnits,
  tempUnits,
} from "./conversions";
import { Button } from "react-bootstrap";
import ImageLoader from "./ImageLoader";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

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

const emptyForm = {
  teaId: "",
  teaType: "Tea Alta",
  pressure: "",
  tecnology: "",
  height: "",
  diameter: "",
  segment: "Exploración",
  instalationYear: "",
  estimatedHours: "",
  measureMethod: "Balance",
  measureType: "Coriolis",
  transmitterSerial: "",
  latitude: 3.072371,
  longitude: -75.290777,
  wind: 4,
  teaDiameter: 8.1,
};

const AppConfiguration = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [statusText, setStatusText] = useState("");
  const [aditional1, setAditional1] = useState("");
  const [aditional2, setAditional2] = useState("");
  const [aditional3, setAditional3] = useState("");
  const [model, setModel] = useState("West");

  const [wind, setWind] = useState(4);
  const [diameter, setDiameter] = useState(8.1);

  const handleSelect = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
  };

  const handleChange = (e) => {
    var { name, value } = e.target;

    const parsed_value = parseFloat(value);
    if (!isNaN(parsed_value)) value = parsed_value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const newAsset = {
      name: formData.teaId,
      parentId: "fd95e6ff81fb47c4b7ce46b9d2b885c1",
      location: {
        longitude: formData.longitude,
        latitude: formData.latitude,
      },
      typeId: "colwest2.TeaEmisionesFlowData",
    };

    try {
      const response = await axios.post("/api/assets/CreateAsset", formData);
      console.log("Response:", response.data);
      setStatusText("Created");
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} href="/" className="fullSize">
      <CustomGrid
        cols={5}
        rows={12}
        className={"Overview-100"}
        style={{ justifyContent: "space-between" }}
      >
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Tea ID:</span>
          <input
            type="text"
            name="teaId"
            placeholder="Tea001"
            value={formData.teaId}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Tea Type:</span>
          <select
            name="teaType"
            value={formData.teaType}
            onChange={handleChange}
          >
            <option value="Tea Alta">Tea Alta</option>
            <option value="Tea Baja">Tea Baja</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white vert" cols={1} rows={10}>
          <h4 style={{ margin: "10px" }}>Tea Components</h4>
          <ComponentSelector
            options={composition}
            onSelect={handleSelect}
            initiallySelected={initiallySelected}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>TEA height(ft)</span>
          <input
            type="text"
            name="height"
            placeholder="  30"
            value={formData.height}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Tea Technology:</span>
          <select
            name="tecnology"
            value={formData.tecnology}
            onChange={handleChange}
          >
            <option value="Tea Combinada">Tea Combinada</option>
            <option value="Tea Asistida por aire">Tea Asistida por aire</option>
            <option value="Tea Asistida por vapor">
              Tea Asistida por vapor
            </option>
            <option value="Tea móvil- Temporal">Tea móvil- Temporal</option>
          </select>
        </GridElement>

        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>TEA diameter(ft)</span>
          <input
            type="text"
            name="diameter"
            placeholder="  9.1"
            value={formData.diameter}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Operation segment:</span>
          <select
            name="segment"
            value={formData.segment}
            onChange={handleChange}
          >
            <option value="Exploración">Exploración</option>
            <option value="Producción">Producción</option>
            <option value="Gas planta">Gas planta</option>
          </select>
        </GridElement>

        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Instalation Year</span>
          <input
            type="text"
            name="instalationYear"
            placeholder=" 2024"
            value={formData.instalationYear}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Measure Method:</span>
          <select
            name="measureMethod"
            value={formData.measureMethod}
            onChange={handleChange}
          >
            <option value="Balance">Balance</option>
            <option value="Medidor">Medidor</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Meter Serial:</span>
          <input
            type="text"
            name="transmitterSerial"
            placeholder=" A-00000"
            value={formData.transmitterSerial}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Meter type:</span>
          <select
            name="measureType"
            value={formData.measureType}
            onChange={handleChange}
          >
            <option value="Balance">Coriolis</option>
            <option value="Ultrasonico">Ultrasonico</option>
            <option value="Balance">Daniel's</option>
            <option value="Ultrasonico">Thermal dispersion</option>
            <option value="Balance">Orifice plate</option>
            <option value="Ultrasonico">Vortex</option>
            <option value="Ultrasonico">
              Single Point Insertion Flowmeter
            </option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Wind Speed (m/s): </span>
          <input
            type="text"
            name="WindSpeed"
            placeholder=" 4"
            value={formData.wind}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Operating frequency :</span>
          <select
            name="Operating Frequency"
            value={formData.OperatingFrequency}
            onChange={handleChange}
          >
            <option value="Balance">Continuous</option>
            <option value="Medidor">Intermittent</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Tea Diameter (ft):</span>
          <input
            type="text"
            name="TeaDiameter"
            placeholder=" 8.1"
            value={formData.wind}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Position: Longitude:</span>
          <input
            type="text"
            name="longitude"
            placeholder=""
            value={formData.longitude}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Position: Latitude:</span>
          <input
            type="text"
            name="latitude"
            placeholder=""
            value={formData.latitude}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Estimated Operative Hours in one Year:</span>
          <input
            type="text"
            name="estimatedHours"
            placeholder=" 3500"
            value={formData.estimatedHours}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement rows={4} cols={4}>
          <GridUtil rows={4} cols={4}>
            <GridElement rows={1} cols={4} ns>
              <h5>Extra Components</h5>
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>Component 1 name:</span>
              <input
                value={aditional1}
                onChange={(event) => setAditional1(event.target.value)}
                name="AC1"
                placeholder="component name"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>Gwp:</span>
              <input
                value={aditional1}
                onChange={(event) => setAditional1(event.target.value)}
                name="AC1"
                placeholder="gwp value"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>Component 2 name:</span>
              <input
                value={aditional2}
                onChange={(event) => setAditional2(event.target.value)}
                name="AC1"
                placeholder="component name"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>Gwp:</span>
              <input
                value={aditional1}
                onChange={(event) => setAditional1(event.target.value)}
                name="AC1"
                placeholder="gwp value"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>Component 3 name:</span>
              <input
                value={aditional3}
                onChange={(event) => setAditional3(event.target.value)}
                name="AC1"
                placeholder="component name"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>Gwp:</span>
              <input
                value={aditional1}
                onChange={(event) => setAditional1(event.target.value)}
                name="AC1"
                placeholder="gwp value"
              />
            </GridElement>
          </GridUtil>
        </GridElement>
        <GridElement
          className="grid-cell-white justified"
          rows={2}
          cols={1}
          style={{ justifyContent: "center" }}
        >
          <Button type="submit">Submit</Button>
        </GridElement>
        <h5>{statusText}</h5>
      </CustomGrid>
    </form>
  );
};

export default AppConfiguration;
