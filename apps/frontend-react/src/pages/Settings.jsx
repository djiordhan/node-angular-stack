export default function Settings() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h2>Settings</h2>
          <p className="muted">Configure mission preferences, user roles, and notification routing.</p>
        </div>
        <button type="button" className="secondary">
          Save changes
        </button>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h3>Command preferences</h3>
          </div>
        </div>
        <form className="settings-form">
          <label>
            Default region focus
            <select defaultValue="North America">
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
              <option>Global</option>
            </select>
          </label>
          <label>
            Alert severity threshold
            <select defaultValue="Medium">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </label>
          <label>
            Daily intelligence briefing
            <input type="text" defaultValue="08:30 local time" />
          </label>
          <label>
            Analyst notes
            <textarea rows="4" defaultValue="Maintain additional coverage for coastal assets." />
          </label>
        </form>
      </section>

      <section className="page-grid">
        <article className="card">
          <h3>User access</h3>
          <p className="muted">18 analysts assigned across 5 operational teams.</p>
          <div className="card-meta">
            <span>Teams</span>
            <strong>Ops Alpha, Beta</strong>
          </div>
        </article>
        <article className="card">
          <h3>Notification routing</h3>
          <p className="muted">Primary alerts are routed to Slack and secure SMS.</p>
          <div className="card-meta">
            <span>Channels</span>
            <strong>3 active</strong>
          </div>
        </article>
      </section>
    </div>
  );
}
