import { useState, useEffect } from 'react';
import { Search, Download, Trash2, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminLeads({ password }) {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 15;

  const headers = { 'x-admin-password': password };

  const fetchLeads = async () => {
    setLoading(true);
    const params = new URLSearchParams({ skip: page * limit, limit });
    if (search) params.set('search', search);
    if (serviceFilter) params.set('service', serviceFilter);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/leads?${params}`, { headers });
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, [page, serviceFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchLeads();
  };

  const handleExport = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/leads/export`, { headers });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads_export.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await fetch(`${BACKEND_URL}/api/admin/leads/${id}`, { method: 'DELETE', headers });
    fetchLeads();
  };

  const totalPages = Math.ceil(total / limit);
  const serviceColors = {
    website: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    branding: 'bg-purple-500/10 text-purple-400',
    growth: 'bg-green-500/10 text-green-400',
    automation: 'bg-orange-500/10 text-orange-400',
  };

  return (
    <div data-testid="admin-leads-tab">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-['Poppins'] text-2xl font-bold text-white">Leads</h2>
          <p className="text-sm text-[#888]">{total} total leads</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-[#121212] border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm hover:border-white/20 transition-colors"
          data-testid="export-leads-button"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50"
            data-testid="leads-search-input"
          />
        </form>
        <select
          value={serviceFilter}
          onChange={(e) => { setServiceFilter(e.target.value); setPage(0); }}
          className="bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none appearance-none min-w-[150px]"
          data-testid="leads-service-filter"
        >
          <option value="">All Services</option>
          <option value="website">Website</option>
          <option value="branding">Branding</option>
          <option value="growth">Growth</option>
          <option value="automation">Automation</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="leads-table">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-medium">Name</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-medium">Contact</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-medium">Service</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-medium">Message</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-medium">Date</th>
                <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-[#555] text-sm">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-[#555] text-sm">No leads found</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-sm text-white font-medium">{lead.name}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        {lead.phone && (
                          <span className="flex items-center gap-1.5 text-xs text-[#888]">
                            <Phone size={12} /> {lead.phone}
                          </span>
                        )}
                        {lead.email && (
                          <span className="flex items-center gap-1.5 text-xs text-[#888]">
                            <Mail size={12} /> {lead.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${serviceColors[lead.service_interest] || 'bg-white/5 text-[#888]'}`}>
                        {lead.service_interest}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-[#888] line-clamp-2 max-w-[200px] block">{lead.message || '—'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-[#555]">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-[#555] hover:text-red-400 transition-colors p-1"
                        data-testid={`delete-lead-${lead.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
            <span className="text-xs text-[#555]">Page {page + 1} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#888] hover:text-white disabled:opacity-30 transition-colors"
                data-testid="leads-prev-page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#888] hover:text-white disabled:opacity-30 transition-colors"
                data-testid="leads-next-page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
