import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { BarChart } from 'reaviz';
import 'leaflet/dist/leaflet.css';

import { useFarmState } from '../store';
import { Field, SelectedFieldView } from '.';

import farm from '../data/farm.json';
// import crops from './data/crops.json';

const useStyles = makeStyles(() => ({
  appWrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  dashPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30vw',
    height: '100vh'
  }
}));

function App() {
  const classes = useStyles({});
  const {
    farmState: { farmYield, fields }
  } = useFarmState();

  const [chartData, setChartData] = useState([{ key: '', data: 0 }]);

  useEffect(() => {
    const newChartData = fields.map(field => ({
      key: field.name,
      data: field.yield ? field.yield : 0
    }));

    setChartData(newChartData);
  }, [fields, setChartData]);

  return (
    <main className={classes.appWrapper}>
      <section className={classes.dashPanel}>
        <Typography variant="h4">{farm.name}</Typography>
        <Typography variant="h6">Estimated Yield: £{farmYield}</Typography>
        <SelectedFieldView />
        <BarChart height={300} width={300} data={chartData} />
      </section>
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
    </main>
  );
}

export default App;
