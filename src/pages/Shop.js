import { useHistory } from 'react-router-dom';
import { QuoteForm } from '../components/forms';
export const Shop = () => {
  const history = useHistory();

  const onAddQuoteHandler = async (collectedData) => {
    console.log(collectedData);
    await fetch(
      'https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json',
      {
        method: 'POST',
        body: JSON.stringify(collectedData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    //redirect
    history.replace('/');
  };

  return (
    <section>
      <h1>shop</h1>
      <QuoteForm onAdd={onAddQuoteHandler} />
    </section>
  );
};
