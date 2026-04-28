import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Mock Candidates Database
  const [candidates] = useState([
    {
      id: "CAND-001",
      name: "Arjun Mehta",
      party: "Progressive Alliance",
      image: "https://i.pravatar.cc/150?img=11",
      trustIndex: 85,
      promisesKept: 72,
      criminalRecords: 0,
      assets: "₹ 2.5 Cr",
      manifesto: ["Universal Healthcare", "Green Energy Transition", "Tech Hub Initiative"]
    },
    {
      id: "CAND-002",
      name: "Priya Sharma",
      party: "National Democratic Front",
      image: "https://i.pravatar.cc/150?img=5",
      trustIndex: 92,
      promisesKept: 88,
      criminalRecords: 0,
      assets: "₹ 1.2 Cr",
      manifesto: ["Farmers Support System", "Digital Education", "Women Safety Act"]
    }
  ]);

  const [booths] = useState([
    { id: "B-101", name: "Greenwood High School", lat: 28.6139, lng: 77.2090, queueWaitTime: 15, crowdDensity: 'low', accessibility: ['Wheelchair', 'Sign Language'] },
    { id: "B-102", name: "Community Center Sector 4", lat: 28.6239, lng: 77.2190, queueWaitTime: 45, crowdDensity: 'high', accessibility: ['Ramp'] }
  ]);

  const [complaints, setComplaints] = useState([
    { id: "CPLT-1001", type: "EVM Malfunction", description: "VVPAT slip not printing at Booth 102.", status: "Pending", time: "10:15 AM", priority: "High" },
    { id: "CPLT-1002", type: "Voter Intimidation", description: "Unauthorized individuals loitering near Booth 101 entrance.", status: "Pending", time: "11:30 AM", priority: "Critical" },
    { id: "CPLT-1003", type: "Missing Name", description: "Voter with valid ID not found in electoral roll.", status: "Resolved", time: "08:45 AM", priority: "Medium" }
  ]);

  const addComplaint = (complaint) => {
    setComplaints([...complaints, { ...complaint, id: `CPLT-${Date.now()}`, status: 'Pending', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), priority: 'Medium' }]);
  };

  const resolveComplaint = (id) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
  };

  const [electionStats] = useState({
    totalVotersVoted: 1432590,
    targetVoters: 2295817, // ~62.4% turnout
    turnoutPercentage: 62.4,
    activeBooths: 4285
  });

  return (
    <DataContext.Provider value={{ candidates, booths, complaints, addComplaint, resolveComplaint, electionStats }}>
      {children}
    </DataContext.Provider>
  );
};
