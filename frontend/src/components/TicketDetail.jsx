import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send, User, Tag, AlertTriangle } from 'lucide-react';
import { getTicketById, updateTicket } from '../api';
import { useRole } from '../context/RoleContext';

const statusConfig = {
  'Open': { dot: 'bg-rose-500', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  'In Progress': { dot: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  'Closed': { dot: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
};

const TicketDetail = () => {
  const { id } = useParams();
  const { role } = useRole();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const data = await getTicketById(id);
      setTicket(data);
    } catch (err) {
      setError('Failed to load ticket details.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (field, value) => {
    if (value === ticket[field]) return;
    setUpdating(true);
    try {
      const updated = await updateTicket(ticket._id, { [field]: value });
      setTicket(updated);
    } catch (err) {
      alert(`Failed to update ${field}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setUpdating(true);
    try {
      const updated = await updateTicket(ticket._id, { note_text: noteText });
      setTicket(updated);
      setNoteText('');
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-16 text-center text-zinc-500 text-sm font-medium animate-pulse">Loading details...</div>;
  if (error || !ticket) return <div className="p-16 text-center text-rose-500 text-sm">{error || 'Ticket not found'}</div>;

  const cfg = statusConfig[ticket.status];
  const isAgent = role === 'Agent';

  return (
    <div className="flex-1 overflow-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-950/95 bg-blend-overlay">
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300 font-medium text-sm mb-6 hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Command Center
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-md uppercase tracking-widest border border-zinc-700/50">
                  {ticket.ticket_id}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Opened {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{ticket.subject}</h1>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
              {/* Status */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Status</span>
                <div className="relative">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleUpdate('status', e.target.value)}
                    disabled={updating || !isAgent}
                    className={`appearance-none pl-7 pr-8 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all cursor-pointer ${cfg.bg} ${cfg.text} ${cfg.border} ${!isAgent && 'opacity-80 cursor-not-allowed'}`}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${cfg.dot} shadow-[0_0_5px_currentColor]`} />
                </div>
              </div>

              {/* Priority & Category (Agent Only controls) */}
              {isAgent && (
                <div className="flex flex-col gap-2 p-3 rounded-xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Priority</span>
                    <select
                      value={ticket.priority}
                      onChange={(e) => handleUpdate('priority', e.target.value)}
                      disabled={updating}
                      className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-2 py-1 focus:ring-1 focus:ring-zinc-500 outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Category</span>
                    <select
                      value={ticket.category}
                      onChange={(e) => handleUpdate('category', e.target.value)}
                      disabled={updating}
                      className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-2 py-1 focus:ring-1 focus:ring-zinc-500 outline-none"
                    >
                      <option value="General">General</option>
                      <option value="Technical">Technical</option>
                      <option value="Billing">Billing</option>
                      <option value="Account">Account</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800/80 overflow-hidden">
          <div className="p-5 border-b border-zinc-800/50 flex items-center gap-4 bg-zinc-900/80">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 shadow-inner">
              <User className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{ticket.customer_name}</h3>
              <p className="text-zinc-500 text-sm font-medium">{ticket.customer_email}</p>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Description</h4>
            <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
          </div>
        </div>

        {/* Notes (Agent Only) */}
        {isAgent && (
          <div className="space-y-6 pt-6 border-t border-zinc-800/50">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest">
              <MessageSquare className="w-4 h-4 text-zinc-500" />
              Internal Notes
            </h3>
            
            <div className="space-y-4">
              {ticket.notes && ticket.notes.length > 0 ? (
                ticket.notes.map((note) => (
                  <div key={note._id} className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-zinc-800/80 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex-shrink-0 flex items-center justify-center font-bold text-zinc-950 text-sm shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                      AG
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">Agent Note</span>
                        <span className="text-xs text-zinc-500 font-medium">
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{note.note_text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-zinc-600 text-sm bg-zinc-900/20 rounded-2xl border border-zinc-800/50 border-dashed font-medium">
                  No internal notes yet. Use the area below to add one.
                </div>
              )}
            </div>

            <form onSubmit={handleAddNote} className="mt-6 bg-zinc-900/40 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-zinc-800/80 focus-within:ring-1 focus-within:ring-zinc-600 focus-within:border-zinc-600 transition-all flex items-end gap-3">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type a private internal note..."
                className="flex-1 max-h-32 min-h-[44px] py-3 px-4 bg-transparent border-none focus:ring-0 resize-none outline-none text-zinc-200 text-sm placeholder-zinc-600"
                rows={1}
              />
              <button
                type="submit"
                disabled={updating || !noteText.trim()}
                className="p-3 bg-white text-zinc-950 rounded-xl hover:bg-zinc-200 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 disabled:cursor-not-allowed mb-0.5 mr-0.5 hover:scale-[1.05] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;
