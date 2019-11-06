import React from 'react';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import farm from '../data/farm.json';
// import crops from './data/crops.json';

function App() {
  return (
    <LeafletMap
      style={{ width: '100vh', height: '50vw' }}
      // @ts-ignore
      center={farm.centre.coordinates}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {farm.fields.map(field => (
        <GeoJSON
          onclick={() => console.log(`You clicked field ${field.name}`)}
          key={field.name}
          // @ts-ignore
          data={field.boundary}
        />
      ))}
    </LeafletMap>
  );
}

export default App;
