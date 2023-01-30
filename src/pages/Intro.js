import { useEffect, useState } from 'react';
import { TeethChartCheckboxGroup } from '../components';
import { filterObjectEmptyData } from '../utilities/filterObjectEmptyData';

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
        <ul style={{ margin: 0, padding: 0 }}>
          {/* go through fetched data: quotes table*/}
          {fetchedData
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(({ date, name, email, thingsToQuote, id }, index) => {
              return (
                thingsToQuote && (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      border: '1px solid',
                      marginBottom: '15px',
                      padding: '30px',
                    }}
                  >
                    <div>
                      {date} | {name} | {email}
                    </div>
                    <div>quote id: {id}</div>

                    {/* each quote has a thingsToQuote property - go through this list*/}
                    {Object.entries(thingsToQuote).map(
                      ([key, value], index) => {
                        //-------------------------------------------------------
                        // do a dont show if empty object without unique data
                        const filteredData = filterObjectEmptyData(value);

                        //-------------------------------------------------------
                        return (
                          filteredData.length > 0 && (
                            <div key={index}>
                              <h2>{key}</h2>
                              <TeethChartCheckboxGroup
                                {...value}
                                label={key}
                                key={key}
                                readOnly={true}
                              />
                            </div>
                          )
                        );
                      }
                    )}
                  </li>
                )
              );
            })}
        </ul>
      </div>
    </div>
  );
};
