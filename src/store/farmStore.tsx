import React, { createContext, useReducer, useContext } from 'react';

type FarmProviderProps = {
  children: React.ReactNode;
};

type FarmState = {
  farmYield: number | null;
  selectedField: number | null;
  fields?: Field[];
};

type Field = {
  name: string;
  boundary: any;
  hectares: number;
  disease_susceptibility: number;
  selectedCrop?: Crop;
  yield?: number | null;
};

type Crop = {
  name: string;
  expected_yield: number;
  disease_risk_factor: number;
  price_per_tonne: number;
};

type FarmAction =
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
    };

const initialFarmState: FarmState = {
  farmYield: null,
  selectedField: null,
  fields: []
};

const initialMapContext: { farmState: FarmState; farmDispatch: React.Dispatch<FarmAction> } = {
  farmState: initialFarmState,
  farmDispatch: () => {}
};

const FarmContext = createContext(initialMapContext);

const farmReducer = (state: FarmState, action: FarmAction) => {
  switch (action.type) {
    case 'setSelectedField':
      return {
        ...state
      };
    case 'setFieldCrop':
      return {
        ...state
      };
    default:
      // @ts-ignore
      throw new Error(`action type ${action.type} does not match any available action`);
  }
};

export function FarmProvider({ children }: FarmProviderProps) {
  const [farmState, farmDispatch] = useReducer(farmReducer, initialFarmState);

  return (
    <FarmContext.Provider value={{ farmState, farmDispatch }}> {children}</FarmContext.Provider>
  );
}

export const useFarmState = () => useContext(FarmContext);
