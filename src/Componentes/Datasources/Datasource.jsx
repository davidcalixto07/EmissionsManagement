import DeleteIcon from "../AssetsSidebar/trash-can-icon.png";
const Datasource = ({
  datasource,
  handleDataSourceClickDs,
  selected,
  deleting,
}) => {
  return (
    <div
      onClick={() => handleDataSourceClickDs(datasource)}
      className={selected === datasource ? `Datasource selected` : "Datasource"}
    >
      <div>
        <strong>Name:</strong>
        {datasource.name}
      </div>
      <div>
        <strong>Type:</strong>
        {datasource.type}
      </div>
      <div>
        <strong>IP:</strong>
        {datasource.ip}
      </div>
      <div>
        <strong>{datasource.type == "Logix" ? "Tags:" : "Nodes:"} </strong>
        {datasource.datapoints.length}
      </div>
      <div>
        <strong>Status:</strong>
        <span
          style={{ color: datasource.status === "Connected" ? "green" : "red" }}
        >
          {datasource.status}
        </span>
      </div>
      <br></br>
      <span>
        {deleting && (
          <div className="SidebarAsset-DeleteIcon-search ">
            <img height="90%" src={DeleteIcon} alt="-" />
          </div>
        )}
      </span>
    </div>
  );
};

export default Datasource;
