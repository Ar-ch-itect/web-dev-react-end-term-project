import { FileText, Download, Calendar } from 'lucide-react';

const mockReports = [
  { id: 'PM-1040', title: 'Redis Cache Memory Warning', date: 'Oct 24, 2023', author: 'Alex W.', mttr: '45m' },
  { id: 'PM-1038', title: 'Database Failover Outage', date: 'Oct 18, 2023', author: 'Sarah J.', mttr: '2h 15m' },
  { id: 'PM-1035', title: 'Stripe API Webhook Failure', date: 'Oct 12, 2023', author: 'Mike R.', mttr: '18m' },
];

export default function PostMortems() {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Post-Mortems</h1>
          <p style={{ color: 'var(--text-muted)' }}>Auto-generated incident reports and reviews</p>
        </div>
      </div>

      <div className="panel-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-dark)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Report ID</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Title</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>MTTR</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Author</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockReports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }} className="mono">{report.id}</td>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{report.title}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} /> {report.date}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>{report.mttr}</td>
                <td style={{ padding: '1rem' }}>{report.author}</td>
                <td style={{ padding: '1rem' }}>
                  <button className="btn-secondary" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={14} /> Export MD
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
