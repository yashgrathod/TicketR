import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';
import { User, Bell, Moon, LayoutGrid, Shield } from 'lucide-react';

const Settings = () => {
  const { role, customerEmail } = useRole();

  // Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [compactDensity, setCompactDensity] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedEmailNotifs = localStorage.getItem('settings_emailNotifications');
    if (savedEmailNotifs !== null) setEmailNotifications(JSON.parse(savedEmailNotifs));

    const savedDarkMode = localStorage.getItem('settings_darkMode');
    if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));

    const savedCompact = localStorage.getItem('settings_compactDensity');
    if (savedCompact !== null) setCompactDensity(JSON.parse(savedCompact));
  }, []);

  // Save to localStorage
  const handleToggle = (key, value, setter) => {
    const newValue = !value;
    setter(newValue);
    localStorage.setItem(`settings_${key}`, JSON.stringify(newValue));
  };

  const handleChangePassword = () => {
    alert("Password reset link sent to your email.");
  };

  return (
    <div className="flex-1 overflow-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-950/95 bg-blend-overlay">
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-zinc-800/50 pb-6">
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Settings</h1>
          <p className="text-zinc-400 text-sm mt-1.5">Manage your account preferences and profile settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800 p-6 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-zinc-800/50 pb-4">
                <User className="w-5 h-5 text-zinc-400" />
                <h2 className="text-lg font-bold text-white">Profile</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    defaultValue={role === 'Agent' ? 'Support Agent' : 'Customer User'}
                    className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={role === 'Agent' ? 'agent@ticketr.com' : customerEmail}
                    className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm text-zinc-500 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button 
                  onClick={handleChangePassword}
                  className="px-5 py-2.5 bg-zinc-800 text-white text-sm font-semibold rounded-xl hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  Change Password
                </button>
              </div>
            </section>

            {/* Preferences Section */}
            <section className="bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800 p-6 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-zinc-800/50 pb-4">
                <SettingsIcon className="w-5 h-5 text-zinc-400" />
                <h2 className="text-lg font-bold text-white">Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/30 transition-colors cursor-pointer"
                  onClick={() => handleToggle('emailNotifications', emailNotifications, setEmailNotifications)}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-bold text-zinc-200">Email Notifications</p>
                      <p className="text-xs text-zinc-500">Receive updates when a ticket changes status.</p>
                    </div>
                  </div>
                  <Toggle active={emailNotifications} />
                </div>
                
                <div 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/30 transition-colors cursor-pointer"
                  onClick={() => handleToggle('darkMode', darkMode, setDarkMode)}
                >
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-bold text-zinc-200">Dark Mode</p>
                      <p className="text-xs text-zinc-500">Currently locked to dark premium theme.</p>
                    </div>
                  </div>
                  <Toggle active={darkMode} />
                </div>

                <div 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/30 transition-colors cursor-pointer"
                  onClick={() => handleToggle('compactDensity', compactDensity, setCompactDensity)}
                >
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-bold text-zinc-200">Compact Density</p>
                      <p className="text-xs text-zinc-500">Reduce spacing in ticket lists.</p>
                    </div>
                  </div>
                  <Toggle active={compactDensity} />
                </div>
              </div>
            </section>
          </div>

          {/* Role Management */}
          <div className="space-y-6">
            <section className="bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800 p-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-zinc-800/50 pb-4 mb-4">
                <Shield className="w-5 h-5 text-zinc-400" />
                <h2 className="text-lg font-bold text-white">Role Management</h2>
              </div>
              
              <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/80 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 border border-zinc-700 mb-3">
                  {role === 'Agent' ? 'AG' : 'CU'}
                </div>
                <h3 className="text-base font-bold text-white mb-1">Current Role: {role}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  {role === 'Agent' 
                    ? 'You have global access to all tickets, internal notes, and administrative controls.'
                    : 'You have restricted access. You can only view and manage tickets associated with your email address.'}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Use the sidebar to switch roles.</p>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
};

const SettingsIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const Toggle = ({ active }) => (
  <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${active ? 'bg-white' : 'bg-zinc-800'}`}>
    <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${active ? 'left-5 bg-zinc-950' : 'left-0.5 bg-zinc-500'}`} />
  </div>
);

export default Settings;
