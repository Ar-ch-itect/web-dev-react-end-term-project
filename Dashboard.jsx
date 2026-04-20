import { Link } from 'react-router-dom';
import { Plus, Clock, Activity, AlertTriangle } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';

export default function Dashboard() {
  const { incidents } = useIncident();

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>System health and active incidents</p>
        </div>
        <button className="btn-primary" onClick={() => alert('Feature coming in next sprint: Declare New Incident Modal')}>
          <Plus size={18} />
          Declare Incident
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Mean Time to Resolve (MTTR)</div>
          <div className="stat-value">24m</div>
          <div className="stat-trend trend-down">
            ↓ 12% from last month
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Incidents</div>
          <div className="stat-value" style={{ color: 'var(--accent-red)' }}>
            {incidents.filter(i => i.status !== 'resolved').length}
          </div>
          <div className="stat-trend trend-up">
            ↑ 1 critical currently active
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">System Uptime (30d)</div>
          <div className="stat-value">99.98%</div>
          <div className="stat-trend trend-down">
            Target: 99.99%
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-title">
          <Activity size={20} />
          Recent Incidents
        </h2>
        <div className="incident-list">
          {incidents.map((incident) => (
            <Link to={`/incidents/${incident.id}`} key={incident.id} className="incident-card">
              <div className="incident-info">
                <div className="incident-header">
                  <span className="incident-id mono">{incident.id}</span>
                  <span className={`badge badge-${incident.status}`}>{incident.status}</span>
                </div>
                <div className="incident-title">{incident.title}</div>
                <div className="incident-meta">
                  <div className="meta-item">
                    <Clock size={14} /> {incident.time || 'Active Now'}
                  </div>
                  <div className="meta-item">
                    <AlertTriangle size={14} /> Commander: {incident.commander || incident.roles?.commander}
                  </div>
                </div>
              </div>
              <button className="btn-secondary">View Room</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
