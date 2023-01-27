import { useEffect, useState } from 'react';

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
      <h1>list</h1>

      <div>
        <ul>
          {fetchedData.map(({ name, email }, index) => {
            return (
              <li key={index}>
                {name} | {email}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
