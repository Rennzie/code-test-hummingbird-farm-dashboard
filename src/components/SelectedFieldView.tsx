import React, { useState, useEffect } from 'react';
import { Typography, Paper, TextField, MenuItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

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
    farmState: { selectedField },
    farmDispatch
  } = useFarmState();

  const [values, setValues] = useState({
    area: 0,
    name: '',
    selectedCrop: ''
  });

  useEffect(() => {
    if (selectedField) {
      console.log(selectedField);
      const newValues = {
        area: selectedField.hectares,
        name: selectedField.name,
        selectedCrop: selectedField.selectedCrop ? selectedField.selectedCrop.name : ''
      };

      setValues(newValues);
    }
  }, [selectedField, setValues]);

  const handleSelectedCrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextCrop = crops.find(crop => crop.name === event.target.value);
    setValues(val => ({ ...val, selectedCrop: event.target.value }));
    farmDispatch({
      type: 'setFieldCrop',
      payload: { fieldName: values.name, crop: nextCrop as Crop }
    });
  };

  return (
    <Paper square className={classes.selectedFieldWrapper}>
      {selectedField && (
        <>
          <Typography variant="h6">Selected Field: {values.name}</Typography>
          <Typography variant="body1">Area: {values.area}</Typography>
          <TextField
            fullWidth
            id="standard-select-currency"
            select
            label="Crop"
            value={values.selectedCrop}
            onChange={handleSelectedCrop}
            // SelectProps={{
            //   MenuProps: {
            //     className: classes.menu
            //   }
            // }}
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
        </>
      )}
    </Paper>
  );
}

export default SelectedFieldView;
