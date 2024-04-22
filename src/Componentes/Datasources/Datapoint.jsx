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
        <span> {datapoint.tag} </span>
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
            defaultValue={datapoint.flare ?? ""}
            onChange={(event) =>
              HandleMappingFlare(datapoint, event.target.value)
            }
          >
            {datasources.length > 0 &&
              teasList.map((tea) => (
                <option value={tea.name}>{tea.name}</option>
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
          </select>
        </span>
      </div>
    </GridElement>
  );
};

export default Datapoint;
