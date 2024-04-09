import DatePicker from "../../Componentes/DatePicker/DatePicker";
import AppTab from "../Utils/AppTab";
import TabbedAppLayout from "../Utils/TabbedAppLayout";
import ConfigView from "./TeaViews/ConfigView";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TeaCreation from "./TeaCreation";

const TeaMananger = () => {
  const [viewDate, setViewDate] = useState(true);

  function HandleDateChange() {}

  return (
    <TabbedAppLayout title="Create and map your teas">
      <AppTab label="Add Tea">
        <TeaCreation />
      </AppTab>

      <AppTab label="Mapping Tea">
        <h1>Mapeo</h1>
      </AppTab>
    </TabbedAppLayout>
  );
};
export default TeaMananger;
