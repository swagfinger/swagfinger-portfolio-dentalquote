export const QuoteFormGetData = async () => {
  const response = await fetch(
    'https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/users/myid.json'
  );
  const responseData = await response.json();
  console.log('responseData: ', responseData); //returns an object with jobTypes and jobTypesComponent

  return responseData;
};
