import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Fibank task routes', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('renders the login page', () => {
    renderAt('/login');

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });

  it('disables login until both fields are populated', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderAt('/login');

    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /login/i });

    await user.type(username, 'demo');
    expect(button).toBeDisabled();

    await user.type(password, 'secret');
    expect(button).toBeEnabled();
  });

  it('navigates to the table page after a valid login', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    renderAt('/login');

    await user.type(screen.getByLabelText(/username/i), 'demo');
    await user.type(screen.getByLabelText(/password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('heading', { name: /star wars people/i })).toBeInTheDocument();
  });
});
