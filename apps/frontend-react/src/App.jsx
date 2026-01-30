import { useEffect, useMemo, useState } from 'react';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import AssetRegistry from './pages/AssetRegistry';
import Dashboard from './pages/Dashboard';
import DataLayers from './pages/DataLayers';
import Integrations from './pages/Integrations';
import MapExplorer from './pages/MapExplorer';
import Settings from './pages/Settings';

const navigation = [
  {
    title: 'Operations',
    links: [
      { label: 'Command overview', page: 'dashboard' },
      { label: 'Map explorer', page: 'maps' },
      { label: 'Asset registry', page: 'assets' },
    ],
  },
  {
    title: 'Data intelligence',
    links: [
      { label: 'Data layers', page: 'layers' },
      { label: 'Analytics', page: 'analytics' },
      { label: 'Alerts', page: 'alerts' },
    ],
  },
  {
    title: 'Admin',
    links: [
      { label: 'Integrations', page: 'integrations' },
      { label: 'Settings', page: 'settings' },
    ],
  },
];

const pageMap = {
  dashboard: Dashboard,
  maps: MapExplorer,
  assets: AssetRegistry,
  layers: DataLayers,
  analytics: Analytics,
  alerts: Alerts,
  integrations: Integrations,
  settings: Settings,
};

const defaultPage = 'dashboard';

export default function App() {
  const [activePage, setActivePage] = useState(defaultPage);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && pageMap[hash]) {
      setActivePage(hash);
    }
  }, []);

  const CurrentPage = useMemo(() => pageMap[activePage] || Dashboard, [activePage]);

  const handleNavClick = (page) => {
    setActivePage(page);
    window.location.hash = page;
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">◎</span>
          <div>
            <p className="brand-title">GeoIntel</p>
            <p className="brand-subtitle">GIS Command Center</p>
          </div>
        </div>
        <nav className="nav">
          {navigation.map((section) => (
            <div className="nav-section" key={section.title}>
              <p className="nav-section-title">{section.title}</p>
              <div className="nav-links">
                {section.links.map((link) => (
                  <button
                    type="button"
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={activePage === link.page ? 'nav-link active' : 'nav-link'}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="muted">Sync status</p>
          <strong className="sidebar-status">All systems nominal</strong>
        </div>
      </aside>
      <div className="app-body">
        <header className="top-bar">
          <div>
            <p className="eyebrow">GeoIntel workspace</p>
            <h1>Operational GIS suite</h1>
          </div>
          <div className="top-bar-actions">
            <input className="global-search" placeholder="Search assets, layers, or alerts" />
            <button type="button">Create report</button>
          </div>
        </header>
        <main className="main-content">
          <CurrentPage />
        </main>
      </div>
    </div>
  );
}
