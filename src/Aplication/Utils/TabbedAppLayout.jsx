import { useState, useEffect } from "react";
import { Children } from "react";
import AppTab from "./AppTab";
import { Button } from "react-bootstrap";
import BarChart from "../../Componentes/Charts/BarChart";

const TabbedAppLayout = ({
  title = "",
  subtitle = "",
  appName,
  children,
  setSelected,
}) => {
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    document.title = appName ?? "West Hub";
    if (!children.length) setSelectedTab(children.props.label);
    else if (selectedTab === "") setSelectedTab(children[0].props.label);
    else if (!children.find((obj) => obj.props.label === selectedTab))
      setSelectedTab(children[0].props.label);
  }, [children]);

  useEffect(() => {
    if (setSelected) setSelected(selectedTab);
  }, [selectedTab]);

  if (!children) return null;

  return (
    <div id="AppContainer" className="Content-Container">
      <div className="App-Header">
        <div className="Header-Labels">
          <h4 style={{ marginBottom: 0 }}>{title}</h4>
          {subtitle}
        </div>
        {
          <div className="Header-Tabs">
            {Children.map(children, (child) => (
              <AppTab
                label={child.props.label}
                disabled={child.props.disabled}
                clicked={() => setSelectedTab(child.props.label)}
                selected={selectedTab}
              >
                {child}
              </AppTab>
            ))}
          </div>
        }
        {/* <Button></Button> */}
      </div>
      {Children.map(children, (child) => {
        if (selectedTab === child.props.label) return child.props.children;
      })}
    </div>
  );
};

export default TabbedAppLayout;
