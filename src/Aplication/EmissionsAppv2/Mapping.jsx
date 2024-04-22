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
import {
  CreateDatasource,
  DeleteDatasource,
  CreateDatapoint,
  DeleteDatapoint,
  GetDatasources,
  PostDatamappings,
} from "./apiHandler";
import Datapoint from "../../Componentes/Datasources/Datapoint";
import Alerts from "../../Componentes/Alerts/Alerts";

const Mapping = () => {
  const { CreateDatasource, DeleteDatasource, CreateDatapoint,
    DeleteDatapoint, GetDatasources, PostDatamappings } = useEmissionsApi();
  const [showModalDs, setShowModalDs] = useState(false);
  const [showModalDp, setShowModalDp] = useState(false);
  const [showModalDeleteDs, setShowModalDeleteDs] = useState(false);
  const [showModalDeleteDp, setShowModalDeleteDp] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [datasources, setDatasources] = useState([]);
  const [datapoints, setDataPoints] = useState([]);
  const [isRemovingds, setIsRemovingds] = useState(false);
  const [isRemovingdp, setIsRemovingdp] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [response, setResponse] = useState(200);
  const [, , , , , teasList, , ,] = useOutletContext();

  async function getApiDatasources(dp_id) {
    const res = await axios.get("/api/assets/GetMappings?ds_id=" + dp_id);
    console.log("Mappings", res);
    setDataPoints(res.data);
  }

  async function handleDataSourceClick(datasource) {
    setSelectedDataSource(datasource);

    if (isRemovingds) {
      console.log(datasource);
      setShowModalDeleteDs(true);
    } else {
      getApiDatasources(datasource.ip);
    }
  }

  function handleDataPointClick(dp) {
    setSelectedDataPoint(dp);
    if (isRemovingdp) {
      console.log(dp);
      setShowModalDeleteDp(true);
    }
  }

  function HandleClickedRemoveDs() {
    setIsRemovingds(true);
  }
  function HandleClickedRemoveDp() {
    setIsRemovingdp(true);
  }

  function HandleCancelDp() {
    setIsRemovingdp(false);
  }
  function HandleCancelDs() {
    setIsRemovingds(false);
  }

  async function SaveDatasourceDs(ds) {
    setShowModalDs(false);
    if (await CreateDatasource(ds))
      getApiData();
    else
      console.log("Not created");
  }

  async function SaveDataPoint(dp, ds) {
    setShowModalDp(false);
    console.log("SaveDp", dp, "Ds", ds);
    const response1 = await CreateDatapoint(ds, dp);
    console.log(response1);
    if (response1 === "Created") {
      getApiDatasources(ds.ip);
      setShowAlerts(true);
      setResponse(200);
    } else {
      setShowAlerts(true);
      console.log("Not created");
      setResponse(response1);
    }
  }

  async function confirmDelete(ds) {
    console.log("delete", ds);
    setShowModalDeleteDs(false);
    await DeleteDatasource(ds);
    getApiData();
  }

  async function confirmDeleteDp(dp) {
    console.log("delete", dp);
    setSelectedDataSource(selectedDataSource);
    setShowModalDeleteDp(false);
    await DeleteDatapoint(selectedDataSource, dp);
    getApiDatasources(selectedDataSource.ip);
  }

  const getApiData = async () => {
    try {
      const res = await GetDatasources();
      setDatasources(res);
    } catch (error) {
      console.error(error);
    }
  };

  function noDelete() {
    setShowModalDeleteDs(false);
    setShowModalDeleteDp(false);
  }

  function handleMappingFlare(dp, value) {
    console.log("Dp", dp, "Value", value);
    const newDps = [...datapoints];
    const newDp = newDps.find((x) => x === dp);
    newDp.flare = value;
    setDataPoints(newDps);
  }

  function handleMappingVar(dp, value) {
    console.log("Dp", dp, "Value", value);
    const newDps = [...datapoints];
    const newDp = newDps.find((x) => x === dp);
    newDp.variable = value;
    setDataPoints(newDps);
  }

  async function saveMappings() {
    const json = {
      dp_id: selectedDataSource.direction,
      dp_type: selectedDataSource.type,
      datapoints: datapoints,
    };
    if (await PostDatamappings(json)) getApiData();
    else console.log("Not created");
  }

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    console.log("Ds update", datasources);
    if (selectedDataSource) {
      const ds = datasources.find(
        (x) =>
          x.direction === selectedDataSource.direction && x.type === selectedDataSource.type
      );
      if (ds != null) {
        setSelectedDataSource(ds);
        getApiDatasources(ds.direction);
        return;
      }
    }
    if (datasources[0]) {
      setSelectedDataSource(datasources[0]);
      getApiDatasources(datasources[0].direction);
    }
  }, [datasources]);

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
                selected={selectedDataSource}
                deleting={isRemovingds}
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
        {!selectedDataSource ? (
          <>
            <GridElement
              cols={6}
              rows={12}
              style={{ alignContent: "center", backgroundColor: "#efeef5" }}
              ns
            >
              <h4 style={{ color: "grey" }}>
                {" "}
                There's no Data Source selected, please select one{" "}
              </h4>
            </GridElement>
          </>
        ) : selectedDataSource.datapoints.length > 0 ? (
          <>
            <GridElement cols={6} style={{ alignContent: "center" }}>
              <h3> DataPoints</h3>
            </GridElement>
            {datapoints?.map((dp) => (
              <Datapoint
                datapoint={dp}
                handleDataPointClick={handleDataPointClick}
                teasList={teasList}
                datasources={datasources}
                deleting={isRemovingdp}
                handleMappingVar={handleMappingVar}
                HandleMappingFlare={handleMappingFlare}
              />
            ))}
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
              <Button
                variant="primary"
                onClick={() => saveMappings}
                href="/manage"
              >
                Apply
              </Button>
            </GridElement>
          </>
        ) : (
          <>
            <GridElement
              cols={6}
              rows={12}
              style={{ alignContent: "center", backgroundColor: "#efeef5" }}
              ns
            >
              <h4 style={{ color: "grey" }}>
                {" "}
                There's no data points in the data source, please select one
                wich has nodes or tags or add a datapoint{" "}
              </h4>
              <GridElement
                cols={6}
                ns
                style={{ backgroundColor: "transparent" }}
              >
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
              <GridElement
                cols={6}
                ns
                style={{
                  alignContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Button
                  variant="primary"
                  onClick={() => saveMappings}
                  href="/manage"
                >
                  Apply
                </Button>
              </GridElement>
            </GridElement>
          </>
        )}
      </CustomGrid>
      <AddDatasource
        show={showModalDs}
        setShow={setShowModalDs}
        saveDatasource={SaveDatasourceDs}
      />
      <AddDataPoint
        show={showModalDp}
        setShow={setShowModalDp}
        saveDataPoint={SaveDataPoint}
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
        confirmDelete={confirmDeleteDp}
        noDelete={noDelete}
        dp={selectedDataPoint}
      />
      <Alerts
        status={response}
        show={showAlerts}
        setShowAlert={setShowAlerts}
      />
    </>
  );
};

export default Mapping;
