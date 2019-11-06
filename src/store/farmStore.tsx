import React, { createContext, useReducer, useContext } from 'react';
import farm from '../data/farm.json';
import { Field } from '../components/Field';

type FarmProviderProps = {
  children: React.ReactNode;
};

type FarmState = {
  farmYield: number | null;
  selectedField: Field | null;
  fields: Field[];
};

export type Crop = {
  name: string;
  expected_yield: number;
  disease_risk_factor: number;
  price_per_tonne: number;
};

type FarmAction =
  | {
      type: 'updateFarmYield';
    }
  | {
      type: 'setSelectedField';
      payload: Field;
    }
  | {
      type: 'setFieldCrop';
      payload: {
        fieldName: string;
        crop: Crop;
      };
    };

const initialFarmState: FarmState = {
  farmYield: null,
  selectedField: null,
  fields: [...farm.fields]
};

const initialMapContext: { farmState: FarmState; farmDispatch: React.Dispatch<FarmAction> } = {
  farmState: initialFarmState,
  farmDispatch: () => {}
};

const FarmContext = createContext(initialMapContext);

const updateFarmYield = (fields: Field[]) => {
  const newYield = fields.reduce<any>((accumulator, { yield: fieldYield }) => {
    if (fieldYield) {
      console.log({ accumulator, fieldYield });
      return accumulator + fieldYield;
    }
    return accumulator;
  }, 0);

  return newYield;
};

const calcExpectedYield = (
  yieldAverage: number,
  fieldArea: number,
  cropRiskFactor: number,
  fieldDiseaseSusceptibility: number,
  cropPricePerTonne: number
) => {
  const expectedYield =
    ((yieldAverage * fieldArea) / (cropRiskFactor * fieldDiseaseSusceptibility)) *
    cropPricePerTonne;

  return Math.round(expectedYield);
};

const updateFieldsCrop = (crop: Crop, fields: Field[], fieldName: string) => {
  const updatedFields = fields.map(field => {
    if (field.name === fieldName) {
      const newYield = calcExpectedYield(
        crop.expected_yield,
        field.hectares,
        crop.disease_risk_factor,
        field.disease_susceptibility,
        crop.price_per_tonne
      );

      return { ...field, selectedCrop: crop, yield: newYield };
    }

    return field;
  });

  return updatedFields;
};

const updateFieldCropAndYields = (crop: Crop, fields: Field[], fieldName: string) => {
  const updatedFields = updateFieldsCrop(crop, fields, fieldName);
  const updatedFarmYield = updateFarmYield(updatedFields);

  return { farmYield: updatedFarmYield, fields: updatedFields };
};

const farmReducer = (state: FarmState, action: FarmAction) => {
  switch (action.type) {
    case 'setSelectedField':
      return {
        ...state,
        selectedField: action.payload
      };
    case 'setFieldCrop':
      return {
        ...state,
        ...updateFieldCropAndYields(action.payload.crop, state.fields, action.payload.fieldName)
      };
    case 'updateFarmYield':
      return {
        ...state,
        farmYield: updateFarmYield(state.fields)
      };
    default:
      // @ts-ignore
      throw new Error(`action type ${action.type} does not match any available action`);
  }
};

export function FarmProvider({ children }: FarmProviderProps) {
  // @ts-ignore
  const [farmState, farmDispatch] = useReducer(farmReducer, initialFarmState);

  return (
    <FarmContext.Provider value={{ farmState, farmDispatch }}>{children}</FarmContext.Provider>
  );
}

export const useFarmState = () => useContext(FarmContext);
