import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { Field, DashPanel } from '.';
import { useGetFarm } from '../api';
import { useFarmState } from '../store';

import farm from '../data/farm.json';

const useStyles = makeStyles(() => ({
  appWrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh'
  }
}));

function App() {
  const classes = useStyles({});
  const {
    farmState: { fields }
  } = useFarmState();

  const { data, loading } = useGetFarm();

  console.log({ data, loading });

  return (
    <main className={classes.appWrapper}>
      {loading ? (
        <CircularProgress style={{ margin: '0 auto' }} size={100} />
      ) : (
        <>
          <DashPanel farmName={farm.name} />
          <LeafletMap
            style={{ width: '70vw', height: '100vh' }}
            // @ts-ignore
            center={farm.centre.coordinates}
            zoom={14}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {fields.map(field => (
              <Field key={field.name} field={field} />
            ))}
          </LeafletMap>
        </>
      )}
    </main>
  );
}

export default App;
