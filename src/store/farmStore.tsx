import React, { createContext, useReducer, useContext } from 'react';
import { Field, Crop } from '../components/Field';
import { updateFieldCropAndYields } from './utils';

type FarmState = {
  farmYield: number | null;
  selectedField: string;
  farmName: string;
  farmCenter: any;
  fields: Field[];
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

const initialFarmContext: { farmState: FarmState; farmDispatch: React.Dispatch<FarmAction> } = {
  farmState: initialFarmState,
  farmDispatch: () => {}
};

const FarmContext = createContext(initialFarmContext);

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

type FarmProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides the default state and dispatch for the farm
 * Allows children to access the state via the `useFarmState` hook
 */
export function FarmProvider({ children }: FarmProviderProps) {
  // @ts-ignore
  const [farmState, farmDispatch] = useReducer(farmReducer, initialFarmState);

  return (
    <FarmContext.Provider value={{ farmState, farmDispatch }}>{children}</FarmContext.Provider>
  );
}

/**
 * For access the farm state and dispatch
 * - returns and object with `farmState` and `farmDispatch`
 */
export const useFarmState = () => useContext(FarmContext);
