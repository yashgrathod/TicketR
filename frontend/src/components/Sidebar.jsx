import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Command, Settings, HelpCircle, Shield, User } from 'lucide-react';
import { useRole } from '../context/RoleContext';

const Sidebar = () => {
  const location = useLocation();
  const { role, toggleRole, customerEmail } = useRole();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Command },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-zinc-950 text-zinc-100 flex flex-col h-screen border-r border-zinc-800/50 backdrop-blur-xl">
      <div className="p-6 flex items-center gap-3 border-b border-zinc-800/50">
        <div className="bg-zinc-100 p-1.5 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Command className="w-5 h-5 text-zinc-950" />
        </div>
        <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">TicketR</span>
      </div>
      
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) text-sm font-medium ${
                isActive 
                  ? 'bg-zinc-800/50 text-white shadow-inner border border-zinc-700/50' 
                  : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 hover:scale-[1.02] active:scale-98'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-zinc-800/50 space-y-4">
        {/* Role Switcher */}
        <div className="bg-zinc-900/60 p-1 rounded-xl flex items-center border border-zinc-800/50 backdrop-blur-sm">
          <button
            onClick={toggleRole}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${role === 'Customer' ? 'bg-zinc-700/50 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <User className="w-3.5 h-3.5" />
            Customer
          </button>
          <button
            onClick={toggleRole}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${role === 'Agent' ? 'bg-zinc-700/50 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Shield className="w-3.5 h-3.5" />
            Agent
          </button>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs border border-zinc-700/50 text-zinc-300">
            {role === 'Agent' ? 'AG' : 'CU'}
          </div>
          <div className="text-sm overflow-hidden">
            <p className="font-semibold text-zinc-200 truncate">{role === 'Agent' ? 'Support Agent' : 'Customer'}</p>
            <p className="text-zinc-500 text-xs truncate">{role === 'Agent' ? 'agent@ticketr.com' : customerEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
