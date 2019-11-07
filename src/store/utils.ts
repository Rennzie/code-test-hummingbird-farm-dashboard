import { Crop, Field } from '../components/Field';

/**
 * Sums the yields for all fields supplied to it
 * returns: new farm yield
 */
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

/**
 * Sets a given fields `selectedCrop` and  calculates the `yield`
 * returns all the fields, now updated
 */
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

/**
 * Sets a given fields `selectedCrop` and `yield` values to null and 0 respectivly
 * returns all the fields, now updated
 */
const resetFieldsCrop = (fields: Field[], fieldName: string) => {
  const updatedFields = fields.map(field => {
    if (field.name === fieldName) {
      return { ...field, selectedCrop: null, yield: 0 };
    }

    return field;
  });

  return updatedFields;
};

/**
 * Function to update a fields crop and the yield estimate of both the farm and the crop
 * - If no crop is provided, function will resest the fields `selectedCrop` and `yield` to null then update the farms yield
 */
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
