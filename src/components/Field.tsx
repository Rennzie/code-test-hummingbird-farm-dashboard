import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { Crop } from '../store/farmStore';
import { useFarmState } from '../store';

export type Field = {
  name: string;
  boundary: any;
  hectares: number;
  disease_susceptibility: number;
  selectedCrop?: Crop;
  yield?: number;
};

type Props = {
  field: Field;
};

const cropColors = new Map([
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

function Field({ field }: Props) {
  const { farmDispatch } = useFarmState();
  const [fillColor, setFillColor] = useState('blue');

  useEffect(() => {
    if (field.selectedCrop) {
      const color = cropColors.get(field.selectedCrop.name);
      if (color) {
        setFillColor(color);
      }
    }
  }, [field]);

  const handleClick = () => {
    farmDispatch({ type: 'setSelectedField', payload: field });
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
