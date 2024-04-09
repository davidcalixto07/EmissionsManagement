import MetricDisplay from "../MetricDisplay"

const MetricView = ({ title, metrics, decimals }) => {
    return (
        <>
            <h5>{title}</h5>
            <div className="metricsList">
                {metrics.map((metric, ind) =>
                    <MetricDisplay name={metric.name} value={metric.value} units={metric.units} key={ind} decimals={decimals} />
                )}
            </div>
        </>
    );
}

export default MetricView;