import { useEffect, useState } from 'react';
import { TeethChartCheckboxGroup } from '../components/forms/TeethChartCheckboxGroup';

export const Intro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const response = await fetch(
        'https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json'
      );

      const data = await response.json();

      //process returned data from firebase - firebase returns an object with key value and inside is the data we want
      const savedEntries = [];

      for (const key in data) {
        const entry = {
          id: key,
          ...data[key],
        };

        savedEntries.push(entry);
      }

      console.log({ savedEntries });
      setIsLoading(false);
      setFetchedData(savedEntries);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>loading...</p>
      </section>
    );
  }

  return (
    <div>
      <h1>Quotes</h1>

      <div>
        <ul>
          {fetchedData
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(({ date, name, email, thingsToQuote, id }, index) => {
              return (
                <li key={index} style={{ marginBottom: '70px' }}>
                  <div>
                    {date} | {name} | {email}
                  </div>
                  <div>quote id: {id}</div>
                  {Object.entries(thingsToQuote).map(([key, value], index) => {
                    if (typeof value === 'object') {
                      return (
                        <TeethChartCheckboxGroup
                          {...value}
                          label={key}
                          key={key}
                          readOnly={true}
                        />
                      );
                    }
                  })}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
