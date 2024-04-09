import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Papa from "papaparse";
import HeatMapper from "../EmissionsAppv2/Heatmapper";

const DirectEmissionsModal = ({ isOpen, onClose, imgSrc, coordinates }) => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result;
      const parsedData = Papa.parse(csvData, { header: true }).data;
      setData(parsedData);
      console.log("dataaaaaaaaaaaaaaaaaa", parsedData);
    };
    reader.readAsText(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          " /api/emissionsapi2-colwest2/v1/getCSV?tenant=colwest2"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;
        setData(parsedData);
        console.log("dataaaaaaaaaaaaaaaaaa", parsedData);
      } catch (error) {
        console.error("Error fetching CSV file:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!file) {
      setResponse("No file selected");
      return;
    }

    setResponse("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "/api/emissionsapi2-colwest2/v1/saveCSV?tenant=colwest2",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      console.log("File uploaded successfully");
      setResponse("uploaded");
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponse("Error uploading");
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="demodal-overlay">
      <div className="directEmissions Econtainer">
        <div className="Efixed-size flex nw">
          <h4>Direct Emissions Input</h4>
          <button className="modal-close" onClick={() => onClose()}>
            X
          </button>
        </div>
        <div className="Eflexible-size" style={{ marginTop: "1rem" }}>
          <h5>Direct Emissions CSV</h5>
          <div className="flex nw" style={{ justifyContent: "space-evenly" }}>
            <input type="file" onChange={handleFileChange} />
            <div style={{ display: "flex", alignItems: "end" }}>
              <Button onClick={() => handleSubmit()}>Upload</Button>
              <span style={{ width: "2rem", fontSize: "small" }}>
                {response}
              </span>
            </div>
          </div>
          <div style={{ height: "calc(100% - 5rem)", width: "100%" }}>
            <HeatMapper
              teas={data.map((d) => ({
                avgEmissions: parseFloat(d.value),
                location: { latitude: d.latitude, longitude: d.longitude },
              }))}
              coordinates={coordinates}
              imgsrc={imgSrc}
            />
          </div>
        </div>
        <div className="Efixed-size flex">
          <span>
            <b>Total Emissions:</b> 1.2 tCo2h
          </span>
          <Button onClick={() => handleSubmit()}>Download Data</Button>
        </div>
      </div>
    </div>
  );
};

export default DirectEmissionsModal;
