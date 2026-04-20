import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldAlert, Send, Flag, CheckCircle, Terminal, User, X, Download, FileText } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';

const initialEvents = [
  { id: 1, type: 'system', author: 'System Alert', content: 'PagerDuty triggered: High latency on /api/v1/checkout', time: '10:42 AM' },
  { id: 2, type: 'chat', author: 'Sarah J. (Commander)', content: 'I am taking Commander role. Investigating now.', time: '10:45 AM' },
  { id: 3, type: 'chat', author: 'Mike R. (Lead)', content: 'Looking at Datadog. DB CPU is at 99%.', time: '10:46 AM' },
  { id: 4, type: 'system', author: 'Status Change', content: 'Severity updated to CRITICAL', time: '10:48 AM' },
];

export default function IncidentRoom() {
  const { id } = useParams();
  const { activeIncident, updateRole, toggleActionItem, resolveIncident } = useIncident();
  const [events, setEvents] = useState(initialEvents);
  const [input, setInput] = useState('');
  const [showPostMortem, setShowPostMortem] = useState(false);
  const endOfTimelineRef = useRef(null);

  useEffect(() => {
    endOfTimelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newEvent = {
      id: Date.now(),
      type: 'chat',
      author: 'You (Responder)',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setEvents([...events, newEvent]);
    setInput('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textDecoration: 'none' }} className="nav-link-hover">
            ← Back to Dashboard
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h1 className="mono" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{id}</h1>
            <span className="badge badge-critical">
              <span className="live-indicator" style={{ display: 'inline-block', marginRight: '6px' }}></span>
              Critical Active
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem' }}>{activeIncident.title}</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn-secondary" 
            onClick={resolveIncident}
            disabled={activeIncident.status === 'resolved'}
            style={{ opacity: activeIncident.status === 'resolved' ? 0.5 : 1 }}
          >
            <CheckCircle size={18} style={{ marginRight: '6px' }} />
            {activeIncident.status === 'resolved' ? 'Resolved' : 'Resolve Incident'}
          </button>
          <button className="btn-primary" onClick={() => setShowPostMortem(true)}>
            <Flag size={18} />
            Generate Post-Mortem
          </button>
        </div>
      </div>

      <div className="incident-room">
        <div className="room-sidebar">
          <div className="panel-card">
            <h3>Roles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Commander</span>
                <strong>{activeIncident.roles.commander || 'Unassigned'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tech Lead</span>
                <strong>{activeIncident.roles.techLead || 'Unassigned'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Comms Lead</span>
                {activeIncident.roles.commsLead ? (
                  <strong>{activeIncident.roles.commsLead}</strong>
                ) : (
                  <span style={{ color: 'var(--accent-yellow)' }}>Unassigned</span>
                )}
              </div>
            </div>
            {!activeIncident.roles.commsLead && (
              <button 
                className="btn-secondary" 
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => updateRole('commsLead', 'You')}
              >
                Take Comms Role
              </button>
            )}
          </div>

          <div className="panel-card">
            <h3>Action Items</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {activeIncident.actionItems.map(item => (
                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={item.completed} 
                    onChange={() => toggleActionItem(item.id)}
                  /> 
                  <span style={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--text-muted)' : 'inherit' }}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="room-main">
          <div className="timeline-header">
            <div style={{ fontWeight: 600 }}>Incident Timeline</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Started: 10:42 AM (32m elapsed)
            </div>
          </div>
          
          <div className="timeline-body">
            {events.map((event) => (
              <div key={event.id} className="timeline-event">
                <div className={`event-icon ${event.type}`}>
                  {event.type === 'system' ? <Terminal size={18} /> : <User size={18} />}
                </div>
                <div className="event-content">
                  <div className="event-header">
                    <span className="event-author" style={{ color: event.type === 'system' ? 'var(--primary)' : 'inherit' }}>
                      {event.author}
                    </span>
                    <span className="event-time">{event.time}</span>
                  </div>
                  <div>{event.content}</div>
                </div>
              </div>
            ))}
            <div ref={endOfTimelineRef} />
          </div>

          <form className="timeline-input" onSubmit={handleSend}>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Log an action, share findings, or paste logs..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem' }}>
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Post-Mortem Modal */}
      {showPostMortem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div className="panel-card" style={{ width: '800px', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={24} color="var(--primary)" /> Automated Post-Mortem
              </h2>
              <button onClick={() => setShowPostMortem(false)} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <h1 style={{ marginBottom: '1rem' }}>Incident: {activeIncident.title} ({id})</h1>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Status:</strong> {activeIncident.status.toUpperCase()}</p>
              <p><strong>Commander:</strong> {activeIncident.roles.commander || 'Unassigned'}</p>
              
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Executive Summary</h3>
              <p>The incident "{activeIncident.title}" was declared due to critical system alerts. The team mobilized and executed the predefined action checklist. The issue is currently marked as {activeIncident.status}.</p>
              
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Action Items Completed</h3>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-muted)' }}>
                {activeIncident.actionItems.map(item => (
                  <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                    [{item.completed ? 'x' : ' '}] {item.text}
                  </li>
                ))}
              </ul>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Timeline Log</h3>
              <div className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {events.map(event => (
                  <div key={event.id} style={{ marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)' }}>[{event.time}]</span> {event.author}: {event.content}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn-secondary" onClick={() => setShowPostMortem(false)}>Close</button>
              <button className="btn-primary">
                <Download size={18} /> Export as Markdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
