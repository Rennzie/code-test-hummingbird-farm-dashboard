import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { Crop } from '../store/farmStore';
import { useFarmState } from '../store';

export type Field = {
  name: string;
  boundary: any;
  hectares: number;
  disease_susceptibility: number;
  selectedCrop?: Crop;
  yield?: number | null;
};

type Props = {
  field: Field;
};

function Field({ field }: Props) {
  const { farmDispatch } = useFarmState();

  const handleClick = () => {
    farmDispatch({ type: 'setSelectedField', payload: field.name });
  };
  return <GeoJSON fillColor="red" data={field.boundary} onclick={handleClick} />;
}

export default Field;
