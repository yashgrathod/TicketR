import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import Settings from './components/Settings';
import Help from './components/Help';
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
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RoleProvider>
  );
}
export default App;
