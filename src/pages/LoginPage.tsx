import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = username.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    navigate('/table');
  };

  return (
    <PageShell className="login-shell">
      <section className="login-layout" aria-labelledby="login-title">
        <div className="login-intro">
          <p className="eyebrow">Front-end development task</p>
          <h1 id="login-title">Welcome back</h1>
          <p className="intro-copy">
            Sign in to continue to the Star Wars people directory.
          </p>
        </div>

        <div className="card login-card">
          <div className="card-heading">
            <h2>Sign in</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button className="primary-button" type="submit" disabled={!isFormValid}>
              Login
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

export default LoginPage;
