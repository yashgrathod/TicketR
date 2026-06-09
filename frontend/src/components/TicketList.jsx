import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { getTickets } from '../api';
import TicketFormModal from './TicketFormModal';
import AnalyticsDashboard from './AnalyticsDashboard';
import { useRole } from '../context/RoleContext';
const statusConfig = {
  'Open': { text: 'text-zinc-300', bg: 'bg-white/5', border: 'border-white/10' },
  'In Progress': { text: 'text-zinc-300', bg: 'bg-white/5', border: 'border-white/10' },
  'Closed': { text: 'text-zinc-300', bg: 'bg-white/5', border: 'border-white/10' }
};
const priorityConfig = {
  'Low': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Medium': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  'High': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  'Critical': 'text-red-600 bg-red-600/10 border-red-600/20'
};
const priorityWeight = {
  'Low': 1,
  'Medium': 2,
  'High': 3,
  'Critical': 4
};
const TicketList = () => {
  const { role, customerEmail } = useRole();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const fetchTickets = useCallback(async (abortSignal) => {
    setLoading(true);
    try {
      const emailFilter = role === 'Customer' ? customerEmail : '';
      const data = await getTickets(search, status, emailFilter);
      // Cancel state update if component unmounted or role toggled rapidly
      if (abortSignal?.aborted) return;
      setTickets(data);
    } catch (error) {
      if (abortSignal?.aborted) return;
      console.error('Error fetching tickets:', error);
    } finally {
      if (!abortSignal?.aborted) {
        setLoading(false);
      }
    }
  }, [search, status, role, customerEmail]);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchTickets(controller.signal);
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [fetchTickets]);
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const sortedTickets = useMemo(() => {
    let sortableItems = [...tickets];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === 'priority') {
          aValue = priorityWeight[aValue || 'Medium'];
          bValue = priorityWeight[bValue || 'Medium'];
        } else if (sortConfig.key === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tickets, sortConfig]);
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 inline-block ml-1" /> : <ArrowDown className="w-3 h-3 inline-block ml-1" />;
  };
  return (
    <div className="flex-1 overflow-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-950/95 bg-blend-overlay">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800/50 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">
              {role === 'Agent' ? 'Dashboard' : 'My Support Tickets'}
            </h1>
            <p className="text-zinc-400 text-sm mt-1.5">
              {role === 'Agent' ? 'Manage and resolve customer requests globally.' : 'Track and manage your support tickets.'}
            </p>
          </div>
          {role === 'Customer' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-[1.02] active:scale-98 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Plus className="w-4 h-4" />
              New Ticket
            </button>
          )}
        </div>
        {role === 'Agent' && <AnalyticsDashboard tickets={tickets} />}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all shadow-inner"
            />
          </div>
          <div className="relative sm:w-48 shadow-sm">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all appearance-none cursor-pointer"
            >
              <option value="All" className="bg-zinc-900 text-zinc-200">All Statuses</option>
              <option value="Open" className="bg-zinc-900 text-zinc-200">Open</option>
              <option value="In Progress" className="bg-zinc-900 text-zinc-200">In Progress</option>
              <option value="Closed" className="bg-zinc-900 text-zinc-200">Closed</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 rotate-90" />
            </div>
          </div>
        </div>
        <div className="backdrop-blur-md bg-zinc-900/40 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-sm text-zinc-500 font-medium animate-pulse">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 mb-4">
                <Search className="w-6 h-6 text-zinc-500" />
              </div>
              <h3 className="text-base font-semibold text-zinc-200">No tickets found</h3>
              <p className="text-zinc-500 mt-1 text-sm">Adjust filters or create a new one to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-widest bg-zinc-950/50">
                    <th className="py-3 px-4">ID</th>
                    {role === 'Agent' && <th className="py-3 px-4">Customer</th>}
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('priority')}>
                      Priority <SortIcon columnKey="priority" />
                    </th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('createdAt')}>
                      Created <SortIcon columnKey="createdAt" />
                    </th>
                    <th className="py-3 px-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {sortedTickets.map((ticket) => {
                    const cfg = statusConfig[ticket.status];
                    const pCfg = priorityConfig[ticket.priority || 'Medium'];
                    return (
                      <tr key={ticket._id} className="hover:bg-zinc-800/30 transition-colors group">
                        <td className="py-3 px-4 text-sm">
                          <span className="font-mono font-medium text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded">
                            {ticket.ticket_id}
                          </span>
                        </td>
                        {role === 'Agent' && (
                          <td className="py-3 px-4">
                            <div className="font-medium text-zinc-200 text-sm">{ticket.customer_name}</div>
                            <div className="text-xs text-zinc-500">{ticket.customer_email}</div>
                          </td>
                        )}
                        <td className="py-3 px-4">
                          <div className="font-medium text-zinc-200 text-sm max-w-xs truncate">{ticket.subject}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-zinc-400">
                          {ticket.category || 'General'}
                        </td>
                        <td className="py-3 px-4">
                          <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${pCfg}`}>
                            {ticket.priority || 'Medium'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                            {ticket.status}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-zinc-500">
                          {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link 
                            to={`/tickets/${ticket._id}`}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-[1.1] active:scale-95"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <TicketFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTicketCreated={fetchTickets} 
      />
    </div>
  );
};
export default TicketList;
