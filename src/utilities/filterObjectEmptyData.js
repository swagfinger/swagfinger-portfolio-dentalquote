//basically tries to find any data that exists in object
//receives an object... checks values and dont return the item if: its empty, or if an array - only has 0's
export const filterObjectEmptyData = (object) => {
  console.log(
    '------------------------------------------------------------------------'
  );
  console.log('filterObjectEmptyData');

  return Object.values(object).filter((each) => {
    const hasLength = typeof each === 'string' && each.length > 0;

    const isNotFalse = typeof each === 'boolean' && each !== false;

    // checking array values added up greater than 0
    const hasCheckedArray =
      Array.isArray(each) &&
      each.reduce(function (x, y) {
        return x + y;
      }, 0) > 0;

    //if it is an object
    const hasCheckedObject =
      typeof each === 'object' &&
      !Array.isArray(each) &&
      //go through the values associated with each key of the object and check if it has some value
      Object.values(each).some((value) => {
        return (value !== null || value !== undefined) && value > 0;
      });
    console.log('hasLength: ', hasLength);
    console.log('isNotFalse: ', isNotFalse);
    console.log('hasCheckedArray: ', hasCheckedArray);
    console.log('hasCheckedObject: ', hasCheckedObject);
    console.log(
      '------------------------------------------------------------------------'
    );

    return (
      hasLength === true ||
      isNotFalse === true ||
      hasCheckedArray === true ||
      hasCheckedObject === true
    );
  });
};
