import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { fetchPeople, type Person } from '../services/swapi';

function TablePage() {
  const navigate = useNavigate();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadPeople = async () => {
      try {
        setError('');
        const result = await fetchPeople(controller.signal);
        setPeople(result);
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unable to load Star Wars data.',
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadPeople();

    return () => controller.abort();
  }, []);

  return (
    <PageShell className="table-shell">
      <section aria-labelledby="table-title">
        <div className="table-toolbar">
          <div>
            <p className="eyebrow">Data table</p>
            <h1 id="table-title">Star Wars people</h1>
            <p className="table-caption">
              Data loaded from the Star Wars API. Showing the requested fields.
            </p>
          </div>
          <button className="secondary-button" type="button" onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>

        <div className="card table-card">
          {isLoading && (
            <div className="state-message" role="status" aria-live="polite">
              <div className="spinner" aria-hidden="true" />
              <div>
                <strong>Loading data</strong>
                <p>Please wait while the Star Wars API responds.</p>
              </div>
            </div>
          )}

          {!isLoading && error && (
            <div className="state-message error-state" role="alert">
              <div className="state-icon" aria-hidden="true">!</div>
              <div>
                <strong>Unable to load data</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="table-wrapper">
              <table>
                <caption className="sr-only">Star Wars people data</caption>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Mass</th>
                    <th scope="col">Height</th>
                    <th scope="col">Hair Color</th>
                    <th scope="col">Skin Color</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person) => (
                    <tr key={`${person.name}-${person.height}-${person.mass}`}>
                      <td data-label="Name">{person.name}</td>
                      <td data-label="Mass">{person.mass}</td>
                      <td data-label="Height">{person.height}</td>
                      <td data-label="Hair Color">{person.hair_color}</td>
                      <td data-label="Skin Color">{person.skin_color}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

export default TablePage;
