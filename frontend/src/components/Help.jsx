import React from 'react';
import { BookOpen, Users, Workflow, Shield, Zap, Database } from 'lucide-react';

const Help = () => {
  return (
    <div className="flex-1 overflow-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-950/95 bg-blend-overlay">
      <div className="p-8 max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-zinc-800/50 pb-6">
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            Help & Documentation
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Welcome to TicketR, a complete full-stack Customer Support Ticketing CRM System built for modern operations. This guide explains the project workflow, role-based architecture, and core functionalities.
          </p>
        </div>

        {/* Section: Roles */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Role-Based Access Control (RBAC)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users className="w-24 h-24 text-zinc-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Customer Role</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 relative z-10">
                Customers represent the end-users experiencing issues. Their interface is streamlined and restricted to ensure privacy.
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 relative z-10">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <span><strong>Create Tickets:</strong> Can open new support requests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <span><strong>Isolated View:</strong> Can only see tickets linked to their specific email address.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                  <span><strong>Read-Only Fields:</strong> Status, Priority, and Category are read-only.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield className="w-24 h-24 text-zinc-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Agent Role</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 relative z-10">
                Agents are the support staff resolving issues. They have global visibility and administrative control over tickets.
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 relative z-10">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                  <span><strong>Global Dashboard:</strong> Access to all tickets and AI summarization charts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                  <span><strong>Triage:</strong> Cannot create tickets, but can modify Status, Priority, and Category.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                  <span><strong>Analytics:</strong> View distribution of categories and ticket priorities.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Workflow */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-teal-400" />
            Core Workflow
          </h2>
          <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-xl overflow-hidden">
            <div className="p-6 space-y-6">
              
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 font-bold text-sm">1</div>
                  <div className="w-0.5 h-full bg-zinc-800 my-2"></div>
                </div>
                <div className="pb-6">
                  <h3 className="text-base font-bold text-white">Ticket Creation</h3>
                  <p className="text-sm text-zinc-400 mt-1">A Customer clicks "+ New Ticket", filling out their name, email, subject, and description. The backend auto-generates a unique ID (e.g., TKT-001) and saves it to MongoDB.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-sm">2</div>
                  <div className="w-0.5 h-full bg-zinc-800 my-2"></div>
                </div>
                <div className="pb-6">
                  <h3 className="text-base font-bold text-white">Triage & Assignment</h3>
                  <p className="text-sm text-zinc-400 mt-1">An Agent logs in, views the global Dashboard, and opens the ticket. The Agent categorizes the issue (Technical, Billing, etc.) and sets the priority (Low to Critical).</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center text-yellow-400 font-bold text-sm">3</div>
                  <div className="w-0.5 h-full bg-zinc-800 my-2"></div>
                </div>
                <div className="pb-6">
                  <h3 className="text-base font-bold text-white">Resolution Chat</h3>
                  <p className="text-sm text-zinc-400 mt-1">Both roles communicate via the in-built chat interface inside the ticket. Messages sent by the current active user align right (blue), while the other party aligns left (dark). File attachments are mocked.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-purple-400 font-bold text-sm">4</div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Closure</h3>
                  <p className="text-sm text-zinc-400 mt-1">The Agent marks the ticket Status as "Closed" once the issue is resolved.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section: Tech Stack */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-rose-400" />
            Tech Stack & Security
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center text-center gap-2 hover:bg-zinc-800/50 transition-colors">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-sm font-bold text-zinc-200">Vite + React</span>
              <span className="text-xs text-zinc-500">Fast frontend SPA</span>
            </div>
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center text-center gap-2 hover:bg-zinc-800/50 transition-colors">
              <div className="w-6 h-6 rounded-md bg-sky-400 flex items-center justify-center font-bold text-black text-xs">TW</div>
              <span className="text-sm font-bold text-zinc-200">Tailwind CSS v4</span>
              <span className="text-xs text-zinc-500">Utility-first styling</span>
            </div>
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center text-center gap-2 hover:bg-zinc-800/50 transition-colors">
              <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center font-bold text-black text-xs">ND</div>
              <span className="text-sm font-bold text-zinc-200">Node + Express</span>
              <span className="text-xs text-zinc-500">RESTful Backend API</span>
            </div>
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center text-center gap-2 hover:bg-zinc-800/50 transition-colors">
              <Database className="w-6 h-6 text-emerald-500" />
              <span className="text-sm font-bold text-zinc-200">MongoDB</span>
              <span className="text-xs text-zinc-500">Mongoose Schemas</span>
            </div>
          </div>
          
          <div className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800 mt-4">
            <h4 className="text-sm font-bold text-zinc-300 mb-2">Security Implementations:</h4>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              <li><strong>Helmet.js</strong> secures HTTP headers and adds XSS protection.</li>
              <li><strong>Express Rate Limit</strong> limits API requests to prevent brute-force and DDoS attacks.</li>
              <li><strong>CORS</strong> enabled globally for safe cross-origin resource sharing.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Help;
