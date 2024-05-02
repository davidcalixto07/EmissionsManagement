import BarChart from "../../../Componentes/Charts/BarChart";
import MultiTimeseries from "../../../Componentes/Charts/MultiTimeseries";
import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import MetricView from "./MetricView";
import { useEffect, useState } from "react";

const gasesNames = ["C02", "methane", "CO2e", "NOx"];
const colors = ["#0f2d57", "#f03030", "#30f030", "#30f030"];
// Mass balance- West
// Mass balance - ANH
// Emission factor - EPA
// ch4 y co2

// NOX
// Emission factor - ANH
// Emission factor- EPA

const EmissionsView = ({ data, units, loading, setCalcs }) => {
  const [timeseries, setTimeseries] = useState([]);
  const [tsTime, setTsTime] = useState([]);
  const [model, setModel] = useState("west");
  const [gas, setGas] = useState("All");
  const [gasesTs, setGasesTs] = useState([]);

  console.log("Data From Emissions View", data);

  const [results, setResults] = useState({
    flow: {
      avg: 0,
      peak: 0,
    },
    temperature: {
      avg: 0,
      peak: 0,
    },
    pressure: {
      avg: 0,
      peak: 0,
    },
    CO2Emissions: {
      avg: 0,
      peak: 0,
      total: 0,
    },
    eqEmissions: {
      avg: 0,
      peak: 0,
      total: 0,
    },
  });

  useEffect(() => {
    setCalcs(results);
  }, [results]);

  useEffect(() => {
    if (!data || !data.timeSerie || !data.timeSerie.length) return;

    async function fetchData() {
      const url = `/api/iottimeseries/v3/timeseries/${
        data.assetId
      }/GasComposition?from=${
        data.timeSerie[data.timeSerie.length - 1]._time
      }&sort=desc`;
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(Error(`Failed to fetch data for assetId ${data.assetId}`));
        return;
      }

      const json = await response.json();
      console.log("Api response from GasComposition", json);
    }
    fetchData();

    setTimeseries(data.timeSerie);
    console.log(data);
    const tsLength = data.timeSerie.length;
    setTsTime(data.timeSerie.map((t) => t._time));

    const avgFlow =
      data.timeSerie.reduce(
        (accumulator, currentValue) => accumulator + currentValue.flow,
        0
      ) / tsLength;
    const maxflow = Math.max(...data.timeSerie.map((o) => o.flow));

    const avgTemp =
      data.timeSerie.reduce(
        (accumulator, currentValue) => accumulator + currentValue.temperature,
        0
      ) / tsLength;
    const maxtemp = Math.max(...data.timeSerie.map((o) => o.temperature));

    const avgPres =
      data.timeSerie.reduce(
        (accumulator, currentValue) => accumulator + currentValue.pressure,
        0
      ) / tsLength;
    const maxPres = Math.max(...data.timeSerie.map((o) => o.pressure));

    function calculateHoursBetweenDates(isoDate1, isoDate2) {
      const date1 = new Date(isoDate1);
      const date2 = new Date(isoDate2);
      const differenceMs = Math.abs(date2 - date1);
      const hours = differenceMs / (1000 * 60 * 60);
      return hours;
    }

    const hours = calculateHoursBetweenDates(
      data.timeSerie[0]._time,
      data.timeSerie[tsLength - 1]._time
    );

    const avgCo2 =
      data.timeSerie.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.emissions[model.toLowerCase()].C02,
        0
      ) / tsLength;
    const maxCo2 = Math.max(
      ...data.timeSerie.map((o) => o.emissions[model.toLowerCase()].C02)
    );
    const totalco2 = avgCo2 * hours * 10;

    const avgCo2eq =
      data.timeSerie.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.emissions[model.toLowerCase()].CO2e,
        0
      ) / tsLength;
    const maxCo2eq = Math.max(
      ...data.timeSerie.map((o) => o.emissions[model.toLowerCase()].CO2e)
    );
    const totalco2eq = avgCo2eq * hours * 10;
    const res = {
      flow: {
        avg: avgFlow,
        peak: maxflow,
      },
      temperature: {
        avg: avgTemp,
        peak: maxtemp,
      },
      pressure: {
        avg: avgPres,
        peak: maxPres,
      },
      CO2Emissions: {
        avg: avgCo2,
        peak: maxCo2,
        total: totalco2,
      },
      eqEmissions: {
        avg: avgCo2eq,
        peak: maxCo2eq,
        total: totalco2eq,
      },
    };

    setResults(res);
  }, [data]);

  function generateFutureDates(startISOString, numberOfDates) {
    let datesArray = [];
    let currentDate = new Date(startISOString);

    for (let i = 0; i < numberOfDates; i++) {
      currentDate.setMinutes(currentDate.getMinutes() + 3);
      datesArray.push(new Date(currentDate).toISOString());
    }
    return datesArray;
  }

  function UpdateTimeseries() {
    console.warn("Called To update", data);
    if (gas === "All") {
      const tsList = gasesNames?.map((g, i) => ({
        label: g,
        t: tsTime,
        v: timeseries?.map((v) => v?.emissions[model?.toLowerCase()][g]),
        color: colors[i],
        f: g === "C02e",
      }));
      if (timeseries.length > 0) {
        const ts = timeseries
          ?.map((v) => v?.emissions[model?.toLowerCase()].C02e)
          .slice(0, 20);
        console.log("Ts", ts);
        const times = generateFutureDates(timeseries[0]._time, 20);
        console.log("Timeeeeeees", times);

        const forecast = {
          label: "CO2e forecast",
          t: times,
          v: ts,
          color: "#01d0d0",
          f: false,
        };
        tsList.push(forecast);
      }
      setGasesTs(tsList);
    } else {
      const index = gasesNames.findIndex((x) => x === gas);
      setGasesTs([
        {
          label: gas,
          t: tsTime,
          v: timeseries.map((v) => v.emissions[model.toLowerCase()][gas]),
          color: colors[index],
          f: gas === "C02e",
        },
      ]);
    }
  }

  useEffect(() => {
    UpdateTimeseries();
  }, [gas, model, timeseries]);

  return (
    <CustomGrid className={"TeaView"} rows={11} cols={10} loading={loading}>
      <GridElement rows={6} cols={3} className="grid-cell-white">
        <MultiTimeseries
          title={"Produced gas flow"}
          values={[
            {
              label: `flow (${units.flow.name})`,
              t: tsTime,
              v: timeseries.map((t) => units.flow.conv(t.flow)) ?? [],
              color: "#0f2d57",
              f: false,
              pointRadius: 0,
            },
          ]}
          freeRatio
        />
      </GridElement>

      <GridElement rows={6} cols={3} className="grid-cell-white">
        <BarChart
          legend="Gas Composition"
          labels={["C1", "C2", "C3", "C4", "C5"]}
          data={[
            { label: "Actual", data: [2, 5, 1, 2, 4] },
            {
              label: "Mean",
              data: [1, 2, 3, 1, 4],
              backgroundColor: "#c9cdf0",
            },
          ]}
          barWidth={12}
          legendPos="top"
        />
      </GridElement>

      <GridElement rows={2} cols={4} className="grid-cell-white metricView">
        <MetricView
          title={"CO2 Equivalent Emissions"}
          metrics={[
            {
              name: "average",
              value: units.emissions.conv(results.eqEmissions.avg),
              units: units.emissions.name,
            },
            {
              name: "peak",
              value: units.emissions.conv(results.eqEmissions.peak),
              units: units.emissions.name,
            },
            {
              name: "Total",
              value: units.emissions.conv(results.eqEmissions.total),
              units: units.emissions.name,
            },
          ]}
        />
      </GridElement>

      <GridElement rows={1} cols={4} className="grid-cell-white">
        Calculation Model:
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="emissionsSelector"
          style={{ width: "7.5rem" }}
        >
          <option value={"west"}>West </option>
          <option value={"anh"}>ANH</option>
          <option value={"em_factor"}>Emissions Factor </option>
          <option value={"cu_factor"}>Custom User Factor</option>
          <option value={"Direct_Emissions"}>Direct Emissions</option>
        </select>
        Gas:
        <select
          value={gas}
          onChange={(e) => setGas(e.target?.value)}
          className="emissionsSelector"
          style={{ width: "6.5rem" }}
        >
          <option>All</option>
          <option>C02</option>
          <option>CO2e</option>
          <option>CH4</option>
          <option>N2</option>
        </select>
      </GridElement>

      <GridElement
        rows={6}
        cols={4}
        className="grid-cell-white"
        style={{ justifyContent: "center" }}
      >
        {data.status?.[model]?.length < 1 ? (
          <MultiTimeseries
            title={`Emissions timeserie (${units.emissions.name})`}
            values={gasesTs}
            freeRatio
          ></MultiTimeseries>
        ) : (
          <div className="tooltip-container">
            <div
              className="tooltip-content"
              data-tooltip="Información de ayuda"
            >
              You're missing some variables to calculate this model, please
              check those:
              {data.status?.[model]?.map((ds) => (
                <div> {ds}</div>
              ))}
            </div>
            <div className="content">
              {" "}
              <img src="./info.png" width={35} />
            </div>
          </div>
        )}
      </GridElement>

      <GridElement rows={2} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Gas flow"}
          metrics={[
            {
              name: "average",
              value: units.flow.conv(results.flow.avg),
              units: units.flow.name,
            },
            {
              name: "peak",
              value: units.flow.conv(results.flow.peak),
              units: units.flow.name,
            },
          ]}
        />
      </GridElement>

      <GridElement rows={2} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Gas Pressure"}
          decimals={3}
          metrics={[
            {
              name: "average",
              value: units.pressure.conv(results.pressure.avg),
              units: units.pressure.name,
            },
            {
              name: "peak",
              value: units.pressure.conv(results.pressure.peak),
              units: units.pressure.name,
            },
          ]}
        />
      </GridElement>

      <GridElement rows={3} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Gas Temperature"}
          metrics={[
            {
              name: "average",
              value: units.temperature.conv(results.temperature.avg),
              units: units.temperature.name,
            },
            {
              name: "peak",
              value: units.temperature.conv(results.temperature.peak),
              units: units.temperature.name,
            },
          ]}
        />
      </GridElement>

      <GridElement rows={3} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Efficiencies "}
          metrics={[
            { name: "Combustion efficiency", value: 5.3, units: "%" },
            { name: "Destruction efficiency", value: 98.6, units: "%" },
          ]}
        />
      </GridElement>

      <GridElement rows={2} cols={4} className="grid-cell-white metricView">
        <MetricView
          title={"CO2 Emissions"}
          metrics={[
            {
              name: "average",
              value: results.CO2Emissions.avg,
              units: units.emissions.name,
            },
            {
              name: "peak",
              value: results.CO2Emissions.peak,
              units: units.emissions.name,
            },
            {
              name: "Total",
              value: results.CO2Emissions.total,
              units: units.emissions.name,
            },
          ]}
        />
      </GridElement>
    </CustomGrid>
  );
};

export default EmissionsView;
