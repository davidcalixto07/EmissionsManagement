import { useState } from "react";
import CustomGrid from "../Utils/CustomGrid";
import AddComponent from "../../Componentes/Datasources/AddComponent";
import GridElement from "../Utils/GridElement";
import { ComponentSelector } from "./TeaViews/ComponentsSelector";
import { Button } from "react-bootstrap";
import axios from "axios";

const initiallySelected = {
  C1: 85.4305,
  C2: 8.5901,
  C3: 2.7031,
  IC4: 0.1882,
  C4: 0.2777,
  NC5: 0,
  IC5: 0.0359,
  C5: 0.0207,
  C6: 0.0263,
  C7: 0.0048,
  C8: 0.0014,
  C9: 0.0016,
  C10: 0,
  CO2: 0.08757,
  N2: 2.1649,
  H2O: 0,
};

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
  latitude: "",
  longitude: "",
  wind: "",
  teaDiameter: "",
  defaultModel: "None",
  HH: "",
  H: "",
};

const AppConfiguration = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [statusText, setStatusText] = useState("");
  const [extraComponent, setExtraComponent] = useState([]);
  const [showModalExtraComponent, setShowModalExtraComponent] = useState(false);
  const [optionValues, setOptionValues] = useState(initiallySelected);

  const handleSelect = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsed_value = parseFloat(value);
    const newValue = isNaN(parsed_value) ? value : parsed_value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
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

  function saveComponent(data) {
    setExtraComponent(data);
    setShowModalExtraComponent(false);
  }

  function saveComponent(data) {
    setExtraComponent(data);
    setShowModalExtraComponent(false);
  }
  console.log(extraComponent);
  return (
    <form onSubmit={handleSubmit} href="/" className="fullSize">
      <CustomGrid
        cols={5}
        rows={10}
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
            required
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
            optionValues={optionValues}
            setOptionValues={setOptionValues}
            onSelect={handleSelect}
            initiallySelected={initiallySelected}
          />
          <Button onClick={() => setShowModalExtraComponent(true)}>
            {" "}
            Add Component{" "}
          </Button>
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
            <option value="Coriolis">Coriolis</option>
            <option value="Ultrasonico">Ultrasonico</option>
            <option value="Daniel's">Daniel's</option>
            <option value="Thermal dispersion">Thermal dispersion</option>
            <option value="Orifice plate">Orifice plate</option>
            <option value="Vortex">Vortex</option>
            <option value="SPIF">Single Point Insertion Flowmeter</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Wind Speed (m/s): </span>
          <input
            type="text"
            name="wind"
            placeholder="4"
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
          <span>Position: Longitude:</span>
          <input
            type="text"
            name="longitude"
            placeholder="-75.290777"
            value={formData.longitude}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Default calculus Model :</span>
          <select
            name="Default Calculus Model"
            value={formData.defaultModel}
            onChange={handleChange}
          >
            <option value="anh">ANH Model</option>
            <option value="west">West Model</option>
            <option value="em_factor">Emissions Factor Model</option>
            <option value="cu_factor">Cu Factor Model</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Position: Latitude:</span>
          <input
            type="text"
            name="latitude"
            placeholder="3.072371"
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
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>High-High Alrm:</span>
          <input
            type="text"
            name="HH"
            placeholder=""
            value={formData.HH}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>High Alrm:</span>
          <input
            type="text"
            name="H"
            placeholder=""
            value={formData.H}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement
          className="grid-cell-white justified"
          rows={1}
          cols={4}
          style={{ justifyContent: "center" }}
        >
          <Button type="submit">Submit</Button>
        </GridElement>
        <h5>{statusText}</h5>
      </CustomGrid>
      <AddComponent
        show={showModalExtraComponent}
        setShow={setShowModalExtraComponent}
        saveComponent={saveComponent}
      />
    </form>
  );
};

export default AppConfiguration;
