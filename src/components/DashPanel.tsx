import React, { useState, useEffect } from 'react';
import { Typography, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BarChart, BarSeries } from 'reaviz';

import { SelectedFieldView, CropLegend, Field } from '.';
import { Field as FieldType } from './Field';
import { useFarmState } from '../store';

const useStyles = makeStyles(() => ({
  dashPanel: {
    padding: 26,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30vw',
    height: '100vh'
  }
}));

type Props = {
  farmName: string;
};

/**
 * Renders the dashboard for the farm in a narrow vertical panel
 * Displays:
 *  - Farm name
 *  - Estimated farm yield
 *  - Details of the selected farm
 *  - bar chart with estimated yield values per field
 */
function DashPanel({ farmName }: Props) {
  const classes = useStyles({});
  const {
    farmState: { farmYield, fields, selectedField },
    farmDispatch
  } = useFarmState();

  const [chartData, setChartData] = useState([{ key: '', data: 0 }]);

  useEffect(() => {
    const newChartData = fields.map(field => ({
      key: field.name,
      data: field.yield ? field.yield : 0
    }));

    setChartData(newChartData);
  }, [fields, setChartData]);

  const handleSelectField = (event: React.ChangeEvent<HTMLInputElement>) => {
    farmDispatch({ type: 'setSelectedField', payload: event.target.value });
  };

  return (
    <section className={classes.dashPanel}>
      <Typography variant="h4">{farmName}</Typography>
      <Typography variant="h6">Estimated farm yield value: £{farmYield}</Typography>
      {/* ---------------------
              CROP HANDLER
          ----------------------- */}
      <TextField
        id="select-field"
        select
        fullWidth
        label="Field"
        value={selectedField}
        onChange={handleSelectField}
        helperText="Select a field to view its details below"
        margin="normal"
      >
        <MenuItem value="" />

        {fields.map((field: FieldType) => (
          <MenuItem key={field.name} value={field.name}>
            {field.name}
          </MenuItem>
        ))}
      </TextField>
      <SelectedFieldView />
      <CropLegend />
      <div>
        <Typography align="center">Estimated yield value per field</Typography>
        <BarChart
          series={<BarSeries colorScheme="pastel1" />}
          height={300}
          width={400}
          data={chartData}
        />
      </div>
    </section>
  );
}

export default DashPanel;
