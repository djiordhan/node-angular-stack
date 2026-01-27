const cards = [
  {
    title: 'Express API',
    description: 'Backend REST API with session-based auth and Redis store.',
    link: 'http://localhost:3000/health',
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

export default function App() {
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
