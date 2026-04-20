import { createContext, useState, useContext } from 'react';

const IncidentContext = createContext();

export function IncidentProvider({ children }) {
  const [activeIncident, setActiveIncident] = useState({
    id: 'INC-1042',
    title: 'Payment Gateway Timeout',
    status: 'critical',
    severity: 'high',
    commander: 'Sarah J.',
    startTime: new Date().toISOString(),
    roles: {
      commander: 'Sarah J.',
      techLead: 'Mike R.',
      commsLead: null
    },
    actionItems: [
      { id: 1, text: 'Acknowledge Alert', completed: true },
      { id: 2, text: 'Assign Roles', completed: true },
      { id: 3, text: 'Identify Root Cause', completed: false },
      { id: 4, text: 'Implement Fix', completed: false },
      { id: 5, text: 'Monitor Stability', completed: false },
    ]
  });

  const [historicalIncidents] = useState([
    { id: 'INC-1041', title: 'Search API Latency Spike', status: 'major', time: '2 hours ago', commander: 'Mike R.' },
    { id: 'INC-1040', title: 'Redis Cache Memory Warning', status: 'resolved', time: '1 day ago', commander: 'Alex W.' },
  ]);

  const incidents = [activeIncident, ...historicalIncidents];

  const updateRole = (role, person) => {
    setActiveIncident(prev => ({
      ...prev,
      roles: { ...prev.roles, [role]: person }
    }));
  };

  const toggleActionItem = (id) => {
    setActiveIncident(prev => ({
      ...prev,
      actionItems: prev.actionItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };
  
  const resolveIncident = () => {
    setActiveIncident(prev => ({
      ...prev,
      status: 'resolved'
    }));
  };

  return (
    <IncidentContext.Provider value={{ 
      activeIncident, 
      incidents, 
      updateRole, 
      toggleActionItem,
      resolveIncident
    }}>
      {children}
    </IncidentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useIncident() {
  return useContext(IncidentContext);
}
