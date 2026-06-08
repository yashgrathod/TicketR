import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createTicket } from '../api';
import { useRole } from '../context/RoleContext';

const TicketFormModal = ({ isOpen, onClose, onTicketCreated }) => {
  const { role, customerEmail } = useRole();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    description: '',
    priority: 'Medium',
    category: 'General'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        customer_email: role === 'Customer' ? customerEmail : ''
      }));
    }
  }, [isOpen, role, customerEmail]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createTicket(formData);
      setFormData({
        customer_name: '',
        customer_email: role === 'Customer' ? customerEmail : '',
        subject: '',
        description: '',
        priority: 'Medium',
        category: 'General'
      });
      setSelectedFile(null);
      onTicketCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-950 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-zinc-800/80 ring-1 ring-white/10">
        <div className="flex justify-between items-center p-6 border-b border-zinc-800/80 bg-zinc-900/50">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Create Ticket</h2>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest font-semibold">Submit a new request</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800 p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer Name</label>
              <input
                type="text"
                name="customer_name"
                required
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all shadow-inner"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer Email</label>
              <input
                type="email"
                name="customer_email"
                required
                disabled={role === 'Customer'}
                value={formData.customer_email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all shadow-inner appearance-none"
              >
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all shadow-inner appearance-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all shadow-inner"
              placeholder="Brief summary of the issue..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all shadow-inner resize-none"
              placeholder="Provide detailed information..."
            />
          </div>

          <div className="pt-4 flex justify-between items-start border-t border-zinc-800/80">
            <div className="flex flex-col gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                    alert("File ready for upload (Mock)");
                  }
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors self-start"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                Attach File
              </button>
              {selectedFile && (
                <div className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-800/50 px-2 py-1 rounded">
                  <span className="truncate max-w-[150px]">{selectedFile.name}</span>
                  <button 
                    type="button" 
                    onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="text-zinc-500 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-zinc-400 text-sm font-semibold hover:text-white rounded-xl transition-colors hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-white text-zinc-950 text-sm font-bold rounded-xl hover:bg-zinc-200 focus:ring-2 focus:ring-zinc-400 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 hover:scale-[1.02] active:scale-98 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                {loading ? 'Creating...' : 'Submit Ticket'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketFormModal;
