import { useEffect, useState } from "react";
import { Children } from "react";
import AppTab from "./AppTab";

const AppTabs = ({ tabSelected, children }) => {
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    if (selectedTab === "")
      if (children.length) setSelectedTab(children[0].props.label);
      else setSelectedTab(children.props.label);
  }, [children]);

  function TabSelected(tab) {
    setSelectedTab(tab);
    tabSelected(tab);
  }

  return (
    <div className="Header-Tabs">
      {Children.map(children, (child) => (
        <AppTab
          label={child.props.label}
          disabled={child.props.disabled}
          clicked={() => TabSelected(child.props.label)}
          selected={selectedTab}
        >
          {child}
        </AppTab>
      ))}
    </div>
  );
};
export default AppTabs;
