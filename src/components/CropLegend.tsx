import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@material-ui/core';

import { cropColors } from './Field';

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
        // onClose={handleClose}
      >
        {iterableColors.map(set => (
          <MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
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
