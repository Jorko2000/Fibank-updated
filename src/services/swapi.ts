export const SWAPI_URL = 'https://swapi.py4e.com/api/people';

export type Person = {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
};

type PeopleResponse = {
  results: Person[];
};

export async function fetchPeople(signal?: AbortSignal): Promise<Person[]> {
  const response = await fetch(SWAPI_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load Star Wars data (${response.status}).`);
  }

  const data = (await response.json()) as PeopleResponse;

  if (!Array.isArray(data.results)) {
    throw new Error('The Star Wars API returned an unexpected response.');
  }

  return data.results;
}
