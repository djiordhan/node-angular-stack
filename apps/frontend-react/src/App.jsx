import { useEffect, useState } from 'react';

const cards = [
  {
    title: 'Express API',
    description: 'Backend REST API with session-based auth and Redis store.',
    link: '/api/health',
    action: 'Check API health',
  },
  {
    title: 'Angular Shell',
    description: 'Module-federated Angular host application.',
    link: 'http://localhost:4200',
    action: 'Open Angular shell',
  },
  {
    title: 'Auth Microfrontend',
    description: 'Login and logout experience in Angular.',
    link: 'http://localhost:4201',
    action: 'Open auth MF',
  },
  {
    title: 'Dashboard Microfrontend',
    description: 'User stats and analytics module.',
    link: 'http://localhost:4202',
    action: 'Open dashboard MF',
  },
];

const initialCredentials = {
  username: '',
  password: '',
};

export default function App() {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [status, setStatus] = useState({
    state: 'idle',
    user: null,
    message: '',
  });

  const fetchSession = async () => {
    setStatus((prev) => ({ ...prev, state: 'loading', message: '' }));
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          setStatus({ state: 'idle', user: null, message: 'Not logged in.' });
          return;
        }
        throw new Error('Unable to load session');
      }

      const data = await response.json();
      setStatus({ state: 'ready', user: data, message: 'Logged in.' });
    } catch (error) {
      setStatus({ state: 'error', user: null, message: error.message });
    }
  };

  useEffect(() => {
    void fetchSession();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus((prev) => ({ ...prev, state: 'loading', message: '' }));
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed. Check your credentials.');
      }

      const data = await response.json();
      setStatus({ state: 'ready', user: data.user, message: data.message });
      setCredentials(initialCredentials);
    } catch (error) {
      setStatus({ state: 'error', user: null, message: error.message });
    }
  };

  const handleLogout = async () => {
    setStatus((prev) => ({ ...prev, state: 'loading', message: '' }));
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed.');
      }

      setStatus({ state: 'idle', user: null, message: 'Logged out.' });
    } catch (error) {
      setStatus({ state: 'error', user: null, message: error.message });
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">React companion frontend</p>
        <h1>Node + Angular Stack (React Edition)</h1>
        <p>
          This lightweight React app provides quick links to the existing services in the stack
          and serves as a starting point for a React-based UI.
        </p>
        <div className="meta">
          <span>Port: 4300</span>
          <span>Mode: Vite + React</span>
          <span>Watch-ready</span>
        </div>
      </header>

      <section className="auth-panel">
        <div>
          <p className="eyebrow">Session status</p>
          <h2>Login status</h2>
          <p className="status-message">
            {status.state === 'loading' && 'Checking session…'}
            {status.state !== 'loading' && status.message}
          </p>
          {status.user ? (
            <div className="user-card">
              <div>
                <strong>{status.user.username}</strong>
                <span>{status.user.email}</span>
              </div>
              <span className="role">{status.user.role}</span>
            </div>
          ) : (
            <p className="status-hint">Use a seeded account to log in and start a session.</p>
          )}
        </div>

        <div className="auth-actions">
          <form onSubmit={handleLogin} className="auth-form">
            <label>
              Username
              <input
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="jane.doe"
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </label>
            <button type="submit" disabled={status.state === 'loading'}>
              Log in
            </button>
          </form>
          <button
            type="button"
            className="secondary"
            onClick={handleLogout}
            disabled={status.state === 'loading' || !status.user}
          >
            Log out
          </button>
        </div>
      </section>

      <section className="grid">
        {cards.map((card) => (
          <article className="card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <a href={card.link} target="_blank" rel="noreferrer">
              {card.action}
            </a>
          </article>
        ))}
      </section>

      <section className="footer">
        <h2>Next steps</h2>
        <ul>
          <li>Build React pages that consume the same API as the Angular shell.</li>
          <li>Reuse shared types from <code>@repo/shared-types</code> when needed.</li>
          <li>Deploy alongside existing services with Docker Compose.</li>
        </ul>
      </section>
    </div>
  );
}
