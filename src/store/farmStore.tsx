import React, { createContext, useReducer, useContext } from 'react';
import { Field } from '../components/Field';
import { updateFieldCropAndYields } from './utils';

type FarmProviderProps = {
  children: React.ReactNode;
};

type FarmState = {
  farmYield: number | null;
  selectedField: string;
  farmName: string;
  farmCenter: any;
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
      type: 'setFields';
      payload: Field[];
    }
  | {
      type: 'setSelectedField';
      payload: string;
    }
  | {
      type: 'setFieldCrop';
      payload: {
        fieldName: string;
        crop: Crop;
      };
    }
  | { type: 'resetFieldCrop'; payload: string };

const initialFarmState: FarmState = {
  farmYield: null,
  farmName: '',
  farmCenter: null,
  selectedField: '',
  fields: []
};

const initialMapContext: { farmState: FarmState; farmDispatch: React.Dispatch<FarmAction> } = {
  farmState: initialFarmState,
  farmDispatch: () => {}
};

const FarmContext = createContext(initialMapContext);

const farmReducer = (state: FarmState, action: FarmAction) => {
  switch (action.type) {
    case 'setFields':
      return {
        ...state,
        fields: action.payload
      };
    case 'setSelectedField':
      return {
        ...state,
        selectedField: action.payload
      };
    case 'setFieldCrop':
      return {
        ...state,
        ...updateFieldCropAndYields(state.fields, action.payload.fieldName, action.payload.crop)
      };
    case 'resetFieldCrop':
      return {
        ...state,
        ...updateFieldCropAndYields(state.fields, action.payload)
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
