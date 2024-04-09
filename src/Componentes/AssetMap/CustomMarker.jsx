import React, { useRef, useEffect } from "react";
import L from "leaflet";
import PcpIcon from "../../Assets/svgs/PcpSystem.svg";
import WellIcon from "../../Assets/svgs/Wells.png";
import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ position, type, label, children }) => {
  const getIcon = (parameter) => {
    switch (parameter) {
      case "PCP":
        return "Icons/progressive-cavity.png";
      case "ESP":
        return "Icons/ESPSystems.png";
      case "RPS":
        return "Icons/oil-pumpjack-extraction.png";
      case "SITE":
        return "Icons/Wells.png";
      case "DUMP":
        return "Icons/dumping.png";
      case "ME":
        return "Icons/MobileEmissions.png";
      default:
        return "Icons/Wells.png";
    }
  };

  const customIcon = L.divIcon({
    className: "custom-marker",
    html: `<div>
            <img src= ${getIcon(type)} alt="pump" height="42" width="42" ></img>
            <div class="marker-text">${label}</div>
        </div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });

  if (type === "Default") {
    return <></>;
  } else
    return (
      <Marker position={position} icon={customIcon}>
        <Popup>{children}</Popup>
      </Marker>
    );
};

export default CustomMarker;
