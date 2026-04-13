import { useState, useEffect } from 'react';
import { Users, MousePointerClick, TrendingUp, Eye } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon size={18} className="text-white" />
      </div>
      <p className="text-2xl font-bold text-white font-['Poppins']">{value}</p>
      <p className="text-xs text-[#888] mt-1">{label}</p>
    </div>
  );
}

function BarChart({ data, label }) {
  const maxVal = Math.max(...Object.values(data), 1);
  return (
    <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
      <h3 className="text-sm font-semibold text-white mb-4">{label}</h3>
      {Object.keys(data).length === 0 ? (
        <p className="text-xs text-[#555]">No data yet</p>
      ) : (
        <div className="space-y-3">
          {Object.entries(data).sort((a, b) => b[1] - a[1]).map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#ccc] capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="text-[#888]">{val}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
                  style={{ width: `${(val / maxVal) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminAnalytics({ password }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/analytics`, {
          headers: { 'x-admin-password': password },
        });
        setData(await res.json());
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, [password]);

  if (loading) return <div className="text-[#555] text-sm py-12 text-center">Loading analytics...</div>;
  if (!data) return <div className="text-[#555] text-sm py-12 text-center">Failed to load</div>;

  return (
    <div data-testid="admin-analytics-tab">
      <h2 className="font-['Poppins'] text-2xl font-bold text-white mb-6">Analytics Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Leads" value={data.total_leads} color="bg-[#3B82F6]" />
        <StatCard icon={MousePointerClick} label="Total Events" value={data.total_events} color="bg-purple-500" />
        <StatCard icon={TrendingUp} label="CTA Clicks" value={data.event_breakdown?.cta_click || 0} color="bg-green-500" />
        <StatCard icon={Eye} label="Page Views" value={data.event_breakdown?.page_view || 0} color="bg-orange-500" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <BarChart data={data.service_breakdown || {}} label="Leads by Service" />
        <BarChart data={data.event_breakdown || {}} label="Events by Type" />
        <BarChart data={data.section_breakdown || {}} label="Engagement by Section" />
        <BarChart data={data.source_breakdown || {}} label="Leads by Source" />
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Leads</h3>
          <div className="space-y-3">
            {(data.recent_leads || []).slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                <div>
                  <p className="text-sm text-white">{lead.name}</p>
                  <p className="text-xs text-[#555]">{lead.phone}</p>
                </div>
                <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full capitalize">
                  {lead.service_interest}
                </span>
              </div>
            ))}
            {(data.recent_leads || []).length === 0 && (
              <p className="text-xs text-[#555]">No leads yet</p>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Events</h3>
          <div className="space-y-3">
            {(data.recent_events || []).slice(0, 8).map((evt) => (
              <div key={evt.id} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                <div>
                  <p className="text-sm text-white capitalize">{evt.event_type.replace(/_/g, ' ')}</p>
                  <p className="text-xs text-[#555]">{evt.section || 'general'}</p>
                </div>
                <span className="text-xs text-[#555]">
                  {new Date(evt.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {(data.recent_events || []).length === 0 && (
              <p className="text-xs text-[#555]">No events yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
