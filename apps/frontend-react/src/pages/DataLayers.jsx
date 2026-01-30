const layers = [
  {
    name: 'Weather radar',
    source: 'NOAA',
    refresh: '5 min',
    status: 'Streaming',
  },
  {
    name: 'Critical infrastructure',
    source: 'National GIS',
    refresh: 'Daily',
    status: 'Synced',
  },
  {
    name: 'Population density',
    source: 'Census',
    refresh: 'Quarterly',
    status: 'Synced',
  },
  {
    name: 'Restricted airspace',
    source: 'FAA',
    refresh: 'Hourly',
    status: 'Alerting',
  },
];

export default function DataLayers() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Geospatial data</p>
          <h2>Data layers</h2>
          <p className="muted">Enable curated overlays to enrich the operational map environment.</p>
        </div>
        <button type="button">Add layer</button>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Layer catalog</p>
            <h3>Configured layers</h3>
          </div>
          <button type="button" className="secondary">
            Manage permissions
          </button>
        </div>
        <div className="table">
          <div className="table-row table-head">
            <span>Layer</span>
            <span>Source</span>
            <span>Refresh</span>
            <span>Status</span>
          </div>
          {layers.map((layer) => (
            <div className="table-row" key={layer.name}>
              <span>{layer.name}</span>
              <span>{layer.source}</span>
              <span>{layer.refresh}</span>
              <span className="status-chip">{layer.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-grid">
        <article className="card">
          <h3>Layer health</h3>
          <p className="muted">2 feeds are reporting elevated latency this hour.</p>
          <div className="card-meta">
            <span>Latency</span>
            <strong>+14%</strong>
          </div>
        </article>
        <article className="card">
          <h3>Tile cache</h3>
          <p className="muted">Edge cache warmed for primary basemaps and weather overlays.</p>
          <div className="card-meta">
            <span>Hit rate</span>
            <strong>91%</strong>
          </div>
        </article>
      </section>
    </div>
  );
}
