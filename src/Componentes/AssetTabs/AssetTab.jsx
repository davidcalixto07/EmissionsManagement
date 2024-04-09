import React, { useContext } from "react";
import TabItem from "./TabItem";
import { useState } from "react";

const AssetTab = (props) => {
    const [activeTab, setActiveTab] = useState("Monitor");

    function HandleClicked(label)
    {
        setActiveTab(label);
    }

    const items = 
    [
        {label: "Monitor"},
        {label: "Efficiency"},
        {label: "Config"},
        {label: "Emissions"},
    ]

    return (
        <div className="App-Header">
            <div className="Header-Labels">
                <h2>{props.selectedAsset?.name??"No Asset Selected"}</h2>
                <span>{props.subtitle}</span>
            </div>
            <div className="Header-Tabs"> 
                <TabItem label = "Monitor" link= {props.baseRoute + '/Monitoring'} selected={activeTab} clicked={HandleClicked}/>
                <TabItem label = "Efficiency" link= {props.baseRoute + '/Efficiency'} selected={activeTab} clicked={HandleClicked}/>
                <TabItem label = "Emissions" disabled clicked={HandleClicked}/>
            </div>
        </div>
    );
}

export default AssetTab;
