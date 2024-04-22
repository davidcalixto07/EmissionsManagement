const Datasource = ({ datasource, handleDataSourceClickDs, selected }) => {
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
        {datasource.direction}
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
    </div>
  );
};

export default Datasource;
