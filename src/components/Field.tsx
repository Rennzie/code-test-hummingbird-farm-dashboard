import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { Crop } from '../store/farmStore';
import { cropColors } from './CropLegend';
import { useFarmState } from '../store';

export type Field = {
  name: string;
  boundary: any;
  hectares: number;
  disease_susceptibility: number;
  selectedCrop?: Crop | null;
  yield?: number;
};

type Props = {
  field: Field;
};

function Field({ field }: Props) {
  const { farmDispatch } = useFarmState();
  const [fillColor, setFillColor] = useState('#BDBDBD');

  useEffect(() => {
    if (field.selectedCrop) {
      const color = cropColors.get(field.selectedCrop.name);
      if (color) {
        setFillColor(color);
      }
    } else {
      setFillColor('#BDBDBD');
    }
  }, [field]);

  const handleClick = () => {
    farmDispatch({ type: 'setSelectedField', payload: field.name });
  };
  return (
    <GeoJSON
      fillColor={fillColor}
      strokeColor={fillColor}
      fillOpacity={1}
      strokeOpacity={1}
      data={field.boundary}
      onclick={handleClick}
    />
  );
}

export default Field;
