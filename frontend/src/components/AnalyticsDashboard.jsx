import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, BarChart2, PieChart as PieIcon } from 'lucide-react';

const categoryColorMap = {
  'General': '#3b82f6',     // Blue
  'Technical': '#6366f1',   // Indigo
  'Billing': '#14b8a6',     // Teal
  'Account': '#a855f7'      // Purple
};

const priorityColorMap = {
  'Low': '#10b981',         // Green
  'Medium': '#eab308',      // Yellow
  'High': '#f97316',        // Orange
  'Critical': '#ef4444'     // Red
};

const AnalyticsDashboard = ({ tickets }) => {
  // Process data for charts
  const categoryData = useMemo(() => {
    const counts = {};
    tickets.forEach(t => {
      const cat = t.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [tickets]);

  const priorityData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    tickets.forEach(t => {
      const p = t.priority || 'Medium';
      if (counts[p] !== undefined) counts[p]++;
    });
    return [
      { name: 'Low', count: counts.Low },
      { name: 'Medium', count: counts.Medium },
      { name: 'High', count: counts.High },
      { name: 'Critical', count: counts.Critical }
    ];
  }, [tickets]);

  // AI Insights Mock Generator
  const generateInsight = () => {
    if (tickets.length === 0) return "Not enough data to generate insights. Gather more tickets.";
    
    // Find top category
    const topCategory = categoryData.sort((a, b) => b.value - a.value)[0]?.name || 'General';
    // Count critical tickets
    const criticalCount = priorityData.find(p => p.name === 'Critical')?.count || 0;

    if (criticalCount > tickets.length * 0.2) {
      return `System Health Alert: Over 20% of active tickets are Critical priority. Immediate allocation of resources to ${topCategory} tickets is recommended.`;
    } else if (topCategory === 'Technical') {
      return `Trend Analysis: High volume of Technical issues reported recently. Recommend updating technical documentation to deflect future requests.`;
    } else {
      return `Status Stable: Ticket volumes are normal. The majority of inquiries are categorized as ${topCategory}. Maintain current workflow.`;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Category Pie Chart */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2 mb-4">
          <PieIcon className="w-4 h-4 text-zinc-500" />
          Category Distribution
        </h3>
        <div className="h-[200px] w-full">
          {tickets.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColorMap[entry.name] || '#71717a'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-zinc-600 text-sm">No data available</div>
          )}
        </div>
      </div>

      {/* Priority Bar Chart */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-zinc-500" />
          Tickets by Priority
        </h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={priorityColorMap[entry.name] || '#e4e4e7'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Sparkles className="w-24 h-24 text-blue-500" />
        </div>
        <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-4 z-10">
          <Sparkles className="w-4 h-4 text-blue-400" />
          AI Summarization
        </h3>
        <div className="flex-1 flex items-center z-10">
          <p className="text-zinc-300 text-sm leading-relaxed font-medium">
            {generateInsight()}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-800/50 z-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Auto-generated insight</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
