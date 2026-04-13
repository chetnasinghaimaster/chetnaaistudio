import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLeads from './AdminLeads';
import AdminAnalytics from './AdminAnalytics';
import AdminBlog from './AdminBlog';
import { Users, BarChart3, FileText, LogOut, ArrowLeft } from 'lucide-react';

const TABS = [
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'blog', label: 'Blog', icon: FileText },
];

export default function AdminDashboard() {
  const [password, setPassword] = useState(null);
  const [activeTab, setActiveTab] = useState('leads');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('admin_password');
    setPassword(null);
  };

  if (!password) {
    return <AdminLogin onAuth={setPassword} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-testid="admin-dashboard">
      {/* Top Bar */}
      <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-[#888] hover:text-white transition-colors"
              data-testid="admin-home-link"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#3B82F6] flex items-center justify-center font-bold text-xs text-white">C</div>
              <span className="font-['Poppins'] font-semibold text-white text-sm">Admin Dashboard</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors"
            data-testid="admin-logout-button"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-[#121212] p-1.5 rounded-xl w-fit border border-white/5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
              data-testid={`admin-tab-${id}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'leads' && <AdminLeads password={password} />}
        {activeTab === 'analytics' && <AdminAnalytics password={password} />}
        {activeTab === 'blog' && <AdminBlog password={password} />}
      </div>
    </div>
  );
}
