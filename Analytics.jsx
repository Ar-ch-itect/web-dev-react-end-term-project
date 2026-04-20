import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, TrendingDown } from 'lucide-react';

const mttrData = [
  { name: 'Week 1', mttr: 45 },
  { name: 'Week 2', mttr: 52 },
  { name: 'Week 3', mttr: 38 },
  { name: 'Week 4', mttr: 24 },
];

const incidentVolumeData = [
  { name: 'Mon', incidents: 2 },
  { name: 'Tue', incidents: 1 },
  { name: 'Wed', incidents: 4 },
  { name: 'Thu', incidents: 0 },
  { name: 'Fri', incidents: 3 },
];

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="dashboard-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Analytics Engine</h1>
          <p style={{ color: 'var(--text-muted)' }}>MTTR trends and system reliability metrics</p>
        </div>
        <div className="badge badge-resolved" style={{ fontSize: '0.85rem' }}>
          <TrendingDown size={14} style={{ display: 'inline', marginRight: '4px' }} />
          MTTR Down 12%
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="panel-card">
          <h3>Mean Time To Resolve (MTTR) Trend</h3>
          <div style={{ height: '300px', marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mttrData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" unit="m" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Line type="monotone" dataKey="mttr" stroke="var(--primary)" strokeWidth={3} dot={{ r: 6, fill: 'var(--bg-dark)', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel-card">
          <h3>Incident Volume (This Week)</h3>
          <div style={{ height: '300px', marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border)', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="incidents" fill="var(--accent-red)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
