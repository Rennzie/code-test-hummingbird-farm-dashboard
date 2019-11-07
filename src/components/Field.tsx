import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
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

export type Crop = {
  name: string;
  expected_yield: number;
  disease_risk_factor: number;
  price_per_tonne: number;
};

type Props = {
  field: Field;
};

/**
 * Renders a field polygon to the map
 * - handles state of polygon when selected
 */
function Field({ field }: Props) {
  const {
    farmState: { selectedField },
    farmDispatch
  } = useFarmState();
  const [fillColor, setFillColor] = useState('#BDBDBD');
  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(() => {
    if (selectedField === field.name) {
      return setSelectedStyle({ color: '#32cd32', opacity: 1 });
    }
    return setSelectedStyle({ color: fillColor, opacity: 1 });
  }, [selectedField, field, setSelectedStyle, fillColor]);

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
      style={() => selectedStyle}
      fillColor={fillColor}
      fillOpacity={0.7}
      data={field.boundary}
      onclick={handleClick}
    />
  );
}

export default Field;
