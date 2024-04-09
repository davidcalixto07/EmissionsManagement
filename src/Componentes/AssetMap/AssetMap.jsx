import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./AssetMapStyles.css";
import L from "leaflet"; // Import L from Leaflet

function MapController({ coordinates }) {
  const map = useMap();
  const bounds = L.latLngBounds(coordinates);
  if (bounds?.getNorthEast())
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
  return null;
}

const AssetMap = ({ children, coordinates }) => {
  return (
    <MapContainer
      center={[6, -73.0046402]}
      zoom={8}
      style={{ height: "100%" }}
      attributionControl={false}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController coordinates={coordinates} />
      {children}
    </MapContainer>
  );
};

export default AssetMap;
