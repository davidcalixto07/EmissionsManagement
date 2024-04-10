import DatePicker from "../../Componentes/DatePicker/DatePicker";
import AppTab from "../Utils/AppTab";
import TabbedAppLayout from "../Utils/TabbedAppLayout";
import ConfigView from "./TeaViews/ConfigView";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TeaCreation from "./TeaCreation";
import Mapping from "./Mapping";

const TeaMananger = ({assetList}) => {
  const [viewDate, setViewDate] = useState(true);

  function HandleDateChange() {}

  return (
    <TabbedAppLayout title="Create and map your teas">
      <AppTab label="Add Tea">
        <TeaCreation />
      </AppTab>

      <AppTab label="Mapping Tea">
        <Mapping assetList={assetList}/>
      </AppTab>
    </TabbedAppLayout>
  );
};
export default TeaMananger;
