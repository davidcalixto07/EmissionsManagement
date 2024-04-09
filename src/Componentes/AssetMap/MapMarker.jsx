import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const GetImage = () => {
  return '<img src="/Icons/pumpjack.svg" alt="Marker" tabindex="0" role="button" style="width: 24px; color: "red"; fill: "red";" />';
};

const MarkerIconText = (text, icon, iconColor) => {
  console.log("Icon", icon);
  return L.divIcon({
    className: "custom-marker",
    html: `<div class='div-icon'>
            ${GetImage()}
          <span style="color:#0505A0;font-weight:600;background-color:whitesmoke">${text}</span>
        </div>`,
  });
};

const MapMarker = ({
  position,
  label,
  children,
  icon = "pumpjack.svg",
  color = "red",
}) => {
  const iconText = MarkerIconText(label, icon, color); // Pass color to MarkerIconText
  return (
    <Marker icon={iconText} position={position}>
      <Popup>{children}</Popup>
    </Marker>
  );
};

export default MapMarker;
