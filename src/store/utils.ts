import { Crop, Field } from '../components/Field';

const updateFarmYield = (fields: Field[]) => {
  const newYield = fields.reduce((accumulator, { yield: fieldYield }) => {
    if (fieldYield) {
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

const resetFieldsCrop = (fields: Field[], fieldName: string) => {
  const updatedFields = fields.map(field => {
    if (field.name === fieldName) {
      return { ...field, selectedCrop: null, yield: 0 };
    }

    return field;
  });

  return updatedFields;
};

// eslint-disable-next-line import/prefer-default-export
export const updateFieldCropAndYields = (fields: Field[], fieldName: string, crop?: Crop) => {
  let updatedFields: Field[];
  if (crop) {
    updatedFields = updateFieldsCrop(crop, fields, fieldName);
  } else {
    updatedFields = resetFieldsCrop(fields, fieldName);
  }

  const updatedFarmYield = updateFarmYield(updatedFields);

  return { farmYield: updatedFarmYield, fields: updatedFields };
};
