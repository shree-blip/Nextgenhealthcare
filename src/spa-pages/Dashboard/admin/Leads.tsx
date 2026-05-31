import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Mail, Phone, Calendar, Building2, DollarSign, Target, AlertCircle } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  businessType: string | null;
  budget: string | null;
  message: string | null;
  source: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/contact-lead');
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/contact-lead', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setLeads(leads.map(lead => lead.id === id ? { ...lead, status } : lead));
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300';
      case 'contacted': return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300';
      case 'qualified': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300';
      case 'closed': return 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white';
    }
  };

  const newLeads = leads.filter(l => l.status === 'new').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
  const todayLeads = leads.filter(l => {
    const today = new Date();
    const leadDate = new Date(l.createdAt);
    return leadDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="dashboard-scope min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard/admin"
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Contact Leads</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage and track your incoming leads</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Leads</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{leads.length}</p>
              </div>
              <Users className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">New (Uncontacted)</p>
                <p className="text-3xl font-black text-blue-600 mt-1">{newLeads}</p>
              </div>
              <AlertCircle className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Qualified</p>
                <p className="text-3xl font-black text-emerald-600 mt-1">{qualifiedLeads}</p>
              </div>
              <Target className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Today</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{todayLeads}</p>
              </div>
              <Calendar className="h-12 w-12 text-slate-400" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No leads yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{lead.name}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                        {lead.source && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
                            {lead.source}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {lead.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedId === lead.id && (
                  <div className="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {lead.businessType && (
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                            <Building2 className="h-4 w-4" />
                            Business Type
                          </div>
                          <p className="text-slate-900 dark:text-white font-medium">{lead.businessType}</p>
                        </div>
                      )}
                      {lead.budget && (
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                            <DollarSign className="h-4 w-4" />
                            Budget
                          </div>
                          <p className="text-slate-900 dark:text-white font-medium">{lead.budget}</p>
                        </div>
                      )}
                    </div>

                    {lead.message && (
                      <div className="mb-6">
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Message / Details</div>
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                          <p className="text-slate-900 dark:text-slate-200 whitespace-pre-wrap">{lead.message}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Update Status</div>
                      <div className="flex gap-2">
                        {['new', 'contacted', 'qualified', 'closed'].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(lead.id, status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              lead.status === status
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
