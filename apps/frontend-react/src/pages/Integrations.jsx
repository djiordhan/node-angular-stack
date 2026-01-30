const integrations = [
  { name: 'Elasticsearch cluster', status: 'Connected', detail: '8 nodes • 42 TB' },
  { name: 'MongoDB Atlas', status: 'Connected', detail: 'Primary + 2 replicas' },
  { name: 'Drone telemetry API', status: 'Pending', detail: 'Awaiting token exchange' },
  { name: 'ArcGIS export', status: 'Connected', detail: 'Daily export at 02:00 UTC' },
];

export default function Integrations() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Connectivity</p>
          <h2>Integrations</h2>
          <p className="muted">Manage data pipelines and third-party GIS services.</p>
        </div>
        <button type="button">Add integration</button>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Connected services</p>
            <h3>Integration status</h3>
          </div>
          <button type="button" className="secondary">
            View logs
          </button>
        </div>
        <div className="page-list">
          {integrations.map((integration) => (
            <div className="list-item" key={integration.name}>
              <div>
                <h4>{integration.name}</h4>
                <p className="muted">{integration.detail}</p>
              </div>
              <span className="pill-tag">{integration.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-grid">
        <article className="card">
          <h3>Webhook health</h3>
          <p className="muted">Average delivery time is within SLA across all destinations.</p>
          <div className="card-meta">
            <span>Latency</span>
            <strong>280 ms</strong>
          </div>
        </article>
        <article className="card">
          <h3>Access scopes</h3>
          <p className="muted">4 integrations require updated permissions.</p>
          <div className="card-meta">
            <span>Review</span>
            <strong>Pending</strong>
          </div>
        </article>
      </section>
    </div>
  );
}
