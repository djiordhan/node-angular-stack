export default function MapExplorer() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Map workspace</p>
          <h2>Map explorer</h2>
          <p className="muted">
            Curate basemaps, adjust filters, and coordinate analyst views for active field operations.
          </p>
        </div>
        <button type="button" className="secondary">
          Open layer studio
        </button>
      </header>

      <section className="page-grid">
        <article className="card">
          <h3>Active basemap</h3>
          <p className="muted">USGS topography with elevation contours and land classification.</p>
          <div className="card-meta">
            <span>Tiles</span>
            <strong>15,882 loaded</strong>
          </div>
        </article>
        <article className="card">
          <h3>Region filters</h3>
          <p className="muted">Bounding boxes configured for West Coast, Great Lakes, and Gulf operations.</p>
          <div className="card-meta">
            <span>Regions</span>
            <strong>3 active</strong>
          </div>
        </article>
        <article className="card">
          <h3>Analyst sessions</h3>
          <p className="muted">Monitor collaborative views and handoff between coverage shifts.</p>
          <div className="card-meta">
            <span>Analysts</span>
            <strong>12 online</strong>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Map playback</p>
            <h3>Mission replay</h3>
          </div>
          <button type="button">Launch timeline</button>
        </div>
        <div className="page-list">
          <div className="list-item">
            <div>
              <h4>Route inspection - North Ridge</h4>
              <p className="muted">Replay 6 hour airlift operation with telemetry overlays.</p>
            </div>
            <span className="pill-tag">Ready</span>
          </div>
          <div className="list-item">
            <div>
              <h4>Harbor sweep - Delta sector</h4>
              <p className="muted">Evaluate vessel density and radar tracks.</p>
            </div>
            <span className="pill-tag">Queued</span>
          </div>
        </div>
      </section>
    </div>
  );
}
