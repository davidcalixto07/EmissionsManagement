const MetricDisplay = ({ name, value, units, decimals = 1 }) => {
  return (
    <div className="metric-display">
      <span className="metric-name">{name}</span>
      <div className="metric-value">
        <span className="value">{value.toFixed(decimals)}</span>
        <span className="units">{units}</span>
      </div>
    </div>
  );
};

export default MetricDisplay;
