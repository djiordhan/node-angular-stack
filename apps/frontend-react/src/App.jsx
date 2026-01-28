import { useEffect, useMemo, useState } from 'react';

const initialLocation = {
  name: '',
  type: 'Monitoring Station',
  status: 'Active',
  region: '',
  latitude: '',
  longitude: '',
  tags: '',
  notes: '',
};

export default function App() {
  const [locations, setLocations] = useState([]);
  const [insights, setInsights] = useState({ total: 0, byStatus: [], byType: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [formState, setFormState] = useState(initialLocation);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const summary = useMemo(() => {
    const statusMap = insights.byStatus.reduce((acc, item) => {
      acc[item.status] = item.count;
      return acc;
    }, {});
    const typeMap = insights.byType.reduce((acc, item) => {
      acc[item.type] = item.count;
      return acc;
    }, {});
    return { statusMap, typeMap };
  }, [insights]);

  const fetchLocations = async () => {
    setStatus({ state: 'loading', message: 'Loading locations…' });
    try {
      const response = await fetch('/api/gis/locations?limit=8');
      if (!response.ok) {
        throw new Error('Unable to load locations.');
      }
      const data = await response.json();
      setLocations(data.locations);
      setStatus({ state: 'ready', message: 'Locations updated.' });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/gis/insights');
      if (!response.ok) {
        throw new Error('Unable to load insights.');
      }
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      setInsights({ total: 0, byStatus: [], byType: [] });
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setStatus({ state: 'loading', message: 'Searching Elasticsearch…' });
    try {
      const response = await fetch(`/api/gis/locations/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search failed.');
      }
      const data = await response.json();
      setSearchResults(data.results);
      setStatus({ state: 'ready', message: `${data.results.length} results found.` });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateLocation = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: 'Creating location…' });
    try {
      const response = await fetch('/api/gis/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          latitude: Number(formState.latitude),
          longitude: Number(formState.longitude),
        }),
      });
      if (!response.ok) {
        throw new Error('Unable to save location.');
      }
      setFormState(initialLocation);
      await Promise.all([fetchLocations(), fetchInsights()]);
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  useEffect(() => {
    void fetchLocations();
    void fetchInsights();
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">GeoIntel MVP</p>
        <h1>GIS Command Center</h1>
        <p>
          Track field assets, monitor regional activity, and search geospatial metadata indexed in
          Elasticsearch. MongoDB retains the source of truth while the search layer powers rapid
          discovery.
        </p>
        <div className="meta">
          <span>MongoDB + Elasticsearch</span>
          <span>Realtime GIS overview</span>
          <span>MVP React experience</span>
        </div>
      </header>

      <section className="status-panel">
        <div>
          <p className="eyebrow">System pulse</p>
          <h2>Operational snapshot</h2>
          <p className="status-message">{status.message || 'Ready to run queries.'}</p>
        </div>
        <div className="pill-list">
          <div className="pill">
            <span className="pill-label">Total assets</span>
            <strong>{insights.total}</strong>
          </div>
          <div className="pill">
            <span className="pill-label">Active</span>
            <strong>{summary.statusMap.Active || 0}</strong>
          </div>
          <div className="pill">
            <span className="pill-label">Monitoring</span>
            <strong>{summary.typeMap['Monitoring Station'] || 0}</strong>
          </div>
        </div>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Elasticsearch</p>
              <h2>Search geospatial assets</h2>
            </div>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                name="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by region, tag, or site name"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="results">
            {searchResults.length === 0 ? (
              <p className="muted">Search results will appear here.</p>
            ) : (
              searchResults.map((result) => (
                <div className="result-card" key={result.id}>
                  <div>
                    <h3>{result.name}</h3>
                    <p className="muted">{result.region}</p>
                  </div>
                  <div className="result-meta">
                    <span>{result.type}</span>
                    <span>{result.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">MongoDB</p>
              <h2>Register a new location</h2>
            </div>
          </div>
          <form className="location-form" onSubmit={handleCreateLocation}>
            <label>
              Site name
              <input name="name" value={formState.name} onChange={handleFormChange} required />
            </label>
            <label>
              Region
              <input name="region" value={formState.region} onChange={handleFormChange} required />
            </label>
            <div className="form-row">
              <label>
                Latitude
                <input
                  name="latitude"
                  value={formState.latitude}
                  onChange={handleFormChange}
                  placeholder="37.7749"
                  required
                />
              </label>
              <label>
                Longitude
                <input
                  name="longitude"
                  value={formState.longitude}
                  onChange={handleFormChange}
                  placeholder="-122.4194"
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Type
                <select name="type" value={formState.type} onChange={handleFormChange}>
                  <option>Monitoring Station</option>
                  <option>Satellite Uplink</option>
                  <option>Survey Zone</option>
                  <option>Logistics Hub</option>
                </select>
              </label>
              <label>
                Status
                <select name="status" value={formState.status} onChange={handleFormChange}>
                  <option>Active</option>
                  <option>Standby</option>
                  <option>Maintenance</option>
                </select>
              </label>
            </div>
            <label>
              Tags (comma-separated)
              <input name="tags" value={formState.tags} onChange={handleFormChange} />
            </label>
            <label>
              Notes
              <textarea
                name="notes"
                value={formState.notes}
                onChange={handleFormChange}
                rows="3"
              />
            </label>
            <button type="submit">Save location</button>
          </form>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Recent updates</p>
            <h2>Latest tracked assets</h2>
          </div>
          <button type="button" className="secondary" onClick={fetchLocations}>
            Refresh list
          </button>
        </div>
        <div className="location-list">
          {locations.length === 0 ? (
            <p className="muted">No locations yet. Add the first site to begin tracking.</p>
          ) : (
            locations.map((location) => (
              <div className="location-card" key={location._id}>
                <div>
                  <h3>{location.name}</h3>
                  <p className="muted">{location.region}</p>
                  <p className="coords">
                    {location.coordinates?.latitude}, {location.coordinates?.longitude}
                  </p>
                </div>
                <div className="result-meta">
                  <span>{location.type}</span>
                  <span>{location.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
