import React, { useEffect, useState } from "react";
import "./Styles.css";
import axios from "axios";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";
import { Button } from "react-bootstrap";
import Datasource from "../../Componentes/Datasources/Datasource";
import AddIcon from "../../Componentes/AssetsSidebar/add_icon.png";
import DeleteIcon from "../../Componentes/AssetsSidebar/trash-can-icon.png";
import AddDatasource from "../../Componentes/Datasources/AddDatasource";
import AddDataPoint from "../../Componentes/Datasources/AddDataPoint";
import PopupDeleteDs from "../../Componentes/Utlities/PopupDeleteDs";
import PopupDeleteDp from "../../Componentes/Utlities/PopupDeleteDp";
import { useOutletContext } from "react-router-dom";

const Mapping = () => {
  const [showModalDs, setShowModalDs] = useState(false);
  const [showModalDp, setShowModalDp] = useState(false);
  const [showModalDeleteDs, setShowModalDeleteDs] = useState(false);
  const [showModalDeleteDp, setShowModalDeleteDp] = useState(false);
  const [datasources, setDatasources] = useState([]);
  const [datapoints, setDataPoints] = useState([]);
  const [tempDataSources, setTempDatasources] = useState([]);
  const [tempDataPoints, setTemDataPoints] = useState([]);
  const [isRemovingds, setIsRemovingds] = useState(false);
  const [isRemovingdp, setIsRemovingdp] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  const [, , , units, setUnits, teasList, coordinates, imageSrc, loading] =
    useOutletContext();

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
    setDataPoints([]);
    console.log(datapoints);
  }, []);

  function handleDataSourceClick(datasource) {
    if (isRemovingds) {
      console.log(datasource.ip);
      setShowModalDeleteDs(true);
    } else {
      setSelectedDataSource(datasource);
      setDataPoints(datasource.datapoints);
    }
  }
  function handleDataPointClick(dp) {
    setSelectedDataPoint(dp);
    if (isRemovingdp) {
      console.log(dp);
      setShowModalDeleteDp(true);
    }
  }
  function updateListDs(list) {
    setDatasources(list);
  }
  function updateListDp(list) {
    setDataPoints(list);
  }
  function HandleClickedRemoveDs() {
    setIsRemovingds(true);
    setTempDatasources(datasources);
  }
  function HandleClickedRemoveDp() {
    setIsRemovingdp(true);
    setTemDataPoints(datapoints);
  }
  function HandleCancelDp() {
    setIsRemovingdp(false);
    setDataPoints(tempDataPoints);
  }
  function HandleCancelDs() {
    setIsRemovingds(false);
    setDatasources(tempDataSources);
  }

  function SaveDatasourceDs(ds) {
    const newItem = ds;
    setDatasources((datasources) => [...datasources, newItem]);
  }
  function SaveDataPoints(dp, ds) {
    const newItem = dp;
    setDataPoints((datapoints) => [...datapoints, newItem]);
    console.log(ds);
  }
  function confirmDelete() {
    console.log("delete");
    setShowModalDeleteDs(false);
    setShowModalDeleteDp(false);
  }
  function noDelete() {
    console.log("Nodelete");
    setShowModalDeleteDs(false);
    setShowModalDeleteDp(false);
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
                handleDataSourceClickDs={handleDataSourceClick}
              />
            ))}
          </div>
          <div className="button-container">
            <div className="ControlButtons">
              {isRemovingds ? (
                <>
                  <button
                    onClick={() => HandleCancelDs()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => HandleClickedRemoveDs()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={DeleteIcon} alt="-" />
                  </button>
                  <button
                    onClick={() => setShowModalDs(true)}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={AddIcon} alt="-" />
                  </button>
                </>
              )}
            </div>
          </div>
        </GridElement>
        <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
          <h4>Datapoints</h4>|
        </GridElement>
        {datapoints &&
          datapoints?.map((ds) => (
            <>
              {console.log(ds)}
              <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
                <div onClick={() => handleDataPointClick(ds)}>
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
                </div>
              </GridElement>
            </>
          ))}{" "}
        <GridElement cols={6} ns>
          <div className="button-container">
            <div className="ControlButtons">
              {isRemovingdp ? (
                <>
                  <button
                    onClick={() => HandleCancelDp()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => HandleClickedRemoveDp()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={DeleteIcon} alt="-" />
                  </button>
                  <button
                    onClick={() => setShowModalDp(true)}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={AddIcon} alt="-" />
                  </button>
                </>
              )}
            </div>
          </div>
        </GridElement>
        <GridElement cols={6} ns style={{ alignContent: "center" }}>
          <Button variant="primary" onClick={() => updateListDs}>
            Apply
          </Button>
        </GridElement>
      </CustomGrid>
      <AddDatasource
        show={showModalDs}
        setShow={setShowModalDs}
        saveDatasource={SaveDatasourceDs}
      />
      <AddDataPoint
        show={showModalDp}
        setShow={setShowModalDp}
        saveDataPoint={SaveDataPoints}
        ds={selectedDataSource}
      />
      <PopupDeleteDs
        show={showModalDeleteDs}
        setShow={setShowModalDeleteDs}
        confirmDelete={confirmDelete}
        noDelete={noDelete}
        ds={selectedDataSource}
      />
      <PopupDeleteDp
        show={showModalDeleteDp}
        setShow={setShowModalDeleteDp}
        confirmDelete={confirmDelete}
        noDelete={noDelete}
        dp={selectedDataPoint}
      />
    </>
  );
};

export default Mapping;
