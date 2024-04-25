import GridElement from "../../Aplication/Utils/GridElement";
import DeleteIcon from "../AssetsSidebar/trash-can-icon.png";
const Datapoint = ({
  datapoint,
  handleDataPointClick,
  teasList,
  datasources,
  deleting,
  handleMappingVar,
  HandleMappingFlare,
}) => {
  return (
    <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
      <div
        onClick={() => handleDataPointClick(datapoint)}
        className="Datapoint"
      >
        <strong> Node/Tag: </strong>
        <span> {datapoint.node_id} </span>
        <div>
          {deleting && (
            <div className="SidebarAsset-DeleteIcon-search ">
              <img height="90%" src={DeleteIcon} alt="-" />
            </div>
          )}
        </div>
        <br></br>
        <strong> Flare: </strong>
        <span>
          <select
            id="dropdown"
            value={datapoint.flare ?? ""}
            onChange={(event) =>
              HandleMappingFlare(datapoint, event.target.value)
            }
          >
            <option key={"default"} value={""}>
              {"None"}
            </option>
            {datasources.length > 0 &&
              teasList.map((tea) => (
                <option key={tea.name} value={tea.name}>
                  {tea.name}
                </option>
              ))}
          </select>
        </span>
        <strong> Variable: </strong>
        <span>
          <select
            value={datapoint.variable ?? ""}
            onChange={(event) =>
              handleMappingVar(datapoint, event.target.value)
            }
          >
            <option value="">None</option>
            <option value="flow"> Gas Flow </option>
            <option value="pressure"> Gas Pressure </option>
            <option value="temperature"> Gas Temperature </option>
            <option value="C1">C1</option>
            <option value="C2"> C2</option>
            <option value="C3"> C3 </option>
            <option value="C4">C4</option>
            <option value="IC-4"> IC-4 </option>
            <option value="C5"> C5 </option>
            <option value="NC5"> NC5 </option>
            <option value="IC-5">IC-5</option>
            <option value="C6"> C6 </option>
            <option value="C7"> C7 </option>
            <option value="C8"> C8 </option>
            <option value="C9"> C9 </option>
            <option value="C10"> C10 </option>
            <option value="CO2"> CO2 </option>
            <option value="N2"> N2 </option>
            <option value="H2O"> H2O </option>
          </select>
        </span>
      </div>
    </GridElement>
  );
};

export default Datapoint;
