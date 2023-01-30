//receives an object... checks values and dont return the item if: its empty, or if an array - only has 0's
export const filterObjectEmptyData = (object) => {
  return Object.values(object).filter((each) => {
    const hasLength = typeof each === 'string' && each.length > 0;

    //specific to TeethChartCheckboxRow array
    const hasChecked =
      typeof each === 'object' &&
      each.reduce(function (x, y) {
        return x + y;
      }, 0) > 0;

    return hasLength === true || hasChecked === true;
  });
};
