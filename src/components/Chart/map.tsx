"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const CityMap = ({ cities }: any) => {
  const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <MapContainer center={[-33.4372, -70.6506]} zoom={5} style={{ height: "400px", width: "100%" }}>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {/* Asegúrate de que cities es un array antes de llamar a .map() */}
    {Array.isArray(cities) && cities.map((city) => (
        <Marker
            key={city.name}
            position={[city.latitude, city.longitude]}
            icon={markerIcon}
        >
            <Popup>
                {city.name}<br />Cantidad: {city.count}
            </Popup>
        </Marker>
    ))}
    </MapContainer>
  );
};

export default CityMap;
