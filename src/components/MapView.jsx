import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";


const vehicleIcon = L.icon({
  iconUrl: "/sport-car.png",
//   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],

  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41]
});

const MapView = ({ route, currentIndex }) => {

  const currentPos = route[currentIndex];

  return (
    <MapContainer
      center={[currentPos.latitude, currentPos.longitude]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      <Polyline
        positions={route.map((point) => [point.latitude, point.longitude])}
        color="blue"
        weight={3}
      />


      <Marker
        position={[currentPos.latitude, currentPos.longitude]}
        icon={vehicleIcon}
      />
    </MapContainer>
  );
};

export default MapView;
