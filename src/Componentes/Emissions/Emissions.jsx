import GridElement from "../../Aplicaciones/Utils/GridElement";
import CustomGrid from "../../Aplicaciones/Utils/CustomGrid";
import BarChart from "../Charts/BarChart";
import TimeSerie from "../Charts/Timeseries";

function Emissions({
  data1,
  data2,
  labels1,
  labels2,
  timestamp,
  timeseries1,
  timeseries2,
}) {
  return (
    <CustomGrid rows={2} cols={2}>
      <GridElement rows={1} cols={1} ns>
        <TimeSerie
          timestamps={timestamp}
          values={timeseries1}
          label="Carbon footprint CO2e"
          units={"FootPrint (CO2e)"}
          freeRatio
        />
      </GridElement>
      <GridElement rows={1} cols={1} ns>
        <BarChart
          data={data1}
          labels={labels1}
          legend={"Daily"}
          aditionalAxes={["FugitiveEmissions (CO2e)"]}
          barWidth={20}
          yUnits={"FootPrint (CO2e)"}
        />
      </GridElement>
      <GridElement rows={1} cols={1} ns>
        <TimeSerie
          timestamps={timestamp}
          values={timeseries2}
          label={"Total fugitive Emissions CO2e"}
          units={"FugitiveEmissions (CO2e)"}
          freeRatio
        />
      </GridElement>
      <GridElement rows={1} cols={1} ns>
        <BarChart
          data={data2}
          labels={labels2}
          legend={"Monthly"}
          aditionalAxes={["FugitiveEmissions (CO2e)"]}
          barWidth={15}
          yUnits={"FootPrint (CO2e)"}
        />
      </GridElement>
    </CustomGrid>
  );
}
export default Emissions;
