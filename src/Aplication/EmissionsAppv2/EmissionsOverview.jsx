import BarChart from "../../Componentes/Charts/BarChart";
import DatePicker from "../../Componentes/DatePicker/DatePicker";
import Heatmapper from "./Heatmapper";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";
import MetricDisplay from "./MetricDisplay";
import EventsTable from "../../Componentes/EventsTable/EventsTable";
import MultiTimeseries from "../../Componentes/Charts/MultiTimeseries";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import DirectEmissionsModal from "./DirectEmissionsModal";

const EmissionsOverview = () => {
  const [, , , units, , teasList, coordinates, imageSrc, loading, setDates] =
    useOutletContext();

  const [totalCo2, setTotalCo2] = useState(0);
  const [totalEq, setTotalEq] = useState(0);
  const [directModal, setDirectModal] = useState(false);

  const [ts, setTs] = useState([]);
  const nav = useNavigate();

  function setDate(date) {
    setDates(date);
  }

  function handleCloseModal() {
    setDirectModal(false);
  }

  useEffect(() => {
    const totalCo2 = teasList.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.avgEmissions ?? 0),
      0
    );
    const totalEq = teasList.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.avgEqEmissions ?? 0),
      0
    );
    setTotalCo2(totalCo2);
    setTotalEq(totalEq);
    const ts = teasList.length ? teasList[0].timeSerie ?? [] : [];
    setTs(ts);
  }, [teasList]);

  return (
    <CustomGrid
      className={"Overview-100"}
      rows={11}
      cols={13}
      loading={loading}
    >
      <GridElement cols={6} className="grid-cell-white" com="Title">
        <h2 className="Overview-title">Plant Emissions Overview</h2>
      </GridElement>

      <GridElement cols={7} rows={6} className="grid-cell-white" com="Heat Map">
        <Heatmapper
          teas={teasList}
          coordinates={coordinates}
          imgsrc={imageSrc}
        />
      </GridElement>

      <GridElement
        cols={6}
        rows={1}
        className="grid-cell-white center"
        com="Date Picker"
      >
        <DatePicker setDate={setDate} />
      </GridElement>

      <GridElement
        cols={3}
        rows={1}
        className="grid-cell-white"
        com="Emissions eq Totalizer"
      >
        <MetricDisplay
          name={
            <span>
              Total CO<s>2</s> Emissions
            </span>
          }
          value={units.emissions.conv(totalCo2)}
          units={units.emissions.name}
        />
      </GridElement>

      <GridElement
        cols={3}
        rows={1}
        className="grid-cell-white"
        com="Emissions Totalizer"
      >
        <MetricDisplay
          name={<span>Total Emissions</span>}
          value={units.emissions.conv(totalEq)}
          units={units.emissions.name}
        />
      </GridElement>

      <GridElement
        cols={6}
        rows={4}
        className="grid-cell-white"
        com="Emissions Bar chart"
      >
        <BarChart
          legend="Contribution per smoker"
          labels={teasList.map((a) => a.name)}
          data={[
            {
              label: `Total (${units.emissions.name})`,
              data: teasList.map((a) => units.emissions.conv(a.avgEqEmissions)),
            },
          ]}
          barWidth={32}
          legendPos="bottom"
          horizontal
        />
      </GridElement>

      <GridElement
        cols={7}
        rows={5}
        className="grid-cell-white"
        com="Time serie"
      >
        <MultiTimeseries
          values={[
            {
              label: "CO2",
              t: ts.map((t) => t._time),
              v: ts.map((t) => units.emissions.conv(t.emissions.anh.C02)),
              color: "#0f2d57",
              Bcolor: "#0f2d5760",
              f: true,
            },
            {
              label: "methane",
              t: ts.map((t) => t._time),
              v: ts.map((t) => units.emissions.conv(t.emissions.anh.methane)),
              color: "#6f2dA7",
              Bcolor: "#6f2dA760",
              f: true,
            },
            {
              label: "CO2e",
              t: ts.map((t) => t._time),
              v: ts.map((t) => units.emissions.conv(t.emissions.anh.CO2e)),
              color: "#03D707",
              Bcolor: "#03D70760",
              f: true,
            },
            {
              label: "NOx",
              t: ts.map((t) => t._time),
              v: ts.map((t) => units.emissions.conv(t.emissions.anh.NOx)),
              color: "#6f2d07",
              Bcolor: "#6f2d0760",
              f: true,
            },
          ]}
          title={`Emissions (${units.emissions.name})`}
          freeRatio
        ></MultiTimeseries>
      </GridElement>

      <GridElement
        cols={6}
        rows={3}
        className="grid-cell-white"
        style={{ display: "inline" }}
      >
        <h5>Emissions Events</h5>
        <EventsTable
          eventsList={[
            {
              id: "433",
              severity: 20,
              timestamp: "30-01-24 20:52",
              entityId: 1,
              description: "Emissions too high",
            },
            {
              id: "435",
              severity: 20,
              timestamp: "01-01-24 10:43",
              entityId: 1,
              description: "Emissions too high",
            },
          ]}
          totalAssetList={[{ assetId: 1, name: "HP Flare" }]}
          loading={loading}
        />
      </GridElement>

      <GridElement cols={3} rows={1} className="grid-cell-white center">
        <button className="ReportButton" onClick={() => setDirectModal(true)}>
          Direct Emissions Data
        </button>
      </GridElement>

      <GridElement
        cols={3}
        rows={1}
        className="grid-cell-white"
        padding={"0.4rem"}
        style={{ gap: "0.4rem" }}
      >
        Reports:
        <button
          onClick={() => nav("/EmissionsReport/anh", { state: { data: {} } })}
          className="ReportButton"
        >
          ANH
        </button>
        <button
          onClick={() =>
            nav("/EmissionsReport/inventory", { state: { data: {} } })
          }
          className="ReportButton"
        >
          Inventory
        </button>
      </GridElement>
      <DirectEmissionsModal
        isOpen={directModal}
        onClose={handleCloseModal}
        coordinates={coordinates}
        imgSrc={imageSrc}
      />
    </CustomGrid>
  );
};

export default EmissionsOverview;
