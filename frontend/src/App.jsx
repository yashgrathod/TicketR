import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import Settings from './components/Settings';
import { RoleProvider } from './context/RoleContext';

function App() {
  return (
    <RoleProvider>
      <Router>
        <div className="flex h-screen bg-black font-sans text-white overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col h-screen overflow-hidden bg-zinc-950">
            <Routes>
              <Route path="/" element={<TicketList />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<div className="p-8"><h1 className="text-2xl font-bold">Help & Support</h1><p className="mt-4 text-zinc-500">Help page placeholder.</p></div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </RoleProvider>
  );
}

export default App;
