import { useState } from "react";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";
import {
  emissionsUnits,
  flowUnits,
  pressureUnits,
  tempUnits,
} from "./conversions";
import { Button } from "react-bootstrap";
import ImageLoader from "./ImageLoader";
import { useOutletContext } from "react-router-dom";

const AppConfiguration = () => {
  const [, , , units, setUnits, teasList, coordinates, imageSrc, loading] =
    useOutletContext();

  function flowChange(event) {
    const newUnit = flowUnits.find((x) => x.name === event.target.value);
    setUnits((prevState) => ({
      ...prevState,
      flow: newUnit,
    }));
  }

  function emissionSchange(event) {
    const newUnit = emissionsUnits.find((x) => x.name === event.target.value);
    setUnits((prevState) => ({
      ...prevState,
      emissions: newUnit,
    }));
  }

  function temperatureChange(event) {
    const newUnit = tempUnits.find((x) => x.name === event.target.value);
    setUnits((prevState) => ({
      ...prevState,
      temperature: newUnit,
    }));
  }

  function pressureChange(event) {
    const newUnit = pressureUnits.find((x) => x.name === event.target.value);
    setUnits((prevState) => ({
      ...prevState,
      pressure: newUnit,
    }));
  }

  function fetchImage() {
    fetch("/api/emissionsapi2-colwest2/v1/getImage?tenant=colwest2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
        // setImageSrc(imageURL);
        console.log("Loaded Image", imageURL);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  return (
    <CustomGrid cols={1} rows={3} className={"Overview-100"}>
      <GridElement className="grid-cell-white vert">
        <h4
          style={{ textAlign: "start", paddingLeft: "2rem", margin: "0.3rem" }}
        >
          Area Image Configuration
        </h4>
        <ImageLoader onChange={fetchImage} />
      </GridElement>
      <GridElement className="grid-cell-white justified">
        <div>
          <h5 style={{ textAlign: "start", paddingLeft: "2rem" }}>
            Co2 Shown Units
          </h5>
          <div style={{ display: "flex" }}>
            <select value={units.emissions.name} onChange={emissionSchange}>
              {emissionsUnits.map((unit, index) => (
                <option key={index}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h5 style={{ textAlign: "start", paddingLeft: "2rem" }}>
            Flow Shown Units
          </h5>
          <div style={{ display: "flex" }}>
            <select value={units.flow.name} onChange={flowChange}>
              {flowUnits.map((unit) => (
                <option>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h5 style={{ textAlign: "start", paddingLeft: "2rem" }}>
            Temperature Shown Units
          </h5>
          <div style={{ display: "flex" }}>
            <select value={units.temperature.name} onChange={temperatureChange}>
              {tempUnits.map((unit) => (
                <option>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h5 style={{ textAlign: "start", paddingLeft: "2rem" }}>
            Pressure Shown Units
          </h5>
          <div style={{ display: "flex" }}>
            <select value={units.pressure.name} onChange={pressureChange}>
              {pressureUnits.map((unit) => (
                <option>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>
      </GridElement>
    </CustomGrid>
  );
};

export default AppConfiguration;
