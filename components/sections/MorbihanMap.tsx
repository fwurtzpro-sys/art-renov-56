"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { zones } from "@/data/zones";
import { company } from "@/data/company";

function pinIcon(variant: "hq" | "zone") {
  const size = variant === "hq" ? 34 : 22;
  const fill = variant === "hq" ? "#2f6fa3" : "#0f1e30";
  const html = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C7.03 0 3 4.03 3 9c0 6.5 9 15 9 15s9-8.5 9-15c0-4.97-4.03-9-9-9z" fill="${fill}" stroke="#f8f7f4" stroke-width="1.2"/>
      <circle cx="12" cy="9" r="3.4" fill="#f8f7f4"/>
    </svg>`;

  return L.divIcon({
    html,
    className: "art-renov-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

export function MorbihanMap() {
  const hqIcon = useMemo(() => pinIcon("hq"), []);
  const zoneIcon = useMemo(() => pinIcon("zone"), []);

  return (
    <MapContainer
      center={[company.lat, company.lng]}
      zoom={9}
      scrollWheelZoom={false}
      className="h-full w-full"
      attributionControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      <Circle
        center={[company.lat, company.lng]}
        radius={40000}
        pathOptions={{
          color: "#2f6fa3",
          fillColor: "#2f6fa3",
          fillOpacity: 0.06,
          weight: 1,
        }}
      />

      <Marker position={[company.lat, company.lng]} icon={hqIcon}>
        <Popup>
          <strong>{company.name}</strong>
          <br />
          {company.address}, {company.postalCode} {company.city}
        </Popup>
      </Marker>

      {zones.map((zone) => (
        <Marker
          key={zone.slug}
          position={[zone.lat, zone.lng]}
          icon={zoneIcon}
        >
          <Popup>{zone.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
