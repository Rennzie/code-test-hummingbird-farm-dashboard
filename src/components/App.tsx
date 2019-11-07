import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { Field, DashPanel, CropLegend } from '.';
import { useGetFarm } from '../api';
import { useFarmState } from '../store';

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
    farmState: { fields },
    farmDispatch
  } = useFarmState();

  const { data: farmData, loading: loadingFarm } = useGetFarm();

  useEffect(() => {
    if (farmData) {
      farmDispatch({ type: 'setFields', payload: farmData.farm.fields });
    }
  }, [farmData, farmDispatch]);

  return (
    <main className={classes.appWrapper}>
      {loadingFarm ? (
        <CircularProgress style={{ margin: '0 auto' }} size={100} />
      ) : (
        <>
          {farmData && (
            <>
              <DashPanel farmName={farmData.farm.name} />
              <LeafletMap
                style={{ width: '70vw', height: '100vh' }}
                // @ts-ignore
                center={farmData.farm.centre.coordinates}
                zoom={14}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {fields.map(field => (
                  <Field key={field.name} field={field} />
                ))}
              </LeafletMap>
              <CropLegend />
            </>
          )}
        </>
      )}
    </main>
  );
}

export default App;
