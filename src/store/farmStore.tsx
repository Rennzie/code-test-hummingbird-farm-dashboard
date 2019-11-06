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

const updateFieldsCrop = (crop: Crop, fields: Field[], fieldName: string) => {
  const updatedFields = fields.map(field => {
    if (field.name === fieldName) {
      return { ...field, selectedCrop: crop };
    }
    return field;
  });

  return updatedFields;
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
        fields: updateFieldsCrop(action.payload.crop, state.fields, action.payload.fieldName)
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
