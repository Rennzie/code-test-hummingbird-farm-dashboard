import React, { useState, useEffect } from 'react';
import { Typography, Paper, TextField, MenuItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

// import { Field } from './Field';
import { Crop } from '../store/farmStore';
import { useFarmState } from '../store';
import crops from '../data/crops.json';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  selectedFieldWrapper: {
    padding: spacing(2),
    boxSizing: 'border-box',
    width: '100%',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
}));

function SelectedFieldView() {
  const classes = useStyles({});
  const {
    farmState: { selectedField, fields },
    farmDispatch
  } = useFarmState();

  const [activeField, setActiveField] = useState();

  useEffect(() => {
    if (selectedField) {
      const nextField = fields.find(field => field.name === selectedField);
      setActiveField(nextField);
    }
  }, [setActiveField, fields, selectedField]);

  const handleSelectedCrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'remove-crop') {
      farmDispatch({ type: 'resetFieldCrop', payload: selectedField });
    } else {
      const nextCrop = crops.find(crop => crop.name === event.target.value);

      farmDispatch({
        type: 'setFieldCrop',
        payload: { fieldName: selectedField, crop: nextCrop as Crop }
      });
    }
  };

  return (
    <Paper square className={classes.selectedFieldWrapper}>
      {activeField ? (
        <>
          <Typography variant="h6">{activeField.name}</Typography>
          <div className={classes.detailsWrapper}>
            <Typography variant="body1">Area: {activeField.hectares}</Typography>
            <Typography variant="body1">Estimated yield value: £{activeField.yield}</Typography>
          </div>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="Crop"
            value={activeField.selectedCrop ? activeField.selectedCrop.name : ''}
            onChange={handleSelectedCrop}
            helperText={activeField.selectedCrop ? 'Change your crop' : 'Choose a crop'}
            margin="normal"
          >
            <MenuItem value="" />

            {crops.map((crop: Crop) => (
              <MenuItem key={crop.name} value={crop.name}>
                {crop.name}
              </MenuItem>
            ))}
            <MenuItem disabled={!activeField.selectedCrop} value="remove-crop">
              Remove Crop
            </MenuItem>
          </TextField>
        </>
      ) : (
        <Typography component="i">Select a field to see its details</Typography>
      )}
    </Paper>
  );
}

export default SelectedFieldView;
