const alerts = [
  {
    title: 'Unauthorized perimeter entry',
    detail: 'South ridge sensor cluster detected after-hours motion.',
    level: 'High',
  },
  {
    title: 'Satellite uplink latency',
    detail: 'Sierra Relay Node reported a 42% throughput drop.',
    level: 'Medium',
  },
  {
    title: 'Weather overlay delay',
    detail: 'Radar feed has exceeded SLA for 10 minutes.',
    level: 'Low',
  },
];

export default function Alerts() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Risk monitoring</p>
          <h2>Alerts</h2>
          <p className="muted">
            Track threat notifications, field anomalies, and system-generated warnings.
          </p>
        </div>
        <button type="button">Create alert rule</button>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Active alerts</p>
            <h3>Latest incidents</h3>
          </div>
          <button type="button" className="secondary">
            Acknowledge all
          </button>
        </div>
        <div className="page-list">
          {alerts.map((alert) => (
            <div className="list-item" key={alert.title}>
              <div>
                <h4>{alert.title}</h4>
                <p className="muted">{alert.detail}</p>
              </div>
              <span className="pill-tag">{alert.level}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-grid">
        <article className="card">
          <h3>Escalation plan</h3>
          <p className="muted">On-call rotation is aligned to critical severity events.</p>
          <div className="card-meta">
            <span>Primary</span>
            <strong>Ops Alpha</strong>
          </div>
        </article>
        <article className="card">
          <h3>Response playbooks</h3>
          <p className="muted">4 playbooks ready for automated dispatch.</p>
          <div className="card-meta">
            <span>Automation</span>
            <strong>Enabled</strong>
          </div>
        </article>
      </section>
    </div>
  );
}
