import { useState } from "react";
import TabItem from "../../Componentes/AssetTabs/TabItem";
import AppTab from "./AppTab";

const AppsHeader = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <div className="App-Header">
      <div className="Header-Labels">
        <h3>{"Asset Name"}</h3>
        <span>Asset Description</span>
      </div>
      <div className="Header-Tabs">
        {tabs.map((label) => (
          <AppTab
            label={label}
            clicked={setSelectedTab}
            selected={selectedTab}
          />
        ))}
      </div>
    </div>
  );
};

export default AppsHeader;
