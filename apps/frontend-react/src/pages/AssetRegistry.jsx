const assets = [
  {
    name: 'Sierra Relay Node',
    region: 'Pacific Northwest',
    type: 'Satellite Uplink',
    status: 'Active',
  },
  {
    name: 'Midwest Flood Sensor Grid',
    region: 'Great Lakes',
    type: 'Monitoring Station',
    status: 'Standby',
  },
  {
    name: 'Artemis Survey Corridor',
    region: 'Southwest',
    type: 'Survey Zone',
    status: 'Active',
  },
  {
    name: 'Orion Logistics Hub',
    region: 'Southeast',
    type: 'Logistics Hub',
    status: 'Maintenance',
  },
];

export default function AssetRegistry() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Asset management</p>
          <h2>Asset registry</h2>
          <p className="muted">
            Review geospatial assets, verify telemetry health, and coordinate lifecycle planning.
          </p>
        </div>
        <button type="button">Add asset</button>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Registry overview</p>
            <h3>Priority assets</h3>
          </div>
          <button type="button" className="secondary">
            Export list
          </button>
        </div>
        <div className="table">
          <div className="table-row table-head">
            <span>Name</span>
            <span>Region</span>
            <span>Type</span>
            <span>Status</span>
          </div>
          {assets.map((asset) => (
            <div className="table-row" key={asset.name}>
              <span>{asset.name}</span>
              <span>{asset.region}</span>
              <span>{asset.type}</span>
              <span className="status-chip">{asset.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-grid">
        <article className="card">
          <h3>Maintenance window</h3>
          <p className="muted">4 assets require calibration within the next 72 hours.</p>
          <div className="card-meta">
            <span>Next cycle</span>
            <strong>Tue 08:00</strong>
          </div>
        </article>
        <article className="card">
          <h3>Telemetry coverage</h3>
          <p className="muted">98% of assets reporting in the last 15 minutes.</p>
          <div className="card-meta">
            <span>Uptime</span>
            <strong>99.4%</strong>
          </div>
        </article>
      </section>
    </div>
  );
}
