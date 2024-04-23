import { useEffect, useState } from "react";
import CustomGrid from "../Utils/CustomGrid";
import GridUtil from "../Utils/GridUtil";
import GridElement from "../Utils/GridElement";
import { ComponentSelector } from "./TeaViews/ComponentsSelector";
import { Button } from "react-bootstrap";
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
  height: 30,
  teaDiameter: 9.1,
  instalationYear: 2024,
  transmitterSerial: "",
  wind: 0,
  longitude: 3.072371,
  latitude: -75.29077,
  HH: 0,

  teaType: "Tea Alta",
  tecnology: "Tea Combinada",
  segment: "Exploración",
  measureMethod: "Balance",
  measureType: "Coriolis",
  frecuency: "Continuous",
  defaultModel: "anh",
  estimatedHours: 0,
  H: 0,
};

const AppConfiguration = ({ assetData }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [statusText, setStatusText] = useState("");

  //Component creation
  const [name, setName] = useState("");
  const [gwp, setGwp] = useState("");
  const [mw, setMw] = useState("");
  const [lhw, setlhw] = useState("");
  const [sc, setSc] = useState("");

  useEffect(() => {
    if (assetData?.data)
      setFormData(assetData.data);
  }, [assetData]);

  const [optionValues, setOptionValues] = useState(initiallySelected);

  const handleSelect = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = e.target.type === 'number' ?
      parseFloat(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(optionValues);
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
        </GridElement>

        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>TEA height(ft)</span>
          <input
            type="number"
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
            type="number"
            name="teaDiameter"
            placeholder="  9.1"
            value={formData.teaDiameter}
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
            type="number"
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
            type="number"
            name="wind"
            placeholder="4"
            value={formData.wind}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Operating frequency :</span>
          <select
            name="frecuency"
            value={formData.frecuency}
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
          <span>Default calculation Model:</span>
          <select
            name="defaultModel"
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
            type="number"
            name="estimatedHours"
            placeholder=" 0"
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
        <GridElement rows={4} cols={4}>
          <GridUtil rows={4} cols={4}>
            <GridElement rows={1} cols={4} ns>
              <h5>Add Extra Components</h5>
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>chemical symbol:</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                value={gwp}
                onChange={(event) => setGwp(event.target.value)}
                name="AC1"
                placeholder="GWP value"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>MW Value:</span>
              <input
                value={mw}
                onChange={(event) => setMw(event.target.value)}
                name="MW"
                placeholder="Molecular weight"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>LHW Value:</span>
              <input
                value={lhw}
                onChange={(event) => setlhw(event.target.value)}
                name="AC1"
                placeholder="Lower Heating weight value"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>SC Value:</span>
              <input
                value={sc}
                onChange={(event) => setSc(event.target.value)}
                name="AC1"
                placeholder="Stoichiometric coefficient"
              />
            </GridElement>
            <GridElement
              rows={1}
              cols={2}
              ns
              style={{ justifyContent: "center" }}
            >
              <Button type="submit"> Add </Button>
            </GridElement>
          </GridUtil>
        </GridElement>
        <GridElement
          className="grid-cell-white justified"
          rows={3}
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
