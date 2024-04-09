import React, { useEffect, useState } from "react";
import "./Styles.css";
import axios from "axios";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";
import { Button } from "react-bootstrap";
import Datasource from "../../Componentes/Datasources/Datasource";
import AddDatasource from "../../Componentes/Datasources/AddDatasource";
import GridUtil from "../Utils/GridUtil";

const Mapping = () => {
  const [config, SetConfig] = useState({});
  const [tagConfig, SetTagconfig] = useState({});
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datasources, setDatasources] = useState([]);

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
      <CustomGrid rows={8} cols={7} className={"Overview-100"}>
        <GridElement cols={2} rows={8}>
          <GridElement cols={1} ns>
            <h4>Datasources</h4>
          </GridElement>
          <div className="list">
            {datasources.map((ds) => (
              <Datasource datasource={ds} />
            ))}
          </div>
          <div className="button-container">
            <Button onClick={() => setShowModal(true)}>Add Datasource</Button>
          </div>
        </GridElement>
        <GridElement cols={5} rows={8}>
          <form onSubmit={handleSubmit} className="fullSize">
            <GridUtil cols={2} rows={8} gap={"2em"}>
              <GridElement
                cols={2}
                rows={1}
                ns
                style={{ aligncontent: "center", marginTop: "2em" }}
              >
                <h4>Datapoints</h4>
              </GridElement>
              <GridElement cols={1} rows={1} ns>
                <strong>Flow To tea:</strong>
                <div className="Datapoint">
                  <div>
                    <span>Source: </span>
                    <select id="dropdown">
                      {datasources.map((ds) => (
                        <option value="">{ds.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span>Tag or nodeId:</span>
                    <input name="tag" defaultValue={"FIT3401.Val"} />
                  </div>
                </div>
              </GridElement>

              <GridElement cols={1} rows={1} ns>
                <strong>Gas pressure:</strong>
                <div className="Datapoint">
                  <div>
                    <span>Source: </span>
                    <select id="dropdown">
                      {datasources.map((ds) => (
                        <option value="">{ds.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span>Tag or nodeId:</span>
                    <input name="tag" defaultValue={"PIT3401.Val"} />
                  </div>
                </div>
              </GridElement>

              <GridElement cols={1} rows={1} ns>
                <strong>Gas Temperature:</strong>
                <div className="Datapoint">
                  <div>
                    <span>Source: </span>
                    <select id="dropdown">
                      {datasources.map((ds) => (
                        <option value="">{ds.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span>Tag or nodeId:</span>
                    <input name="tag" defaultValue={"TIT3401.Val"} />
                  </div>
                </div>
              </GridElement>

              <GridElement cols={1} rows={1} ns>
                <strong>Composition Array:</strong>
                <div className="Datapoint">
                  <div>
                    <span>Source: </span>
                    <select id="dropdown">
                      {datasources.map((ds) => (
                        <option value="">{ds.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span>Tag or nodeId:</span>
                    <input name="tag" defaultValue={"Comp"} />
                  </div>
                </div>
              </GridElement>

              <GridElement cols={1} rows={1} ns>
                <strong>Density:</strong>
                <div className="Datapoint">
                  <div>
                    <span>Source: </span>
                    <select id="dropdown">
                      {datasources.map((ds) => (
                        <option value="">{ds.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span>Tag or nodeId:</span>
                    <input name="tag" defaultValue={"Density"} />
                  </div>
                </div>
              </GridElement>

              <GridElement cols={1} rows={1} ns>
                <strong>LHV:</strong>
                <div className="Datapoint">
                  <div>
                    <span>Source: </span>
                    <select id="dropdown">
                      {datasources.map((ds) => (
                        <option value="">{ds.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span>Tag or nodeId:</span>
                    <input name="tag" defaultValue={"Comp[18]"} />
                  </div>
                </div>
              </GridElement>
              <GridElement cols={2} rows={2} ns>
                <Button type="submit">Submit</Button>
              </GridElement>
            </GridUtil>
          </form>
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
