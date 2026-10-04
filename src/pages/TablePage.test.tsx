import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import TablePage from './TablePage';
import { SWAPI_URL } from '../services/swapi';

const people = {
  results: [
    {
      name: 'Luke Skywalker',
      mass: '77',
      height: '172',
      hair_color: 'blond',
      skin_color: 'fair',
    },
  ],
};

describe('TablePage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => people,
      }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders Star Wars people', async () => {
    render(
      <MemoryRouter>
        <TablePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(SWAPI_URL, expect.any(Object));
  });

  it('shows an error when the API fails', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network unavailable'));

    render(
      <MemoryRouter>
        <TablePage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network unavailable');
    });
  });
});
