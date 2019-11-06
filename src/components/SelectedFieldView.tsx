import React, { useState, useEffect } from 'react';
import { Typography, Paper, TextField, MenuItem, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

// import { Field } from './Field';
import { Crop } from '../store/farmStore';
import { useFarmState } from '../store';
import crops from '../data/crops.json';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  selectedFieldWrapper: {
    margin: spacing(2),
    width: '100%',
    height: '200px'
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
    const nextCrop = crops.find(crop => crop.name === event.target.value);
    farmDispatch({
      type: 'setFieldCrop',
      payload: { fieldName: selectedField, crop: nextCrop as Crop }
    });
  };

  const handleRemoveCrop = () => {
    farmDispatch({ type: 'resetFieldCrop', payload: selectedField });
  };

  return (
    <Paper square className={classes.selectedFieldWrapper}>
      {activeField && (
        <>
          <Typography variant="h6">Selected Field: {activeField.name}</Typography>
          <Typography variant="body1">Area: {activeField.hectares}</Typography>
          <Typography variant="body1">Estimated yield: {activeField.yield}</Typography>
          <TextField
            fullWidth
            id="standard-select-currency"
            select
            label="Crop"
            value={activeField.selectedCrop ? activeField.selectedCrop.name : ''}
            onChange={handleSelectedCrop}
            helperText="Please select desired crop"
            margin="normal"
          >
            <MenuItem value="" />

            {crops.map((crop: Crop) => (
              <MenuItem key={crop.name} value={crop.name}>
                {crop.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="text" fullWidth onClick={handleRemoveCrop}>
            Remove crop
          </Button>
        </>
      )}
    </Paper>
  );
}

export default SelectedFieldView;
