import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function MapProvider({ position }) {
  return (
    <APIProvider apiKey={import.meta.env.VITE__GOOGLE_API_KEY}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={position}
        defaultZoom={12}
        mapId="DEMO_MAP_ID"
        center={position}
      >
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}
