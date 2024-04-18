import GridElement from "../../Aplication/Utils/GridElement";
const Datapoint = ({
  datapoint,
  handleDataPointClick,
  teasList,
  datasources,
}) => {
  return (
    <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
      <div onClick={() => handleDataPointClick(datapoint)}>
        <strong> Node/Tag: </strong>
        <span> {datapoint.tag} </span>
        <strong> Flare: </strong>
        <span>
          <select id="dropdown">
            {datasources.length > 0 &&
              teasList.map((tea) => (
                <option value={tea.name}>{tea.name}</option>
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
  );
};

export default Datapoint;
