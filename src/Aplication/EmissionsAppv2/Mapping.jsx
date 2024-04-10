import React, { useEffect, useState } from "react";
import "./Styles.css";
import axios from "axios";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";
import { Button } from "react-bootstrap";
import Datasource from "../../Componentes/Datasources/Datasource";
import AddDatasource from "../../Componentes/Datasources/AddDatasource";
import { useOutletContext } from "react-router-dom";

const Mapping = () => {
  const [config, SetConfig] = useState({});
  const [tagConfig, SetTagconfig] = useState({});
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datasources, setDatasources] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState(null);

  const [, , , units, setUnits, teasList, coordinates, imageSrc, loading] =
    useOutletContext();

  function GetConfig() {
    axios
      .get("/EmissionsApi/getConfig")
      .then((response) => {
        if (response.data) {
          SetConfig(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
    axios
      .get("/EmissionsApi/getTagsList")
      .then((response) => {
        if (response.data) {
          SetTagconfig(response.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  console.log("Datasources", datasources);
  useEffect(() => {
    const defConf = {
      name: "PLC1",
      ip: "192.168.34.124",
      status: "Disconnected",
      type: "Logix",
      datapoints: ["FIT3401", "PIT3401", "TIT2501"],
    };
    setDatasources([defConf]);
    GetConfig();
  }, []);

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
      const response = await axios.post(
        "/api/assetmanagement/v3/assets",
        newAsset
      );
      console.log("Response:", response.data);
      setStatusText("Created");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConfigChange = (e) => {
    setChanges(true);

    const { name, value } = e.target;
    SetConfig((prevValues) => ({
      ...prevValues,
      [name]: parseFloat(value) ?? value,
    }));
  };

  const handleTagConfigChange = (e) => {
    setChanges(true);

    const { name, value } = e.target;
    SetTagconfig((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  function handleDataSourceClick(datasource) {
    setSelectedDataSource(datasource);
  }

  function HandleApply() {
    setChanges(false);
    axios
      .post("/EmissionsApi/setConfig", config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    axios
      .post("/EmissionsApi/setTagsList", tagConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  function SaveDatasource(ds) {
    const newItem = ds;
    setDatasources((datasources) => [...datasources, newItem]);
  }

  return (
    <>
      <CustomGrid rows={8} cols={8} className={"Overview-100"}>
        <GridElement cols={2} rows={8}>
          <GridElement cols={1} ns>
            <h4>Datasources</h4>
          </GridElement>
          <div className="list">
            {datasources.map((ds) => (
              <Datasource
                datasource={ds}
                handleDataSourceClick={handleDataSourceClick}
              />
            ))}
          </div>
          <div className="button-container">
            <Button onClick={() => setShowModal(true)}>Add Datasource</Button>
          </div>
        </GridElement>
        <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
          <h4>Datapoints</h4>
        </GridElement>
        {selectedDataSource &&
          selectedDataSource.datapoints.map((ds) => (
            <>
              <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
                <strong> Node/Tag: </strong>
                <span> {ds} </span>
                <strong> Flare: </strong>
                <span>
                  <select id="dropdown">
                    {datasources.length > 0 &&
                      teasList.map((ds) => (
                        <option value={ds.name}>{ds.name}</option>
                      ))}
                  </select>
                </span>
                <strong> Variable: </strong>
                <span>
                  <select>
                    <option> Gas Flow </option>
                    <option> Gas Pressure </option>
                    <option> Gas Temperature </option>
                  </select>
                </span>
              </GridElement>
            </>
          ))}{" "}
        <GridElement cols={6} rows={1} ns style={{ alignContent: "center" }}>
          <Button variant="success">Add</Button>
          <Button variant="danger">Delete</Button>
          <span></span>
          <Button variant="primary">Map</Button>
        </GridElement>
      </CustomGrid>
      <AddDatasource
        show={showModal}
        setShow={setShowModal}
        saveDatasource={SaveDatasource}
      />
    </>
  );
};

export default Mapping;
