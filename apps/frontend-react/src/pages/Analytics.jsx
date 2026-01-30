const metrics = [
  { label: 'Assets tracked', value: '1,284', trend: '+4%' },
  { label: 'Average response time', value: '2.1s', trend: '-12%' },
  { label: 'Search queries today', value: '8,902', trend: '+9%' },
  { label: 'Alerts resolved', value: '143', trend: '+18%' },
];

const insights = [
  {
    title: 'High activity corridors',
    description: 'Hotspots detected in coastal zones with increased vessel density.',
  },
  {
    title: 'Asset drift monitoring',
    description: '7 assets have shifted beyond tolerance thresholds this week.',
  },
  {
    title: 'Data freshness',
    description: 'Weather layer latency remains within SLA at 4.2 minutes average.',
  },
];

export default function Analytics() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Intelligence</p>
          <h2>Analytics</h2>
          <p className="muted">Monitor mission analytics and cross-layer performance metrics.</p>
        </div>
        <button type="button" className="secondary">
          Schedule briefing
        </button>
      </header>

      <section className="page-grid">
        {metrics.map((metric) => (
          <article className="card" key={metric.label}>
            <h3>{metric.label}</h3>
            <p className="metric-value">{metric.value}</p>
            <p className="muted">Trend: {metric.trend}</p>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Insights</p>
            <h3>Operational signals</h3>
          </div>
          <button type="button">Open dashboard</button>
        </div>
        <div className="page-list">
          {insights.map((insight) => (
            <div className="list-item" key={insight.title}>
              <div>
                <h4>{insight.title}</h4>
                <p className="muted">{insight.description}</p>
              </div>
              <span className="pill-tag">Review</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
