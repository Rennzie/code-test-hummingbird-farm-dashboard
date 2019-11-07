import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@material-ui/core';

export const cropColors = new Map([
  ['Winter Wheat - Reflectance', '#FFCDD2'],
  ['Winter Wheat - Sundance', '#F44336'],
  ['Winter Wheat - Skyfall', '#C62828'],
  ['Winter Wheat - Dickens', '#D50000'],
  ['Sprint Wheat - Granary', '#795548'],
  ['Sprint Wheat - Belepi', '#3E2723'],
  ['Winter Barley - California', '#A5D6A7'],
  ['Winter Barley - Belfry', '#388E3C'],
  ['Winter Barley - Craft', '#1B5E20'],
  ['Winter OSR - Harper', '#FDD835']
]);

type ColorSet = { color: string; name: string };

function CropLegend() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [iterableColors, setIterableColors] = useState([{ name: '', color: '' }]);

  useEffect(() => {
    const colorArray: ColorSet[] = [];
    cropColors.forEach((color, name) => colorArray.push({ name, color }));
    setIterableColors(colorArray);
  }, [setIterableColors]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Crop Legend</Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="menu"
      >
        {iterableColors.map(set => (
          <MenuItem key={set.name} style={{ display: 'flex', justifyContent: 'center' }}>
            <ListItemIcon>
              <div style={{ width: 20, height: 20, backgroundColor: set.color }} />
            </ListItemIcon>
            <ListItemText primary={set.name} />
          </MenuItem>
        ))}
        <MenuItem onClick={handleClose}>Close Menu</MenuItem>
      </Menu>
    </>
  );
}

export default CropLegend;
