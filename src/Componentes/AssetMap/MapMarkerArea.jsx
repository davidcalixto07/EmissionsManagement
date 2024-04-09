import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const MarkerIconText = (text) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div class='div-icon'>
        <img src="/Icons/EmissionsManagement.png"  alt="Marker" tabindex="0" role="button" style="width: 24px;"/>
        <span style="color:#0505A0;font-weight:600;background-color:whitesmoke">${text}</span>
      </div>`,
  });
};

const MapMarkerArea = ({ position, label, children }) => {
  return (
    <div>
      <Marker icon={MarkerIconText(label)} position={position} onClick>
        <Popup>{children}</Popup>
      </Marker>
    </div>
  );
};

export default MapMarkerArea;
