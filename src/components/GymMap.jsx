import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function GymMap({ position, gyms }) {
  return (
    <MapContainer  center={position} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>
      {gyms.map((gym) => (
        <Marker key={gym.id} position={[gym.lat, gym.lon]}>
          <Popup>{gym.tags.name || 'Gym'}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
