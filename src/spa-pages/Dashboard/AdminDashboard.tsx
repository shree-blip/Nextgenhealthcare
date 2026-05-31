import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Globe,
  ShieldAlert,
  LogOut,
  Plus,
  Activity,
  Zap,
  FileText,
  Newspaper,
  BarChart3,
  MessageSquare,
  Mail,
  Users,
  ArrowLeft,
  ArrowRight,
  X,
  Edit,
  Trash2,
  Building2,
  Target,
  DollarSign,
  Calendar,
  User,
  Camera,
  Save,
  Mail as MailIcon,
  Lock,
  Eye,
  EyeOff,
  Link2,
  Sparkles,
  Check,
  Search,
  ChevronDown,
  Unlink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnalyticsForm from './components/AnalyticsForm';
import ClientAnalyticsView from './components/ClientAnalyticsView';
import GoogleAnalyticsView from './components/GoogleAnalyticsView';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ActionFeedback from './components/ActionFeedback';
import BackgroundTaskNotification, { type BackgroundTask } from './components/BackgroundTaskNotification';
import SyncProgressPopup, { type SyncProgressState, INITIAL_SYNC_STATE } from './components/SyncProgressPopup';
import DashboardLoader from './components/DashboardLoader';
import { useSitePreferences } from './components/SitePreferencesProvider';
import AdminSettings from './components/AdminSettings';
import { useAdminTranslation } from './hooks/useAdminTranslation';
import AdminSelect from './components/AdminSelect';
import ClientErrorBoundary from './components/ClientErrorBoundary';
import { SERVICE_CATEGORY_OPTIONS } from './lib/service-categories';

// Modal Component
function Modal({ isOpen, onClose, title, children, size = 'default' }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; size?: 'default' | 'large' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`relative bg-white dark:bg-slate-900 rounded-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 z-10 flex flex-col ${
          size === 'large' ? 'max-w-3xl max-h-[92vh]' : 'max-w-2xl max-h-[90vh]'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function toggleServiceCategorySelection(selectedCategories: string[], category: string) {
  return selectedCategories.includes(category)
    ? selectedCategories.filter((selectedCategory) => selectedCategory !== category)
    : [...selectedCategories, category];
}

function ServiceCategoryCheckboxGrid({
  selectedCategories,
  onChange,
}: {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium mb-1">Service Categories</label>
        <p className="text-xs text-slate-500 dark:text-slate-400">Choose the ongoing services tied to this clinic assignment.</p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {SERVICE_CATEGORY_OPTIONS.map((category) => {
          const checked = selectedCategories.includes(category);

          return (
            <label
              key={category}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                checked
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-100'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(toggleServiceCategorySelection(selectedCategories, category))}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="leading-5">{category}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// User Management Section Component
function StaffManagementSection({
  users,
  setUsers,
  setAssignments,
  currentUserId,
  startActionFeedback,
  finishActionSuccess,
  finishActionError,
}: {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setAssignments: React.Dispatch<React.SetStateAction<any[]>>;
  currentUserId?: string;
  startActionFeedback: (loadingText: string) => void;
  finishActionSuccess: (successMessage: string) => void;
  finishActionError: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'premium' | 'admin' | 'free'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });
  const [statusMessage, setStatusMessage] = useState<{ type: 'warning' | 'error'; text: string } | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    email: '',
    role: 'client',
    membershipRole: 'free',
    password: '',
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: '',
    userName: '',
    isLoading: false,
  });

  const normalizePlanBadge = (listedUser: any) => {
    const planId = String(listedUser?.planId || '').toLowerCase();
    const plan = String(listedUser?.plan || '').toLowerCase();

    if (planId === 'premium' || plan.includes('scale elite') || plan === 'premium') return 'Scale Elite';
    if (planId === 'gold' || plan.includes('growth pro') || plan === 'gold') return 'Growth Pro';
    if (planId === 'silver' || plan.includes('starter care') || plan === 'silver') return 'Starter Care';
    return 'Free';
  };

  const normalizeMembershipRole = (listedUser: any) => {
    const planId = String(listedUser?.planId || '').toLowerCase();
    const plan = String(listedUser?.plan || '').toLowerCase();

    if (planId === 'premium' || plan.includes('scale elite') || plan === 'premium') return 'scale-elite';
    if (planId === 'gold' || plan.includes('growth pro') || plan === 'gold') return 'growth-pro';
    if (planId === 'silver' || plan.includes('starter care') || plan === 'silver') return 'starter-care';
    return 'free';
  };

  const isPremiumClient = (listedUser: any) => {
    if (listedUser?.role !== 'client') return false;
    const badge = normalizePlanBadge(listedUser);
    return badge !== 'Free';
  };

  // Filter users by search query
  const searchFilteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  });

  // Group users by type
  const premiumClients = searchFilteredUsers.filter((listedUser) => isPremiumClient(listedUser));
  const adminUsers = searchFilteredUsers.filter((listedUser) => listedUser.role === 'admin' || listedUser.role === 'super_admin');
  const freeUsers = searchFilteredUsers.filter((listedUser) => listedUser.role === 'client' && !isPremiumClient(listedUser));

  const getPlanPillClasses = (label: string) => {
    if (label === 'Scale Elite') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400';
    if (label === 'Growth Pro') return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
    if (label === 'Starter Care') return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400';
    return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
  };

  const renderUserTable = (sectionTitle: string, sectionUsers: any[]) => (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
        <h4 className="font-bold text-slate-900 dark:text-slate-100">{sectionTitle}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Membership</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {sectionUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  No users in this section.
                </td>
              </tr>
            ) : (
              sectionUsers.map((listedUser) => {
                const planBadge = normalizePlanBadge(listedUser);
                return (
                  <tr key={listedUser.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-4 font-bold">{listedUser.name}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{listedUser.email}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        listedUser.role === 'admin' || listedUser.role === 'super_admin'
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                          : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {listedUser.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${getPlanPillClasses(planBadge)}`}>
                        {planBadge}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full">
                        {listedUser.subscriptionStatus || 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(listedUser)}
                          className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          aria-label={`Edit ${listedUser.name}`}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => requestDeleteUser(listedUser)}
                          className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          aria-label={`Delete ${listedUser.name}`}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!createForm.name || !createForm.email || !createForm.password) {
      setStatusMessage({ type: 'warning', text: 'Please complete all required fields to create a user.' });
      return;
    }

    try {
      startActionFeedback('Creating user...');
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setUsers((prev) => [data, ...prev]);
      setCreateForm({ name: '', email: '', password: '', role: 'client' });
      setShowCreateModal(false);
      finishActionSuccess('User created successfully.');
    } catch (error: any) {
      finishActionError();
      setStatusMessage({ type: 'error', text: error?.message || 'Failed to create user.' });
    }
  };

  const openEditModal = (selectedUser: any) => {
    setStatusMessage(null);
    setEditForm({
      id: selectedUser.id,
      name: selectedUser.name || '',
      email: selectedUser.email || '',
      role: selectedUser.role || 'client',
      membershipRole: normalizeMembershipRole(selectedUser),
      password: '',
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    setStatusMessage(null);

    if (!editForm.id || !editForm.name || !editForm.email) {
      setStatusMessage({ type: 'warning', text: 'Name and email are required to update a user.' });
      return;
    }

    try {
      startActionFeedback('Saving user changes...');
      const payload: Record<string, string> = {
        id: editForm.id,
        name: editForm.name,
        email: editForm.email,
        role: editForm.role,
        membershipRole: editForm.membershipRole,
      };

      if (editForm.password.trim()) {
        payload.password = editForm.password;
      }

      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      setUsers((prev) => prev.map((u) => (u.id === data.id ? { ...u, ...data } : u)));
      setShowEditModal(false);
      finishActionSuccess('User updated successfully.');
    } catch (error: any) {
      finishActionError();
      setStatusMessage({ type: 'error', text: error?.message || 'Failed to update user.' });
    }
  };

  const requestDeleteUser = (selectedUser: any) => {
    if (selectedUser.id === currentUserId) {
      setStatusMessage({ type: 'warning', text: 'You cannot delete your own account.' });
      return;
    }

    setDeleteModal({
      isOpen: true,
      userId: selectedUser.id,
      userName: selectedUser.name || selectedUser.email,
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    setDeleteModal((prev) => ({ ...prev, isLoading: true }));

    try {
      startActionFeedback('Deleting user...');
      const response = await fetch(`/api/admin/users?id=${encodeURIComponent(deleteModal.userId)}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      setUsers((prev) => prev.filter((u) => u.id !== deleteModal.userId));
      setAssignments((prev) => prev.filter((a) => a.userId !== deleteModal.userId));
      setDeleteModal({ isOpen: false, userId: '', userName: '', isLoading: false });
      finishActionSuccess('User deleted successfully.');
    } catch (error: any) {
      finishActionError();
      setDeleteModal((prev) => ({ ...prev, isLoading: false }));
      setStatusMessage({ type: 'error', text: error?.message || 'Failed to delete user.' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">User Management</h2>
        <p className="text-slate-600 dark:text-slate-400">Create, edit, and delete users. Updates are saved to the database and reflected instantly.</p>
      </div>

      {statusMessage && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            statusMessage.type === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300'
              : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or role..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Users ({searchFilteredUsers.length})
            </button>
            <button
              onClick={() => setActiveFilter('premium')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === 'premium'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Premium ({premiumClients.length})
            </button>
            <button
              onClick={() => setActiveFilter('admin')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === 'admin'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Admin ({adminUsers.length})
            </button>
            <button
              onClick={() => setActiveFilter('free')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === 'free'
                  ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-md shadow-slate-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Free ({freeUsers.length})
            </button>
          </div>

          {/* Create User Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-opacity hover:opacity-95 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Create User
          </button>
        </div>
      </div>

      {/* User Table Display */}
      <div className="space-y-6">
        {activeFilter === 'all' ? (
          <>
            {renderUserTable('Premium Clients', premiumClients)}
            {renderUserTable('Admin Users', adminUsers)}
            {renderUserTable('Free Users', freeUsers)}
          </>
        ) : activeFilter === 'premium' ? (
          renderUserTable('Premium Clients', premiumClients)
        ) : activeFilter === 'admin' ? (
          renderUserTable('Admin Users', adminUsers)
        ) : (
          renderUserTable('Free Users', freeUsers)
        )}
      </div>

      {/* Create User Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New User">
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={createForm.name}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={createForm.email}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={createForm.password}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
              placeholder="Enter password"
              required
            />
          </div>
          <AdminSelect
            label="Role"
            value={createForm.role}
            onChange={(value) => setCreateForm((prev) => ({ ...prev, role: value }))}
            options={[
              { value: 'client', label: 'Client' },
              { value: 'admin', label: 'Admin' },
            ]}
            required
          />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-opacity hover:opacity-95"
            >
              <Plus className="h-4 w-4" />
              Create User
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit User">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
            />
          </div>
          <AdminSelect
            label="Role"
            value={editForm.role}
            onChange={(value) => setEditForm((prev) => ({ ...prev, role: value }))}
            options={[
              { value: 'client', label: 'Client' },
              { value: 'admin', label: 'Admin' },
            ]}
            required
          />
          <AdminSelect
            label="Membership Role"
            value={editForm.membershipRole}
            onChange={(value) => setEditForm((prev) => ({ ...prev, membershipRole: value }))}
            options={[
              { value: 'free', label: 'Free' },
              { value: 'starter-care', label: 'Starter Care' },
              { value: 'growth-pro', label: 'Growth Pro' },
              { value: 'scale-elite', label: 'Scale Elite' },
            ]}
            required
          />
          <div>
            <label className="block text-sm font-medium mb-1">New Password (optional)</label>
            <input
              type="password"
              value={editForm.password}
              onChange={(e) => setEditForm((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSaveEdit}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-opacity hover:opacity-95"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete User"
        description="This will permanently delete this user and remove all related clinic assignments."
        itemName={deleteModal.userName}
        isLoading={deleteModal.isLoading}
        confirmLabel="Delete User"
        cancelLabel="Keep User"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, userId: '', userName: '', isLoading: false })}
      />
    </div>
  );
}
function AdminDashboardContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ADMIN_SECTIONS = [
    'Global Stats',
    'User Management',
    'Registered Clients',
    'Client Sites',
    'Activity Feed',
    'Platform Health',
    'Content Overview',
    'Lead Pipeline',
    'Analytics',
    'Blog Management',
    'News Management',
    'My Profile',
    'Settings',
  ] as const;

  const toViewValue = (label: string) => label.toLowerCase().replace(/\s+/g, '-');
  const toSectionLabel = (view: string | null) => {
    if (!view) return null;
    if (view === 'staff-management') return 'User Management';
    return ADMIN_SECTIONS.find((label) => toViewValue(label) === view) || null;
  };

  const [user, setUser] = useState<any>(null);
  const [clinics, setClinics] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  // track which sidebar section is active
  const [section, setSection] = useState<string>('Global Stats');
  const [sectionHistory, setSectionHistory] = useState<string[]>(['Global Stats']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const { theme } = useSitePreferences();
  const dark = theme === 'dark';
  const { t } = useAdminTranslation();

  // Modal states
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);
  const [showEditClinicModal, setShowEditClinicModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState<any>(null);
  const [showQuickAssignModal, setShowQuickAssignModal] = useState(false);
  const [quickAssignClinicId, setQuickAssignClinicId] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Form states
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPassword, setNewClientPassword] = useState('');
  const [newClientRole, setNewClientRole] = useState('client');
  const [newClinicName, setNewClinicName] = useState('');
  const [newClinicType, setNewClinicType] = useState('');
  const [newClinicLocation, setNewClinicLocation] = useState('');
  const [newClinicAssignedUser, setNewClinicAssignedUser] = useState('');
  const [newClinicServiceCategories, setNewClinicServiceCategories] = useState<string[]>([]);
  // Analytics refresh trigger – incremented after form saves
  const [analyticsRefreshKey, setAnalyticsRefreshKey] = useState(0);

  // Command Center metrics
  const [commandCenterData, setCommandCenterData] = useState({
    weeklyPatients: 0,
    weeklyPatientsTrend: 0,
    monthlyPatients: 0,
    monthlyPatientsTrend: 0,
    weeklyAdSpend: { meta: 0, google: 0, total: 0 },
    monthlyAdSpend: { meta: 0, google: 0, total: 0 },
    topClinics: [] as any[],
    traffic: { total: 0, calls: 0, websiteVisits: 0, directionClicks: 0 },
    alerts: [] as any[],
    recentActivity: [] as any[],
  });

  // Platform Health data for realtime tabs
  const [platformHealth, setPlatformHealth] = useState<any>(null);
  const [platformHealthLoading, setPlatformHealthLoading] = useState(false);

  const isAdminLike = useCallback((role?: string) => role === 'admin' || role === 'super_admin', []);

  const openClinicEditor = useCallback((clinic: any) => {
    setEditingClinic({
      ...clinic,
      serviceCategories: clinic.clientAssignments?.[0]?.serviceCategories || [],
    });
    setShowEditClinicModal(true);
  }, []);

  const fetchAdminData = useCallback(async () => {
    try {
      const [usersRes, clinicsRes] = await Promise.all([
        fetch('/api/admin/users', { cache: 'no-store' }),
        fetch('/api/admin/clinics', { cache: 'no-store' }),
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
        setAssignments(usersData.assignments || []);
      }

      if (clinicsRes.ok) {
        const clinicsData = await clinicsRes.json();
        setClinics(clinicsData.clinics || []);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  }, []);

  // Helper: compute name similarity score (0-1) for auto-matching GMB locations to clinic names
  const computeNameSimilarity = (clinicName: string, locationTitle: string): number => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const a = normalize(clinicName);
    const b = normalize(locationTitle);
    if (!a || !b) return 0;
    if (a === b) return 1;
    // Check if one contains the other
    if (a.includes(b) || b.includes(a)) return 0.9;
    // Word overlap scoring
    const wordsA = a.split(/\s+/).filter(w => w.length > 1);
    const wordsB = b.split(/\s+/).filter(w => w.length > 1);
    if (wordsA.length === 0 || wordsB.length === 0) return 0;
    const matches = wordsA.filter(w => wordsB.some(wb => wb.includes(w) || w.includes(wb)));
    return matches.length / Math.max(wordsA.length, wordsB.length);
  };

  const [gmbState, setGmbState] = useState({
    loading: false,
    connecting: false,
    syncing: false,
    error: '',
    message: '',
    connection: null as any,
    accounts: [] as any[],
    locations: [] as any[],
    selectedAccount: '',
    selectedLocation: '',
    // GA4 & Search Console
    ga4Properties: [] as { propertyId: string; displayName: string; account: string }[],
    scSites: [] as { siteUrl: string; permissionLevel: string }[],
    selectedGA4Property: '',
    selectedSCSite: '',
    accountsError: '',
    ga4Error: '',
    scError: '',
    analyticsLoading: false,
    analyticsSaving: false,
    confirmSyncing: false,
    syncCooldownSeconds: 0, // Countdown timer for sync cooldown
    syncProgress: 0, // 0-100% progress indicator for sync/save
    syncProgressLabel: '', // Current progress step label
    showProgress: false, // Whether to show full-screen progress
    clinicSaving: false, // Whether clinic details are being saved
    // Google Ads
    adsAccounts: [] as { customerId: string; descriptiveName: string; currencyCode: string }[],
    selectedAdsCustomerId: '',
    adsError: '',
    adsWarning: '',
  });

  // Delete confirmation modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    itemName: '',
    isLoading: false,
    onConfirm: () => {},
  });

  const [actionFeedback, setActionFeedback] = useState({
    loading: false,
    loadingText: 'Saving changes...',
    showSuccess: false,
    successMessage: '',
  });

  // Background task management
  const [backgroundTasks, setBackgroundTasks] = useState<BackgroundTask[]>([]);
  const taskIdRef = useRef(0);

  const addBackgroundTask = (type: 'blog' | 'news', message: string) => {
    const id = `task-${++taskIdRef.current}`;
    setBackgroundTasks(prev => [...prev, { id, type, status: 'running', message }]);
    return id;
  };

  const updateBackgroundTask = (id: string, status: 'success' | 'error', message: string, details?: string) => {
    setBackgroundTasks(prev => 
      prev.map(task => task.id === id ? { ...task, status, message, details } : task)
    );
    // Auto-dismiss success/error after 10 seconds
    setTimeout(() => {
      setBackgroundTasks(prev => prev.filter(task => task.id !== id));
    }, 10000);
  };

  const dismissBackgroundTask = (id: string) => {
    setBackgroundTasks(prev => prev.filter(task => task.id !== id));
  };

  // ── Sync progress popup state ──
  const [syncPopup, setSyncPopup] = useState<SyncProgressState>(INITIAL_SYNC_STATE);

  const updateSyncPopup = (patch: Partial<SyncProgressState>) => {
    setSyncPopup(prev => ({ ...prev, ...patch }));
  };

  const startSyncPopup = () => {
    setSyncPopup({
      visible: true,
      minimized: false,
      status: 'syncing',
      progress: 0,
      label: 'Starting data sync...',
      message: '',
      startedAt: Date.now(),
    });
  };

  const finishSyncPopup = (success: boolean, message: string) => {
    setSyncPopup(prev => ({
      ...prev,
      visible: true,       // Re-show popup as notification even if user closed it
      minimized: false,     // Expand so user sees the result
      status: success ? 'success' : 'error',
      progress: success ? 100 : prev.progress,
      label: success ? 'Complete' : 'Failed',
      message,
    }));
    // Auto-dismiss success notification after 15 seconds
    if (success) {
      setTimeout(() => {
        setSyncPopup(prev => (prev.status === 'success' ? INITIAL_SYNC_STATE : prev));
      }, 15000);
    }
  };

  // ── Sync cooldown countdown timer ──
  const startSyncCooldown = (seconds: number) => {
    setGmbState(prev => ({ ...prev, syncCooldownSeconds: Math.max(0, Math.round(seconds)) }));
  };

  useEffect(() => {
    if (gmbState.syncCooldownSeconds <= 0) return;
    const iv = setInterval(() => {
      setGmbState(prev => {
        const next = prev.syncCooldownSeconds - 1;
        return { ...prev, syncCooldownSeconds: next <= 0 ? 0 : next };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [gmbState.syncCooldownSeconds > 0]); // only re-subscribe when transitioning 0↔nonzero

  const formatCooldown = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const startActionFeedback = (loadingText: string) => {
    setActionFeedback(prev => ({
      ...prev,
      loading: true,
      loadingText,
      showSuccess: false,
    }));
  };

  const finishActionSuccess = (successMessage: string) => {
    setActionFeedback({
      loading: false,
      loadingText: 'Saving changes...',
      showSuccess: true,
      successMessage,
    });
  };

  const finishActionError = () => {
    setActionFeedback(prev => ({
      ...prev,
      loading: false,
    }));
  };

  const resetDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      title: '',
      description: '',
      itemName: '',
      isLoading: false,
      onConfirm: () => {},
    });
  };

  // Navigation functions
  const navigateToSection = (newSection: string) => {
    const newHistory = [...sectionHistory.slice(0, historyIndex + 1), newSection];
    setSectionHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSection(newSection);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSection(sectionHistory[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < sectionHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSection(sectionHistory[historyIndex + 1]);
    }
  };

  useEffect(() => {
    // Check auth
    fetch('/api/auth/me').then(res => {
      if (!res.ok) {
        navigate('/login');
      } else {
        res.json().then(data => {
          if (!isAdminLike(data.role)) {
            navigate('/dashboard/client');
          } else {
            setUser(data);
            fetchAdminData();
          }
        });
      }
    });

    // Fetch leads from database
    fetch('/api/contact-lead').then(res => res.json()).then(data => {
      setLeads(data.leads || []);
    }).catch(console.error);

    // Note: Socket.io is disabled for Vercel serverless deployment
    // Real-time updates are not available. Manual refresh or API polling recommended.
  }, [navigate, isAdminLike, fetchAdminData]);

  useEffect(() => {
    if (!user) return;
    const intervalId = window.setInterval(() => {
      fetchAdminData();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [user, fetchAdminData]);

  // Handle view parameter from URL - Consolidated to prevent race conditions
  useEffect(() => {
    const view = searchParams.get('view');
    const targetSection = toSectionLabel(view);

    // Only sync FROM URL if we have a valid view parameter and it differs from current section
    if (targetSection && targetSection !== section) {
      setSection(targetSection);
      setSectionHistory([targetSection]);
      setHistoryIndex(0);
    }
  }, []); // Empty dependency - only run on mount to read initial URL param

  // Handle OAuth return: when redirected back from Google OAuth (same-tab fallback),
  // detect the gmb_oauth param, auto-open the clinic's edit modal, and show the success message.
  useEffect(() => {
    const oauthStatus = searchParams.get('gmb_oauth');
    const clinicId = searchParams.get('gmb_clinic');
    const message = searchParams.get('gmb_msg');

    if (!oauthStatus || !clinicId) return;

    // Clean up URL params so refresh doesn't re-trigger
    const url = new URL(window.location.href);
    url.searchParams.delete('gmb_oauth');
    url.searchParams.delete('gmb_clinic');
    url.searchParams.delete('gmb_msg');
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);

    // Find the clinic in our loaded list and open its edit modal
    const matchedClinic = clinics.find(c => c.id === clinicId);
    if (matchedClinic) {
      openClinicEditor(matchedClinic);
    }

    // Update GMB state with the OAuth result
    if (oauthStatus === 'success') {
      lastLoadedClinicRef.current = null; // force refresh
      setGmbState(prev => ({
        ...prev,
        connecting: false,
        message: message || 'Google Business Profile connected successfully!',
        error: '',
      }));
      // Re-fetch the connection data with a slight delay to let the modal mount
      setTimeout(() => {
        if (clinicId) fetchGmbConnection(clinicId, true);
      }, 300);
    } else {
      setGmbState(prev => ({
        ...prev,
        connecting: false,
        message: '',
        error: message || 'Google connection failed. Please try again.',
      }));
    }
  }, [clinics, openClinicEditor]); // Run when clinics are loaded so we can match the clinicId

  // Sync TO URL whenever section changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    url.searchParams.set('view', toViewValue(section));
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  }, [section]);

  useEffect(() => {
    if (!actionFeedback.showSuccess) return;
    const timerId = window.setTimeout(() => {
      setActionFeedback(prev => ({ ...prev, showSuccess: false }));
    }, 2600);

    return () => window.clearTimeout(timerId);
  }, [actionFeedback.showSuccess]);

  // Fetch command center data when on Global Stats section
  useEffect(() => {
    if (section !== 'Global Stats' || !user) return;
    
    const fetchCommandCenterData = async () => {
      try {
        const response = await fetch('/api/admin/stats/command-center', { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          setCommandCenterData(data);
        }
      } catch (error) {
        console.error('Failed to fetch command center data:', error);
      }
    };

    fetchCommandCenterData();
    
    // Refresh every 30 seconds
    const intervalId = setInterval(fetchCommandCenterData, 30000);
    return () => clearInterval(intervalId);
  }, [section, user]);

  // Fetch platform health data for Activity Feed, Platform Health, Content Overview, Lead Pipeline tabs
  useEffect(() => {
    const needsHealth = ['Activity Feed', 'Platform Health', 'Content Overview', 'Lead Pipeline'].includes(section);
    if (!needsHealth || !user) return;

    const fetchPlatformHealth = async () => {
      setPlatformHealthLoading(true);
      try {
        const response = await fetch('/api/admin/stats/platform-health', { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          setPlatformHealth(data);
        }
      } catch (error) {
        console.error('Failed to fetch platform health:', error);
      } finally {
        setPlatformHealthLoading(false);
      }
    };

    fetchPlatformHealth();
    const intervalId = setInterval(fetchPlatformHealth, 15000); // Refresh every 15s
    return () => clearInterval(intervalId);
  }, [section, user]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/login');
  };

  const handleAssign = async () => {
    if (!selectedUser || !selectedClinic) {
      alert('Please select both a user and a clinic');
      return;
    }

    try {
      startActionFeedback('Assigning clinic...');
      const res = await fetch('/api/admin/clinics/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: selectedUser, clinicId: selectedClinic }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to assign clinic');
      }

      setAssignments(prev => {
        const exists = prev.some(a => a.userId === selectedUser && a.clinicId === selectedClinic);
        if (exists) return prev;
        return [...prev, data.assignment || { userId: selectedUser, clinicId: selectedClinic, serviceCategories: [] }];
      });

      finishActionSuccess('Clinic assigned successfully.');
      setSelectedUser('');
      setSelectedClinic('');
      fetchAdminData();
    } catch (error) {
      console.error('Error assigning clinic:', error);
      finishActionError();
      alert(`❌ Failed to assign clinic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleQuickAssign = async (userId: string) => {
    if (!userId || !quickAssignClinicId) {
      alert('Missing user or clinic');
      return;
    }

    try {
      startActionFeedback('Assigning clinic...');
      const res = await fetch('/api/admin/clinics/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, clinicId: quickAssignClinicId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to assign clinic');
      }

      setAssignments(prev => {
        const exists = prev.some(a => a.userId === userId && a.clinicId === quickAssignClinicId);
        if (exists) return prev;
        return [...prev, data.assignment || { userId, clinicId: quickAssignClinicId, serviceCategories: [] }];
      });

      finishActionSuccess('Clinic assigned successfully.');
      setShowQuickAssignModal(false);
      setQuickAssignClinicId('');
      setSelectedUser('');
      fetchAdminData();
    } catch (error) {
      console.error('Error assigning clinic:', error);
      finishActionError();
      alert(`❌ Failed to assign clinic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleRemoveAssignment = async (userId: string, clinicId: string) => {
    setDeleteModal({
      isOpen: true,
      title: 'Remove Assignment',
      description: 'This will remove the current user-clinic assignment.',
      itemName: 'User/Clinic Assignment',
      isLoading: false,
      onConfirm: async () => {
        setDeleteModal(prev => ({ ...prev, isLoading: true }));
        startActionFeedback('Removing assignment...');

        try {
          const res = await fetch('/api/admin/clinics/assign', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ userId, clinicId }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || 'Failed to remove assignment');
          }

          setAssignments(prev => prev.filter(a => !(a.userId === userId && a.clinicId === clinicId)));
          resetDeleteModal();
          finishActionSuccess('Assignment removed successfully.');
        } catch (error) {
          console.error('Error removing assignment:', error);
          finishActionError();
          resetDeleteModal();
          alert(`❌ Failed to remove assignment: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      },
    });
  };

  const handleUpdateStats = async (clinicId: string, leads: number, appointments: number) => {
    // Stats update can be added as future enhancement
    console.log('Update stats for clinic', clinicId, ':', { leads, appointments });
  };

  const handleAddClient = async () => {
    if (newClientName && newClientEmail && newClientPassword) {
      try {
        startActionFeedback('Creating user...');
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newClientName,
            email: newClientEmail,
            password: newClientPassword,
            role: newClientRole,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          finishActionError();
          alert(data.error || 'Failed to create user');
          return;
        }

        setUsers(prev => [data, ...prev]);

        setNewClientName('');
        setNewClientEmail('');
        setNewClientPassword('');
        setNewClientRole('client');
        setShowAddClientModal(false);
        finishActionSuccess('User added successfully.');
        fetchAdminData();
      } catch (err) {
        console.error('Error creating user:', err);
        finishActionError();
        alert('Failed to create user. Please try again.');
      }
    }
  };

  const handleAddClinic = async () => {
    if (!newClinicName || !newClinicType || !newClinicLocation) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      startActionFeedback('Creating clinic...');
      const res = await fetch('/api/admin/clinics/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: newClinicName,
          type: newClinicType,
          location: newClinicLocation,
          assignedUsers: newClinicAssignedUser ? [newClinicAssignedUser] : [],
          serviceCategories: newClinicServiceCategories,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create clinic');
      }

      setClinics(prev => [data, ...prev]);
      if (newClinicAssignedUser) {
        setAssignments(prev => {
          const exists = prev.some(a => a.userId === newClinicAssignedUser && a.clinicId === data.id);
          if (exists) return prev;
          return [...prev, { userId: newClinicAssignedUser, clinicId: data.id, serviceCategories: newClinicServiceCategories }];
        });
      }

      finishActionSuccess('Clinic created successfully.');
      setNewClinicName('');
      setNewClinicType('');
      setNewClinicLocation('');
      setNewClinicAssignedUser('');
      setNewClinicServiceCategories([]);
      setShowAddClinicModal(false);
      fetchAdminData();
    } catch (error) {
      console.error('Error creating clinic:', error);
      finishActionError();
      alert(`❌ Failed to create clinic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleEditClinic = async () => {
    if (!editingClinic) return;
    setGmbState(prev => ({ ...prev, clinicSaving: true, error: '', message: '' }));

    try {
      const res = await fetch(`/api/admin/clinics/${editingClinic.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: editingClinic.name,
          type: editingClinic.type,
          location: editingClinic.location,
          serviceCategories: editingClinic.serviceCategories || [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update clinic');
      }

      setGmbState(prev => ({ ...prev, clinicSaving: false, message: 'Clinic details saved successfully!' }));
      fetchAdminData();
    } catch (error) {
      console.error('Error updating clinic:', error);
      setGmbState(prev => ({ ...prev, clinicSaving: false, error: `Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}` }));
    }
  };

  const handleDeleteClinic = async (clinicId: string) => {
    const clinic = clinics.find(c => c.id === clinicId);
    
    setDeleteModal({
      isOpen: true,
      title: 'Delete Clinic',
      description: 'This will permanently delete the clinic and all associated data, including GMB connections and analytics. This action cannot be undone.',
      itemName: clinic?.name || '',
      isLoading: false,
      onConfirm: async () => {
        setDeleteModal(prev => ({ ...prev, isLoading: true }));
        startActionFeedback('Deleting clinic...');
        
        try {
          const res = await fetch(`/api/admin/clinics/${clinicId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || 'Failed to delete clinic');
          }

          setClinics(prev => prev.filter(c => c.id !== clinicId));
          setAssignments(prev => prev.filter(a => a.clinicId !== clinicId));
          resetDeleteModal();
          finishActionSuccess('Clinic deleted successfully.');
          fetchAdminData();
        } catch (error) {
          console.error('Error deleting clinic:', error);
          finishActionError();
          alert(`❌ Failed to delete clinic: ${error instanceof Error ? error.message : 'Unknown error'}`);
          resetDeleteModal();
        }
      },
    });
  };

  const handleDeleteClient = async (clientId: string) => {
    const client = users.find(u => u.id === clientId);
    
    setDeleteModal({
      isOpen: true,
      title: 'Delete User',
      description: 'This will permanently delete the user account and all associated data. This action cannot be undone.',
      itemName: client?.name || client?.email || '',
      isLoading: false,
      onConfirm: async () => {
        setDeleteModal(prev => ({ ...prev, isLoading: true }));
        startActionFeedback('Deleting user...');
        
        try {
          const res = await fetch(`/api/admin/users?id=${clientId}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (!res.ok) {
            finishActionError();
            alert(data.error || 'Failed to delete user');
            resetDeleteModal();
            return;
          }

          setUsers(prev => prev.filter(u => u.id !== clientId));
          setAssignments(prev => prev.filter(a => a.userId !== clientId));
          resetDeleteModal();
          finishActionSuccess('User deleted successfully.');
          fetchAdminData();
        } catch (err) {
          console.error('Error deleting user:', err);
          finishActionError();
          alert(`❌ Failed to delete user: ${err instanceof Error ? err.message : 'Unknown error'}`);
          resetDeleteModal();
        }
      },
    });
  };

  // Track which clinic we last loaded GMB data for, to avoid redundant API calls
  const lastLoadedClinicRef = useRef<string | null>(null);

  const fetchGmbConnection = async (clinicId: string, forceRefresh = false) => {
    // Skip if we already loaded data for this exact clinic (prevents quota burn)
    if (!forceRefresh && lastLoadedClinicRef.current === clinicId && gmbState.connection) {
      return;
    }

    setGmbState(prev => ({
      ...prev,
      loading: true,
      error: '',
      message: '',
    }));

    try {
      // Step 1: Always fetch connection status (DB-only, no Google API call)
      const connRes = await fetch(`/api/admin/gmb/connection?clinicId=${encodeURIComponent(clinicId)}`);
      const connData = await connRes.json();
      if (!connRes.ok) throw new Error(connData.error || 'Failed to load GMB connection');

      const connection = connData.connection;
      if (!connection) {
        lastLoadedClinicRef.current = clinicId;
        setGmbState(prev => ({
          ...prev,
          loading: false,
          connection: null,
          accounts: [],
          locations: [],
          ga4Properties: [],
          scSites: [],
          adsAccounts: [],
          selectedAccount: '',
          selectedLocation: '',
          selectedGA4Property: '',
          selectedSCSite: '',
          selectedAdsCustomerId: '',
          accountsError: '',
          ga4Error: '',
          scError: '',
          adsError: '',
          message: 'Connect Google to choose the correct business account and location.',
        }));
        return;
      }

      // Step 2: Fetch accounts, locations, GA4, SC, Ads in parallel (all use server-side cache)
      let accounts: any[] = [];
      let locations: any[] = [];
      let ga4Properties: any[] = [];
      let scSites: any[] = [];
      let adsAccounts: any[] = [];
      const apiWarnings: string[] = [];
      let accountsError = '';
      let ga4Error = '';
      let scError = '';
      let adsError = '';

      const selectedAccountId = connection.businessAccountId || '';

      // Build parallel requests — only call what we need
      const fetches: Promise<void>[] = [];

      fetches.push(
        fetch(`/api/admin/gmb/accounts?clinicId=${encodeURIComponent(clinicId)}`)
          .then(r => r.json())
          .then(d => {
            if (d.accounts) accounts = d.accounts;
            else if (d.error) {
              console.warn('[GMB] accounts error:', d.error);
              accountsError = d.error;
              apiWarnings.push(`Accounts: ${d.error}`);
            }
          })
          .catch(e => {
            console.warn('[GMB] accounts fetch failed:', e);
            accountsError = 'Failed to load business accounts';
            apiWarnings.push('Accounts: Failed to load business accounts');
          })
      );

      if (selectedAccountId) {
        fetches.push(
          fetch(`/api/admin/gmb/locations?clinicId=${encodeURIComponent(clinicId)}&accountName=${encodeURIComponent(selectedAccountId)}`)
            .then(r => r.json())
            .then(d => {
              if (d.locations) locations = d.locations;
              else if (d.error) { console.warn('[GMB] locations error:', d.error); apiWarnings.push(`Locations: ${d.error}`); }
            })
            .catch(e => { console.warn('[GMB] locations fetch failed:', e); })
        );
      }

      fetches.push(
        fetch(`/api/admin/gmb/ga4-properties?clinicId=${encodeURIComponent(clinicId)}`)
          .then(r => r.json())
          .then(d => {
            if (d.properties) ga4Properties = d.properties;
            else if (d.error) {
              console.warn('[GA4] properties error:', d.error);
              ga4Error = d.error;
              apiWarnings.push(`GA4: ${d.error}`);
            }
          })
          .catch(e => {
            console.warn('[GA4] properties fetch failed:', e);
            ga4Error = 'Failed to load GA4 properties';
            apiWarnings.push('GA4: Failed to load GA4 properties');
          })
      );

      fetches.push(
        fetch(`/api/admin/gmb/sc-sites?clinicId=${encodeURIComponent(clinicId)}`)
          .then(r => r.json())
          .then(d => {
            if (d.sites) scSites = d.sites;
            else if (d.error) {
              console.warn('[SC] sites error:', d.error);
              scError = d.error;
              apiWarnings.push(`Search Console: ${d.error}`);
            }
          })
          .catch(e => {
            console.warn('[SC] sites fetch failed:', e);
            scError = 'Failed to load Search Console sites';
            apiWarnings.push('Search Console: Failed to load Search Console sites');
          })
      );

      fetches.push(
        fetch(`/api/admin/gmb/ads-accounts?clinicId=${encodeURIComponent(clinicId)}`)
          .then(r => r.json())
          .then(d => {
            if (d.accounts) adsAccounts = d.accounts;
            if (d.warning) {
              adsError = d.warning;
              apiWarnings.push(`Google Ads: ${d.warning}`);
            } else if (d.error) {
              console.warn('[Ads] accounts error:', d.error);
              adsError = d.error;
              apiWarnings.push(`Google Ads: ${d.error}`);
            }
          })
          .catch(e => {
            console.warn('[Ads] accounts fetch failed:', e);
            adsError = 'Failed to load Google Ads accounts';
            apiWarnings.push('Google Ads: Failed to load Google Ads accounts');
          })
      );

      await Promise.allSettled(fetches);

      const selectedAccount = selectedAccountId || accounts?.[0]?.name || '';

      // If we got accounts but no locations yet (no saved account), fetch locations for first account
      if (!selectedAccountId && selectedAccount && locations.length === 0) {
        try {
          const locRes = await fetch(`/api/admin/gmb/locations?clinicId=${encodeURIComponent(clinicId)}&accountName=${encodeURIComponent(selectedAccount)}`);
          const locData = await locRes.json();
          if (locData.locations) locations = locData.locations;
        } catch { /* skip */ }
      }

      // Log API warnings for debugging
      if (apiWarnings.length > 0) {
        console.warn('[Google Integrations] API warnings:', apiWarnings);
      }

      // Auto-match GMB location to clinic name if no location is saved yet
      let autoMatchedLocation = connection.businessLocationId || '';
      if (!autoMatchedLocation && locations.length > 0 && editingClinic?.name) {
        if (locations.length === 1) {
          autoMatchedLocation = locations[0].name;
          console.log('[GMB] Auto-matched only location:', locations[0].title);
        } else {
          let bestMatch = { name: '', score: 0, title: '' };
          for (const loc of locations) {
            const score = computeNameSimilarity(editingClinic.name, loc.title || '');
            if (score > bestMatch.score) {
              bestMatch = { name: loc.name, score, title: loc.title || loc.name };
            }
          }
          if (bestMatch.score >= 0.3) {
            autoMatchedLocation = bestMatch.name;
            console.log(`[GMB] Auto-matched location "${bestMatch.title}" (score: ${bestMatch.score.toFixed(2)}) for clinic "${editingClinic.name}"`);
          }
        }
      }

      lastLoadedClinicRef.current = clinicId;
      setGmbState(prev => ({
        ...prev,
        loading: false,
        connection,
        accounts,
        locations,
        selectedAccount,
        selectedLocation: autoMatchedLocation,
        ga4Properties,
        scSites,
        selectedGA4Property: connection.ga4PropertyId || '',
        selectedSCSite: connection.searchConsoleSite || '',
        accountsError,
        ga4Error,
        scError,
        adsAccounts,
        selectedAdsCustomerId: connection.googleAdsCustomerId || '',
        adsError,
        message: apiWarnings.length > 0
          ? `Connected but some APIs returned errors: ${apiWarnings.join('; ')}`
          : connection.businessLocationId
            ? 'Google Business Profile connected. Daily sync is active.'
            : autoMatchedLocation
              ? 'Google connected. A matching location was auto-selected. Click Save Configuration to confirm.'
              : 'Google connected. Select account and location to complete setup.',
        error: '',
      }));
    } catch (error: any) {
      const msg = error?.message || 'Failed to load GMB status';
      const isQuota = msg.toLowerCase().includes('quota');
      setGmbState(prev => ({
        ...prev,
        loading: false,
        error: isQuota
          ? 'Google API rate limit reached. Your data is cached — please wait a few minutes before retrying.'
          : msg,
      }));
    }
  };

  const handleGmbDisconnect = () => {
    if (!editingClinic?.id) return;
    const clinicIdToDisconnect = editingClinic.id;
    const connectedEmail = gmbState.connection?.googleEmail || 'this Google account';

    setDeleteModal({
      isOpen: true,
      title: 'Disconnect Google Account',
      description: `This will revoke access, remove all synced Google data (Business Profile, Analytics, Search Console), and stop future syncs for this clinic. This action cannot be undone.`,
      itemName: connectedEmail,
      isLoading: false,
      onConfirm: async () => {
        setDeleteModal(prev => ({ ...prev, isLoading: true }));
        try {
          const res = await fetch('/api/admin/gmb/disconnect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clinicId: clinicIdToDisconnect }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to disconnect');

          // Reset GMB state to disconnected
          lastLoadedClinicRef.current = null;
          setGmbState(prev => ({
            ...prev,
            connection: null,
            accounts: [],
            locations: [],
            ga4Properties: [],
            scSites: [],
            adsAccounts: [],
            selectedAccount: '',
            selectedLocation: '',
            selectedGA4Property: '',
            selectedSCSite: '',
            selectedAdsCustomerId: '',
            accountsError: '',
            ga4Error: '',
            scError: '',
            adsError: '',
            message: `Google account (${connectedEmail}) disconnected successfully.`,
            error: '',
          }));
          resetDeleteModal();
        } catch (err: any) {
          resetDeleteModal();
          setGmbState(prev => ({ ...prev, error: err.message || 'Failed to disconnect Google account' }));
        }
      },
    });
  };

  const handleGmbConnect = async () => {
    if (!editingClinic?.id) return;
    const clinicIdForOAuth = editingClinic.id;

    setGmbState(prev => ({ ...prev, connecting: true, error: '', message: '' }));

    // Helper: called when OAuth completes (via postMessage, localStorage, or popup close)
    const onOAuthComplete = (success: boolean, message?: string) => {
      lastLoadedClinicRef.current = null; // force refresh on next fetch
      setGmbState(prev => ({
        ...prev,
        connecting: false,
        message: success ? (message || 'Google Business Profile connected successfully!') : '',
        error: success ? '' : (message || 'Failed to connect Google account'),
      }));
      // Always re-fetch with forceRefresh after OAuth
      fetchGmbConnection(clinicIdForOAuth, true);
    };

    try {
      // Get the OAuth URL from our endpoint
      const urlRes = await fetch(`/api/admin/gmb/auth-url?clinicId=${encodeURIComponent(clinicIdForOAuth)}`);
      const urlData = await urlRes.json();

      if (!urlRes.ok) {
        throw new Error(urlData.error || 'Failed to generate auth URL');
      }

      // Clear any stale localStorage result before opening popup
      try { localStorage.removeItem('gmb_oauth_result'); } catch { /* ignore */ }

      let oauthHandled = false;

      // Handler for postMessage (primary channel)
      const handlePopupMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.data?.type === 'gmb_auth_complete' && !oauthHandled) {
          oauthHandled = true;
          window.removeEventListener('message', handlePopupMessage);
          onOAuthComplete(event.data.success, event.data.message);
        }
      };

      window.addEventListener('message', handlePopupMessage);

      // Open popup with the auth URL
      const popup = window.open(
        urlData.authUrl,
        'gmb_oauth',
        `width=${urlData.popup?.width || 600},height=${urlData.popup?.height || 700}`
      );

      if (!popup) {
        window.removeEventListener('message', handlePopupMessage);
        // Popup blocked: fall back to same-tab redirect OAuth
        window.location.assign(urlData.authUrl);
        return;
      }

      // Poll for popup close + check localStorage fallback
      // This handles the case where window.opener is null (cross-origin navigation)
      const pollInterval = setInterval(() => {
        // Check localStorage fallback first
        try {
          const stored = localStorage.getItem('gmb_oauth_result');
          if (stored && !oauthHandled) {
            oauthHandled = true;
            localStorage.removeItem('gmb_oauth_result');
            clearInterval(pollInterval);
            window.removeEventListener('message', handlePopupMessage);
            const result = JSON.parse(stored);
            onOAuthComplete(result.success, result.message);
            return;
          }
        } catch { /* ignore localStorage errors */ }

        // Check if popup was closed without sending a message
        if (popup.closed && !oauthHandled) {
          oauthHandled = true;
          clearInterval(pollInterval);
          window.removeEventListener('message', handlePopupMessage);
          // Popup closed — check if OAuth actually succeeded by re-fetching connection
          onOAuthComplete(true, 'Checking connection status...');
        }
      }, 500);

      // Safety timeout: clear polling after 5 minutes
      setTimeout(() => {
        if (!oauthHandled) {
          oauthHandled = true;
          clearInterval(pollInterval);
          window.removeEventListener('message', handlePopupMessage);
          setGmbState(prev => ({
            ...prev,
            connecting: false,
            error: 'OAuth timed out. Please try again.',
          }));
        }
      }, 5 * 60 * 1000);
    } catch (error: any) {
      console.error('Error starting GMB connection:', error);
      setGmbState(prev => ({
        ...prev,
        connecting: false,
        error: error?.message || 'Failed to start GMB connection. Check configuration.',
      }));
    }
  };

  const handleAccountChange = async (accountName: string) => {
    if (!editingClinic?.id) return;

    setGmbState(prev => ({
      ...prev,
      selectedAccount: accountName,
      selectedLocation: '',
      locations: [],
      error: '',
      message: '',
    }));

    if (!accountName) return;

    try {
      const locationsRes = await fetch(`/api/admin/gmb/locations?clinicId=${encodeURIComponent(editingClinic.id)}&accountName=${encodeURIComponent(accountName)}`);
      const locationsData = await locationsRes.json();
      if (!locationsRes.ok) throw new Error(locationsData.error || 'Failed to load locations');

      const loadedLocations = locationsData.locations || [];
      // Auto-match location to clinic name
      let autoLocation = '';
      if (loadedLocations.length === 1) {
        autoLocation = loadedLocations[0].name;
      } else if (loadedLocations.length > 1 && editingClinic?.name) {
        let bestMatch = { name: '', score: 0 };
        for (const loc of loadedLocations) {
          const score = computeNameSimilarity(editingClinic.name, loc.title || '');
          if (score > bestMatch.score) bestMatch = { name: loc.name, score };
        }
        if (bestMatch.score >= 0.3) autoLocation = bestMatch.name;
      }
      setGmbState(prev => ({ ...prev, locations: loadedLocations, selectedLocation: autoLocation }));
    } catch (error: any) {
      setGmbState(prev => ({
        ...prev,
        error: error?.message || 'Failed to load locations',
      }));
    }
  };

  const handleSaveGmbSelection = async () => {
    if (!editingClinic?.id || !gmbState.selectedAccount || !gmbState.selectedLocation) return;

    setGmbState(prev => ({ ...prev, loading: true, error: '', message: '' }));

    try {
      const res = await fetch('/api/admin/gmb/select-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicId: editingClinic.id,
          accountName: gmbState.selectedAccount,
          locationName: gmbState.selectedLocation,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save account/location');

      await fetchGmbConnection(editingClinic.id, true);
      setGmbState(prev => ({
        ...prev,
        message: data.warning
          ? `Connected, but initial sync failed: ${data.warning}`
          : 'Google Business Profile location saved. Daily sync is now enabled.',
      }));
    } catch (error: any) {
      setGmbState(prev => ({
        ...prev,
        loading: false,
        error: error?.message || 'Failed to save GMB location',
      }));
    }
  };

  const handleManualGmbSync = async () => {
    if (!editingClinic?.id) return;

    setGmbState(prev => ({ ...prev, syncing: true, error: '', message: '' }));

    try {
      const res = await fetch('/api/admin/gmb/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clinicId: editingClinic.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Manual sync failed');

      await fetchGmbConnection(editingClinic.id, true);
      setGmbState(prev => ({
        ...prev,
        syncing: false,
        message: 'GMB data synced successfully.',
      }));
    } catch (error: any) {
      setGmbState(prev => ({
        ...prev,
        syncing: false,
        error: error?.message || 'Manual sync failed',
      }));
    }
  };
  void handleSaveGmbSelection;
  void handleManualGmbSync;

  useEffect(() => {
    if (!showEditClinicModal || !editingClinic?.id) return;
    fetchGmbConnection(editingClinic.id);
  }, [showEditClinicModal, editingClinic?.id]);

  // Listen for localStorage-based OAuth results (backup for tab/window focus events)
  useEffect(() => {
    if (!editingClinic?.id) return;
    const clinicId = editingClinic.id;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== 'gmb_oauth_result' || !event.newValue) return;
      try {
        const result = JSON.parse(event.newValue);
        localStorage.removeItem('gmb_oauth_result');
        lastLoadedClinicRef.current = null;
        setGmbState(prev => ({
          ...prev,
          connecting: false,
          message: result.success ? (result.message || 'Google connected!') : '',
          error: result.success ? '' : (result.message || 'Connection failed'),
        }));
        fetchGmbConnection(clinicId, true);
      } catch { /* ignore parse errors */ }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [editingClinic?.id]);

  if (!user) return <div className={`min-h-screen flex items-center justify-center ${dark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}><DashboardLoader variant="page" label="Loading..." className={dark ? 'text-slate-400' : 'text-slate-500'} /></div>;

  return (
    <>
    
    <div className={`dashboard-scope min-h-screen flex pt-20 ${dark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 w-64 border-r flex flex-col p-6 z-50 lg:z-auto transition-transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:pt-0 pt-20 ${dark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-white'}`}>
        {/* Back/Forward Navigation */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className={`p-2 rounded-lg transition-all ${historyIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= sectionHistory.length - 1}
            className={`p-2 rounded-lg transition-all ${historyIndex >= sectionHistory.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <span className="text-xs text-slate-500 ml-2">{section}</span>
        </div>

        <nav className="space-y-2 flex-grow">
          <NavItem icon={LayoutDashboard} label={t('Global Stats')} active={section==='Global Stats'} onClick={() => { navigateToSection('Global Stats'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={BarChart3} label={t('Analytics')} active={section==='Analytics'} onClick={() => { navigateToSection('Analytics'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Users} label={t('User Management')} active={section==='User Management'} onClick={() => { navigateToSection('User Management'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Building2} label={t('Registered Clients')} active={section==='Registered Clients'} onClick={() => { navigateToSection('Registered Clients'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Globe} label={t('Client Sites')} active={section==='Client Sites'} onClick={() => { navigateToSection('Client Sites'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Activity} label={t('Activity Feed')} active={section==='Activity Feed'} onClick={() => { navigateToSection('Activity Feed'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Zap} label={t('Platform Health')} active={section==='Platform Health'} onClick={() => { navigateToSection('Platform Health'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={FileText} label={t('Content Overview')} active={section==='Content Overview'} onClick={() => { navigateToSection('Content Overview'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Target} label={t('Lead Pipeline')} active={section==='Lead Pipeline'} onClick={() => { navigateToSection('Lead Pipeline'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={User} label={t('My Profile')} active={section==='My Profile'} onClick={() => { navigateToSection('My Profile'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Lock} label={t('Settings')} active={section==='Settings'} onClick={() => { navigateToSection('Settings'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={FileText} label={t('Blog Management')} active={section==='Blog Management'} onClick={() => { navigateToSection('Blog Management'); setShowMobileMenu(false); }} dark={dark} />
          <NavItem icon={Newspaper} label={t('News Management')} active={section==='News Management'} onClick={() => { navigateToSection('News Management'); setShowMobileMenu(false); }} dark={dark} />
          <Link to="/dashboard/admin/ai-creator" className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all ${dark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
            <Sparkles className="h-5 w-5" />
            <span className="text-sm">{t('AI Creator')}</span>
          </Link>
          <Link to="/dashboard/admin/chat-reports" className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all ${dark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">{t('Chat Reports')}</span>
          </Link>
          <Link to="/dashboard/admin/leads" className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all ${dark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
            <Users className="h-5 w-5" />
            <span className="text-sm">{t('Contact Leads')}</span>
          </Link>
          <Link to="/dashboard/admin/subscribers" className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all ${dark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
            <Mail className="h-5 w-5" />
            <span className="text-sm">{t('Newsletter Subscribers')}</span>
          </Link>
        </nav>

        <button onClick={handleLogout} className={`flex items-center gap-3 transition-colors p-3 ${dark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-bold">{t('Logout')}</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto flex flex-col">
        {/* Header with Mobile Menu Button and Settings */}
        <div className="flex items-center justify-end mb-6 lg:mb-8 relative">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 absolute left-0"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <AdminSettings />
        </div>

        <div className="flex-grow">
        <ContentForSection
          section={section}
          user={user}
          clinics={clinics}
          users={users}
          leads={leads}
          assignments={assignments}
          selectedUser={selectedUser}
          selectedClinic={selectedClinic}
          setSelectedUser={setSelectedUser}
          setSelectedClinic={setSelectedClinic}
          handleAssign={handleAssign}
          handleRemoveAssignment={handleRemoveAssignment}
          handleUpdateStats={handleUpdateStats}
          onAddClient={() => setShowAddClientModal(true)}
          onAddClinic={() => setShowAddClinicModal(true)}
          onEditClinic={openClinicEditor}
          onDeleteClinic={handleDeleteClinic}
          onDeleteClient={handleDeleteClient}
          onQuickAssign={(clinicId: string) => {
            setQuickAssignClinicId(clinicId);
            setShowQuickAssignModal(true);
          }}
          isDark={dark}
          analyticsRefreshKey={analyticsRefreshKey}
          setAnalyticsRefreshKey={setAnalyticsRefreshKey}
          setUsers={setUsers}
          setAssignments={setAssignments}
          isActionLoading={actionFeedback.loading}
          startActionFeedback={startActionFeedback}
          finishActionSuccess={finishActionSuccess}
          finishActionError={finishActionError}
          t={t}
          commandCenterData={commandCenterData}
          navigateToSection={navigateToSection}
          addBackgroundTask={addBackgroundTask}
          updateBackgroundTask={updateBackgroundTask}
          platformHealth={platformHealth}
          platformHealthLoading={platformHealthLoading}
        />
        </div>
      </main>
    </div>

    {/* Add Client Modal */}
    <Modal isOpen={showAddClientModal} onClose={() => setShowAddClientModal(false)} title="Add New User">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            value={newClientEmail}
            onChange={(e) => setNewClientEmail(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
            placeholder="john@example.com"
          />
        </div>
        <AdminSelect
          label="Role"
          value={newClientRole}
          onChange={(value) => setNewClientRole(value)}
          options={[
            { value: 'client', label: 'Client' },
            { value: 'admin', label: 'Admin' },
          ]}
          placeholder="Select a role"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select whether this user is a Client or Admin</p>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={newClientPassword}
            onChange={(e) => setNewClientPassword(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
            placeholder="Enter password for login"
          />
          <p className="text-xs text-slate-500 mt-1">User will use this password to log in</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleAddClient}
            disabled={!newClientName || !newClientEmail || !newClientPassword || actionFeedback.loading}
            className="flex-1 bg-emerald-500 text-black font-bold py-2 rounded-lg hover:bg-emerald-400 disabled:opacity-50"
          >
            {actionFeedback.loading ? 'Adding...' : 'Add User'}
          </button>
          <button
            onClick={() => setShowAddClientModal(false)}
            disabled={actionFeedback.loading}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    {/* Add Clinic Modal */}
    <Modal isOpen={showAddClinicModal} onClose={() => setShowAddClinicModal(false)} title="Add New Clinic">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Clinic Name</label>
          <input
            type="text"
            value={newClinicName}
            onChange={(e) => setNewClinicName(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
            placeholder="Downtown Medical Center"
          />
        </div>
        <AdminSelect
          label="Type"
          value={newClinicType}
          onChange={(value) => setNewClinicType(value)}
          options={[
            { value: '', label: 'Select type...' },
            { value: 'ER', label: 'Emergency Room (ER)' },
            { value: 'Urgent Care', label: 'Urgent Care' },
            { value: 'Wellness', label: 'Wellness Center' },
            { value: 'MedSpa', label: 'MedSpa' },
            { value: 'Dental', label: 'Dental Practice' },
            { value: 'Specialty', label: 'Specialty Clinic' },
          ]}
          required
        />
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={newClinicLocation}
            onChange={(e) => setNewClinicLocation(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
            placeholder="Houston, TX"
          />
        </div>
        <AdminSelect
          label="Assign to Client (Optional)"
          value={newClinicAssignedUser}
          onChange={(value) => setNewClinicAssignedUser(value)}
          options={[
            { value: '', label: 'Leave Unassigned' },
            ...users.filter(u => u.role === 'client').map(u => ({
              value: u.id,
              label: `${u.name} (${u.email})`
            }))
          ]}
        />
        <ServiceCategoryCheckboxGrid
          selectedCategories={newClinicServiceCategories}
          onChange={setNewClinicServiceCategories}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">You can assign this clinic to a client immediately, or leave it unassigned</p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleAddClinic}
            disabled={!newClinicName || !newClinicType || !newClinicLocation}
            className="flex-1 bg-emerald-500 text-black font-bold py-2 rounded-lg hover:bg-emerald-400 disabled:opacity-50"
          >
            Add Clinic
          </button>
          <button
            onClick={() => setShowAddClinicModal(false)}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    {/* Full-screen progress overlay (Save Configuration only) */}
    {gmbState.showProgress && gmbState.analyticsSaving && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <DashboardLoader variant="inline" className="text-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {gmbState.syncProgressLabel || 'Processing...'}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Please wait while we communicate with Google APIs</p>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Progress</span>
                <span className="text-sm font-black tabular-nums text-blue-600 dark:text-blue-400">{gmbState.syncProgress}%</span>
              </div>
              <div className="h-3 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${gmbState.syncProgress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )}

    {/* Edit Clinic Modal */}
    <Modal isOpen={showEditClinicModal} onClose={() => setShowEditClinicModal(false)} title="Clinic Profile" size="large">
      {editingClinic && (
        <div className="space-y-6">
          {/* Modern Clinic Details Form */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden bg-white/80 dark:bg-slate-800/40">
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700/50">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Clinic Details</h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Basic information about this clinic</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Clinic Name</label>
                <input
                  type="text"
                  value={editingClinic.name}
                  onChange={(e) => setEditingClinic({ ...editingClinic, name: e.target.value })}
                  placeholder="Enter clinic name"
                  className="w-full appearance-none rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={editingClinic.type}
                    onChange={(e) => setEditingClinic({ ...editingClinic, type: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/60 px-4 py-3 pr-10 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                  >
                    <option value="">Select clinic type...</option>
                    <option value="ER">Emergency Room (ER)</option>
                    <option value="Urgent Care">Urgent Care</option>
                    <option value="Wellness">Wellness Center</option>
                    <option value="MedSpa">MedSpa</option>
                    <option value="Dental">Dental Practice</option>
                    <option value="Specialty">Specialty Clinic</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                {!editingClinic.type && (
                  <p className="text-[11px] text-amber-500 mt-1.5 font-medium">Please select a clinic type</p>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Location</label>
                <input
                  type="text"
                  value={editingClinic.location}
                  onChange={(e) => setEditingClinic({ ...editingClinic, location: e.target.value })}
                  placeholder="e.g., Houston, TX"
                  className="w-full appearance-none rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>
              <ServiceCategoryCheckboxGrid
                selectedCategories={editingClinic.serviceCategories || []}
                onChange={(serviceCategories) => setEditingClinic({ ...editingClinic, serviceCategories })}
              />
              {/* Save Clinic Details button - now inside the card */}
              <button
                onClick={handleEditClinic}
                disabled={gmbState.clinicSaving}
                className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  gmbState.clinicSaving
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 cursor-wait'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow-md'
                }`}
              >
                {gmbState.clinicSaving ? (
                  <><DashboardLoader variant="inline" className="text-emerald-500" /> Saving...</>
                ) : (
                  <><Save className="h-4 w-4" /> Save Clinic Details</>
                )}
              </button>
            </div>
          </div>

          {/* ═══ Google Integrations — Modernized UI ═══ */}
          <div className="rounded-3xl border border-slate-200/70 dark:border-slate-700/70 overflow-hidden shadow-md bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm">
            {/* ── 1. Header ── */}
            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-white via-blue-50/40 to-indigo-50/40 dark:from-slate-800 dark:via-slate-800 dark:to-indigo-950/20 border-b border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Google Integrations</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Business Profile · Analytics · Search Console</p>
                </div>
              </div>
              {/* Status badge — shows nuanced state */}
              {(() => {
                if (!gmbState.connection) return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-slate-400" /> Not Connected
                  </span>
                );
                const hasGBP = !!gmbState.connection.businessLocationId;
                const hasGA4 = !!gmbState.selectedGA4Property;
                const hasSC = !!gmbState.selectedSCSite;
                const allConfigured = hasGBP && hasGA4 && hasSC;
                const anyConfigured = hasGBP || hasGA4 || hasSC;
                if (gmbState.syncing || gmbState.confirmSyncing) return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400">
                    <DashboardLoader variant="inline" className="text-blue-500" /> Syncing
                  </span>
                );
                if (allConfigured) return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Connected
                  </span>
                );
                if (anyConfigured) return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> Needs Setup
                  </span>
                );
                return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> Needs Setup
                  </span>
                );
              })()}
            </div>

            <div className="p-6 space-y-6">
              {/* ── Loading state ── */}
              {gmbState.loading && !gmbState.connection && (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <DashboardLoader variant="card" label="Loading integrations..." className="text-blue-500" />
                </div>
              )}

              {/* ── Not connected ── */}
              {!gmbState.loading && !gmbState.connection && (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <Link2 className="h-8 w-8 text-blue-500" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Connect your Google Account</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
                    Link a Google account to enable Business Profile, Google Analytics, and Search Console for this clinic.
                  </p>
                  <button
                    onClick={handleGmbConnect}
                    disabled={gmbState.connecting}
                    className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
                  >
                    {gmbState.connecting ? (
                      <><DashboardLoader variant="inline" className="text-white" /> Connecting...</>
                    ) : (
                      <><Link2 className="h-4 w-4" /> Connect Google Account</>
                    )}
                  </button>
                </div>
              )}

              {/* ── Connected state ── */}
              {gmbState.connection && (
                <>
                  {/* ── 2. Connected account card ── */}
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{gmbState.connection.googleEmail}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              {gmbState.connection.lastSyncedAt
                                ? <>Last synced {new Date(gmbState.connection.lastSyncedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(gmbState.connection.lastSyncedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</>
                                : 'Not synced yet — select profiles below to get started'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={handleGmbConnect}
                          disabled={gmbState.connecting}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                        >
                          {gmbState.connecting ? 'Reconnecting...' : 'Reconnect'}
                        </button>
                        <button
                          onClick={handleGmbDisconnect}
                          disabled={gmbState.connecting}
                          className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors disabled:opacity-50"
                          title="Disconnect Google account"
                        >
                          <Unlink className="h-3.5 w-3.5" /> Disconnect
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ── 3. Integration selection section ── */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Configure Integrations</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Select which Google services to connect for this clinic.</p>
                    </div>

                    {/* STEP 1: Google Business Profile */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm">
                      <div className="flex items-center gap-3 px-5 py-4 bg-white/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700/50">
                        <span className="h-7 w-7 rounded-lg bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Business Profile</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">Select your Google Business Profile location</p>
                        </div>
                        {gmbState.connection.businessLocationId ? (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                            <Check className="h-3 w-3" /> Selected
                          </span>
                        ) : gmbState.accounts.length > 0 ? (
                          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold shrink-0">Action needed</span>
                        ) : null}
                      </div>
                      <div className="p-5 space-y-4 bg-white/50 dark:bg-transparent">
                        {gmbState.loading && gmbState.accounts.length === 0 ? (
                          <div className="flex items-center gap-2 py-3 justify-center">
                            <DashboardLoader variant="inline" className="text-slate-400" />
                            <span className="text-xs text-slate-400">Loading business accounts...</span>
                          </div>
                        ) : gmbState.accountsError ? (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40">
                            <Search className="h-4 w-4 text-rose-500 shrink-0" />
                            <p className="text-xs text-rose-700 dark:text-rose-400">{gmbState.accountsError}</p>
                          </div>
                        ) : gmbState.accounts.length > 0 ? (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Business Account</label>
                              <div className="relative">
                                <select
                                  value={gmbState.selectedAccount}
                                  onChange={(e) => handleAccountChange(e.target.value)}
                                  className="w-full appearance-none rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/60 px-4 py-3 pr-10 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                                >
                                  <option value="">Choose an account...</option>
                                  {gmbState.accounts.map((account) => (
                                    <option key={account.name} value={account.name}>{account.accountName || account.name}</option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              </div>
                            </div>
                            {gmbState.selectedAccount && gmbState.locations.length > 0 && (
                              <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Business Location</label>
                                <div className="relative">
                                  <select
                                    value={gmbState.selectedLocation}
                                    onChange={(e) => setGmbState(prev => ({ ...prev, selectedLocation: e.target.value }))}
                                    className="w-full appearance-none rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/60 px-4 py-3 pr-10 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                                  >
                                    <option value="">Choose a location...</option>
                                    {gmbState.locations.map((location) => (
                                      <option key={location.name} value={location.name}>
                                        {`${location.title || location.name}${location.address ? ` — ${location.address}` : ''}`}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                </div>
                              </div>
                            )}
                            {gmbState.selectedAccount && gmbState.locations.length === 0 && !gmbState.loading && (
                              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                                <Search className="h-4 w-4 text-amber-500 shrink-0" />
                                <p className="text-xs text-amber-700 dark:text-amber-400">No locations found for this account. Check that a business location exists in Google Business Profile.</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <Search className="h-4 w-4 text-slate-400 shrink-0" />
                            <p className="text-xs text-slate-500 dark:text-slate-400">No business accounts found for this Google account.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* STEP 2: Google Analytics GA4 */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm">
                      <div className="flex items-center gap-3 px-5 py-4 bg-white/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700/50">
                        <span className="h-7 w-7 rounded-lg bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Google Analytics (GA4)</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">Select your GA4 property for traffic data</p>
                        </div>
                        {gmbState.selectedGA4Property ? (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                            <Check className="h-3 w-3" /> Selected
                          </span>
                        ) : gmbState.ga4Properties.length > 0 ? (
                          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold shrink-0">Action needed</span>
                        ) : null}
                      </div>
                      <div className="p-5 bg-white/50 dark:bg-transparent">
                        {gmbState.loading && gmbState.ga4Properties.length === 0 ? (
                          <div className="flex items-center gap-2 py-3 justify-center">
                            <DashboardLoader variant="inline" className="text-slate-400" />
                            <span className="text-xs text-slate-400">Loading GA4 properties...</span>
                          </div>
                        ) : gmbState.ga4Error ? (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40">
                            <Search className="h-4 w-4 text-rose-500 shrink-0" />
                            <p className="text-xs text-rose-700 dark:text-rose-400">{gmbState.ga4Error}</p>
                          </div>
                        ) : gmbState.ga4Properties.length > 0 ? (
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">GA4 Property</label>
                            <div className="relative">
                              <select
                                value={gmbState.selectedGA4Property}
                                onChange={(e) => setGmbState(prev => ({ ...prev, selectedGA4Property: e.target.value }))}
                                className="w-full appearance-none rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/60 px-4 py-3 pr-10 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                              >
                                <option value="">Choose a GA4 property...</option>
                                {gmbState.ga4Properties.map((p) => (
                                  <option key={p.propertyId} value={p.propertyId}>{`${p.displayName} (${p.account})`}</option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <Search className="h-4 w-4 text-slate-400 shrink-0" />
                            <p className="text-xs text-slate-500 dark:text-slate-400">No GA4 properties found for this Google account. Ensure the account has access to a GA4 property.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* STEP 3: Search Console */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm">
                      <div className="flex items-center gap-3 px-5 py-4 bg-white/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700/50">
                        <span className="h-7 w-7 rounded-lg bg-purple-500 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Search Console</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">Select your Search Console property for SEO data</p>
                        </div>
                        {gmbState.selectedSCSite ? (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                            <Check className="h-3 w-3" /> Selected
                          </span>
                        ) : gmbState.scSites.length > 0 ? (
                          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold shrink-0">Action needed</span>
                        ) : null}
                      </div>
                      <div className="p-5 bg-white/50 dark:bg-transparent">
                        {gmbState.loading && gmbState.scSites.length === 0 ? (
                          <div className="flex items-center gap-2 py-3 justify-center">
                            <DashboardLoader variant="inline" className="text-slate-400" />
                            <span className="text-xs text-slate-400">Loading Search Console sites...</span>
                          </div>
                        ) : gmbState.scError ? (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40">
                            <Globe className="h-4 w-4 text-rose-500 shrink-0" />
                            <p className="text-xs text-rose-700 dark:text-rose-400">{gmbState.scError}</p>
                          </div>
                        ) : gmbState.scSites.length > 0 ? (
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Search Console Site</label>
                            <div className="relative">
                              <select
                                value={gmbState.selectedSCSite}
                                onChange={(e) => setGmbState(prev => ({ ...prev, selectedSCSite: e.target.value }))}
                                className="w-full appearance-none rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/60 px-4 py-3 pr-10 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                              >
                                <option value="">Choose a site...</option>
                                {gmbState.scSites.map((s) => (
                                  <option key={s.siteUrl} value={s.siteUrl}>{s.siteUrl}</option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <Globe className="h-4 w-4 text-slate-400 shrink-0" />
                            <p className="text-xs text-slate-500 dark:text-slate-400">No Search Console sites found. Verify site ownership in Google Search Console first.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* STEP 4: Google Ads */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm">
                      <div className="flex items-center gap-3 px-5 py-4 bg-white/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700/50">
                        <span className="h-7 w-7 rounded-lg bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Google Ads</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">Select your Google Ads account for campaign data</p>
                        </div>
                        {gmbState.selectedAdsCustomerId ? (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                            <Check className="h-3 w-3" /> Selected
                          </span>
                        ) : gmbState.adsAccounts.length > 0 ? (
                          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold shrink-0">Action needed</span>
                        ) : null}
                      </div>
                      <div className="p-5 bg-white/50 dark:bg-transparent">
                        {gmbState.loading && gmbState.adsAccounts.length === 0 ? (
                          <div className="flex items-center gap-2 py-3 justify-center">
                            <DashboardLoader variant="inline" className="text-slate-400" />
                            <span className="text-xs text-slate-400">Loading Google Ads accounts...</span>
                          </div>
                        ) : gmbState.adsError ? (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                            <Search className="h-4 w-4 text-amber-500 shrink-0" />
                            <p className="text-xs text-amber-700 dark:text-amber-400">{gmbState.adsError}</p>
                          </div>
                        ) : gmbState.adsAccounts.length > 0 ? (
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Google Ads Account</label>
                            <div className="relative">
                              <select
                                value={gmbState.selectedAdsCustomerId}
                                onChange={(e) => setGmbState(prev => ({ ...prev, selectedAdsCustomerId: e.target.value }))}
                                className="w-full appearance-none rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/60 px-4 py-3 pr-10 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400"
                              >
                                <option value="">Choose an account...</option>
                                {gmbState.adsAccounts.map((a) => (
                                  <option key={a.customerId} value={a.customerId}>
                                    {`${a.descriptiveName || 'Account'} (${a.customerId})${a.currencyCode ? ` — ${a.currencyCode}` : ''}`}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <Search className="h-4 w-4 text-slate-400 shrink-0" />
                            <p className="text-xs text-slate-500 dark:text-slate-400">No Google Ads accounts found. A developer token may be required.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── 4. Action bar — Save + Sync ── */}
                  <div className="space-y-3 pt-2">
                    {/* Integration summary chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {[
                        { key: 'GBP', active: !!gmbState.connection.businessLocationId, label: gmbState.connection.locationName || 'Business Profile' },
                        { key: 'GA4', active: !!gmbState.selectedGA4Property, label: gmbState.ga4Properties.find(p => p.propertyId === gmbState.selectedGA4Property)?.displayName || 'Analytics' },
                        { key: 'SC', active: !!gmbState.selectedSCSite, label: gmbState.selectedSCSite || 'Search Console' },
                        { key: 'Ads', active: !!gmbState.selectedAdsCustomerId, label: gmbState.adsAccounts.find(a => a.customerId === gmbState.selectedAdsCustomerId)?.descriptiveName || 'Google Ads' },
                      ].map(item => (
                        <span key={item.key} className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                          item.active
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                        }`}>
                          {item.active ? <Check className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-current opacity-40" />}
                          {item.key}
                        </span>
                      ))}
                    </div>

                    {/* Save Configuration */}
                    <button
                      onClick={async () => {
                        if (!editingClinic?.id) return;
                        setGmbState(prev => ({ ...prev, analyticsSaving: true, error: '', message: '', showProgress: true, syncProgress: 0, syncProgressLabel: 'Saving Configuration...' }));
                        try {
                          // Save GBP selection if changed
                          if (gmbState.selectedAccount && gmbState.selectedLocation) {
                            setGmbState(prev => ({ ...prev, syncProgress: 20, syncProgressLabel: 'Saving Business Profile selection...' }));
                            const gbpRes = await fetch('/api/admin/gmb/select-location', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                clinicId: editingClinic.id,
                                accountName: gmbState.selectedAccount,
                                locationName: gmbState.selectedLocation,
                              }),
                            });
                            if (!gbpRes.ok) {
                              const err = await gbpRes.json();
                              throw new Error(err.error || 'Failed to save Business Profile selection');
                            }
                          }
                          setGmbState(prev => ({ ...prev, syncProgress: 50, syncProgressLabel: 'Saving analytics settings...' }));
                          // Save GA4 + SC selections
                          if (gmbState.selectedGA4Property || gmbState.selectedSCSite) {
                            const analyticsRes = await fetch('/api/admin/gmb/select-analytics', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                clinicId: editingClinic.id,
                                ga4PropertyId: gmbState.selectedGA4Property,
                                searchConsoleSite: gmbState.selectedSCSite,
                              }),
                            });
                            if (!analyticsRes.ok) {
                              const err = await analyticsRes.json();
                              throw new Error(err.error || 'Failed to save analytics configuration');
                            }
                          }
                          // Save Google Ads selection
                          if (gmbState.selectedAdsCustomerId) {
                            setGmbState(prev => ({ ...prev, syncProgress: 65, syncProgressLabel: 'Saving Google Ads selection...' }));
                            const adsRes = await fetch('/api/admin/gmb/select-ads', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                clinicId: editingClinic.id,
                                googleAdsCustomerId: gmbState.selectedAdsCustomerId,
                              }),
                            });
                            if (!adsRes.ok) {
                              const err = await adsRes.json();
                              throw new Error(err.error || 'Failed to save Google Ads configuration');
                            }
                          }
                          setGmbState(prev => ({ ...prev, syncProgress: 80, syncProgressLabel: 'Refreshing connection data...' }));
                          await fetchGmbConnection(editingClinic.id, true);
                          setGmbState(prev => ({ ...prev, syncProgress: 100, syncProgressLabel: 'Configuration saved!' }));
                          await new Promise(r => setTimeout(r, 600));
                          setGmbState(prev => ({
                            ...prev,
                            analyticsSaving: false,
                            showProgress: false,
                            syncProgress: 0,
                            message: 'Configuration saved successfully. You can now sync data.',
                          }));
                        } catch (err: any) {
                          setGmbState(prev => ({
                            ...prev,
                            analyticsSaving: false,
                            showProgress: false,
                            syncProgress: 0,
                            error: err?.message || 'Failed to save configuration',
                          }));
                        }
                      }}
                      disabled={gmbState.analyticsSaving || (!gmbState.selectedAccount && !gmbState.selectedGA4Property && !gmbState.selectedSCSite && !gmbState.selectedAdsCustomerId)}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                        gmbState.analyticsSaving
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-wait'
                          : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed'
                      }`}
                    >
                      {gmbState.analyticsSaving ? (
                        <><DashboardLoader variant="inline" className="text-blue-500" /> Saving Configuration...</>
                      ) : (
                        <><Save className="h-4 w-4" /> Save Configuration</>
                      )}
                    </button>

                    {/* Sync Data */}
                    <button
                      onClick={() => {
                        if (!editingClinic?.id) return;
                        // Mark button as syncing & open popup
                        setGmbState(prev => ({ ...prev, confirmSyncing: true, error: '', message: '' }));
                        startSyncPopup();

                        // Run sync async — popup tracks progress; closing popup does NOT abort sync
                        (async () => {
                          try {
                            let step = 0;
                            const hasGbp = !!gmbState.connection.businessLocationId;
                            const hasAnalytics = !!(gmbState.selectedGA4Property || gmbState.selectedSCSite || gmbState.selectedAdsCustomerId);
                            const totalSteps = (hasGbp ? 1 : 0) + (hasAnalytics ? 1 : 0);
                            if (totalSteps === 0) throw new Error('No integrations configured to sync');

                            if (gmbState.connection.businessLocationId) {
                              step++;
                              updateSyncPopup({ progress: Math.round((step / (totalSteps + 1)) * 70), label: 'Syncing Business Profile data...' });
                              const r = await fetch('/api/admin/gmb/sync', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ clinicId: editingClinic.id }),
                              });
                              if (r.status === 429) {
                                const data = await r.json();
                                if (data.secondsUntilNext) startSyncCooldown(data.secondsUntilNext);
                                throw new Error(data.error || 'Sync cooldown active. Please wait before retrying.');
                              }
                              if (!r.ok) throw new Error('GBP sync failed');
                            }

                            if (gmbState.selectedGA4Property || gmbState.selectedSCSite || gmbState.selectedAdsCustomerId) {
                              step++;
                              const syncingParts: string[] = [];
                              if (gmbState.selectedGA4Property) syncingParts.push('Analytics');
                              if (gmbState.selectedSCSite) syncingParts.push('Organic Traffic');
                              if (gmbState.selectedAdsCustomerId) syncingParts.push('Google Ads');
                              updateSyncPopup({ progress: Math.round((step / (totalSteps + 1)) * 70), label: `Syncing ${syncingParts.join(' & ')}...` });
                              const r = await fetch('/api/admin/gmb/sync-analytics', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ clinicId: editingClinic.id }),
                              });
                              const syncResult = await r.json().catch(() => ({}));
                              if (r.status === 429) {
                                if (syncResult.secondsUntilNext) startSyncCooldown(syncResult.secondsUntilNext);
                                throw new Error(syncResult.error || 'Analytics sync is on cooldown. Please wait before retrying.');
                              }
                              if (!r.ok) {
                                throw new Error(syncResult.error || 'Analytics sync failed');
                              }
                              if (syncResult.partial && syncResult.errors) {
                                console.warn('Partial sync success:', syncResult.errors);
                              }
                            }

                            updateSyncPopup({ progress: 85, label: 'Refreshing connection status...' });
                            await fetchGmbConnection(editingClinic.id, true);
                            
                            // Done — show success in popup & start cooldown
                            setGmbState(prev => ({ ...prev, confirmSyncing: false }));
                            startSyncCooldown(5 * 60); // 5-min cooldown matching server
                            finishSyncPopup(true, 'Your report is ready. Please view it in the View tab.');
                          } catch (err: any) {
                            setGmbState(prev => ({ ...prev, confirmSyncing: false }));
                            finishSyncPopup(false, err?.message || 'Sync failed. Please try again.');
                          }
                        })();
                      }}
                      disabled={gmbState.confirmSyncing || syncPopup.status === 'syncing' || gmbState.syncCooldownSeconds > 0 || (!gmbState.connection.businessLocationId && !gmbState.selectedGA4Property && !gmbState.selectedSCSite && !gmbState.selectedAdsCustomerId)}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
                        gmbState.confirmSyncing || syncPopup.status === 'syncing'
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 cursor-wait'
                          : gmbState.syncCooldownSeconds > 0
                            ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed'
                      }`}
                      title={gmbState.syncCooldownSeconds > 0 ? `Sync available in ${formatCooldown(gmbState.syncCooldownSeconds)}` : 'Sync your Google data now'}
                    >
                      {gmbState.confirmSyncing || syncPopup.status === 'syncing' ? (
                        <><DashboardLoader variant="inline" className="text-blue-500" /> Syncing...</>
                      ) : gmbState.syncCooldownSeconds > 0 ? (
                        <span className="flex items-center gap-2">
                          <Zap className="h-4 w-4 opacity-40" />
                          <span>Sync Data</span>
                          <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700/60 text-[11px] font-bold tabular-nums text-slate-500 dark:text-slate-400">
                            {formatCooldown(gmbState.syncCooldownSeconds)}
                          </span>
                        </span>
                      ) : (
                        <><Zap className="h-4 w-4" /> Sync Data</>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* ── 5. Status messages ── */}
              {gmbState.message && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800/40 animate-in fade-in">
                  <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">{gmbState.message}</p>
                  </div>
                </div>
              )}
              {gmbState.error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800/40 animate-in fade-in">
                  <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-800 dark:text-red-300">{gmbState.error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowEditClinicModal(false)}
              className="px-6 py-2.5 bg-slate-200 dark:bg-slate-700 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>

    {/* Quick Assign Modal */}
    <Modal isOpen={showQuickAssignModal} onClose={() => setShowQuickAssignModal(false)} title="Assign Client to Clinic">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Client</label>
          <select 
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
          >
            <option value="">Choose a client...</option>
            {users.filter(u => u.role === 'client').map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => selectedUser && handleQuickAssign(selectedUser)}
            disabled={!selectedUser || actionFeedback.loading}
            className="flex-1 bg-emerald-500 text-black font-bold py-2 rounded-lg hover:bg-emerald-400 disabled:opacity-50"
          >
            {actionFeedback.loading ? 'Assigning...' : 'Assign'}
          </button>
          <button
            onClick={() => {
              setShowQuickAssignModal(false);
              setSelectedUser('');
            }}
            disabled={actionFeedback.loading}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    <DeleteConfirmationModal
      isOpen={deleteModal.isOpen}
      title={deleteModal.title}
      description={deleteModal.description}
      itemName={deleteModal.itemName}
      isLoading={deleteModal.isLoading}
      onConfirm={deleteModal.onConfirm}
      onCancel={resetDeleteModal}
    />

    <ActionFeedback
      loading={actionFeedback.loading}
      loadingText={actionFeedback.loadingText}
      showSuccess={actionFeedback.showSuccess}
      successMessage={actionFeedback.successMessage}
      onDismissSuccess={() => setActionFeedback(prev => ({ ...prev, showSuccess: false }))}
    />

    <BackgroundTaskNotification 
      tasks={backgroundTasks}
      onDismiss={dismissBackgroundTask}
    />

    <SyncProgressPopup
      state={syncPopup}
      onMinimize={() => updateSyncPopup({ minimized: true })}
      onMaximize={() => updateSyncPopup({ minimized: false })}
      onClose={() => updateSyncPopup({ visible: false, minimized: false })}
      onDismiss={() => setSyncPopup(INITIAL_SYNC_STATE)}
    />

    
    </>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <DashboardLoader variant="page" label="Loading dashboard..." className="text-emerald-500" />
    </div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}

/* ─── Admin Profile View ─── */
function AdminProfileView({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatar || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 5MB' });
      return;
    }

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'File must be an image' });
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      let avatarUrl = formData.avatar;

      if (avatarFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', avatarFile);

        const uploadRes = await fetch('/api/upload/avatar', {
          method: 'POST',
          body: uploadFormData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          avatarUrl = uploadData.url;
        } else {
          throw new Error('Failed to upload avatar');
        }
      }

      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          avatar: avatarUrl,
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center overflow-hidden border-4 border-white/30">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt={user?.name} width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-white">{user?.name?.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-slate-800 border-2 border-emerald-500 cursor-pointer hover:scale-110 transition-transform">
                  <Camera className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-emerald-100 flex items-center gap-2 mt-1">
                  <ShieldAlert className="h-4 w-4" />
                  Administrator
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <MailIcon className="inline h-4 w-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-2">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <User className="inline h-4 w-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all"
        >
          <Save className="h-5 w-5" />
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

    </div>
  );
}
function DashboardSettingsView({ role }: { role: 'admin' | 'client' }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/password')
      .then((res) => res.json())
      .then((data) => {
        if (data?.currentPassword) setCurrentPassword(data.currentPassword);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Failed to load current password.' });
      });
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to update password');
      }

      setMessage({ type: 'success', text: 'Password updated and saved successfully.' });
      setCurrentPassword(data.currentPassword || newPassword);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="glass rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Change your password and update account-level security settings.</p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Updating Password...' : (
              <>
                <Lock className="h-5 w-5" />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>

      <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold mb-1">{role === 'admin' ? 'Admin Settings' : 'Client Settings'}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {role === 'admin'
            ? 'Your password controls access to dashboard administration, client management, and platform controls.'
            : 'Your password controls access to client analytics, profile data, and billing settings.'}
        </p>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, onClick, dark = false }: { icon: any, label: string, active?: boolean, onClick?: () => void, dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all ${
        active ? 'bg-emerald-500 text-black font-bold' : dark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm">{label}</span>
    </button>
  );
}

// render content based on selected section
function ContentForSection(props: {
  section: string;
  user: any;
  clinics: any[];
  users: any[];
  leads: any[];
  assignments: any[];
  selectedUser: string;
  selectedClinic: string;
  setSelectedUser: (s: string) => void;
  setSelectedClinic: (s: string) => void;
  handleAssign: () => void;
  handleRemoveAssignment: (u:string,c:string)=>void;
  handleUpdateStats: (c:string,l:number,a:number)=>void;
  onAddClient: () => void;
  onAddClinic: () => void;
  onEditClinic: (c: any) => void;
  onDeleteClinic: (id: string) => void;
  onDeleteClient: (id: string) => void;
  onQuickAssign: (clinicId: string) => void;
  isDark: boolean;
  analyticsRefreshKey: number;
  setAnalyticsRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setAssignments: React.Dispatch<React.SetStateAction<any[]>>;
  isActionLoading: boolean;
  startActionFeedback: (loadingText: string) => void;
  finishActionSuccess: (successMessage: string) => void;
  finishActionError: () => void;
  t: (key: string) => string;
  commandCenterData: any;
  navigateToSection: (section: string) => void;
  addBackgroundTask: (type: 'blog' | 'news', message: string) => string;
  updateBackgroundTask: (id: string, status: 'success' | 'error', message: string, details?: string) => void;
  platformHealth: any;
  platformHealthLoading: boolean;
}) {
  const {
    section,
    user,
    clinics,
    users,
    assignments,
    selectedUser,
    selectedClinic,
    setSelectedUser,
    setSelectedClinic,
    handleAssign,
    handleRemoveAssignment,
    handleUpdateStats,
    onAddClient,
    onAddClinic,
    onEditClinic,
    onDeleteClinic,
    onDeleteClient,
    onQuickAssign,
    isDark,
    analyticsRefreshKey,
    setAnalyticsRefreshKey,
    setUsers,
    setAssignments,
    isActionLoading,
    startActionFeedback,
    finishActionSuccess,
    finishActionError,
    t,
    commandCenterData,
    navigateToSection,
    addBackgroundTask,
    updateBackgroundTask,
    platformHealth,
    platformHealthLoading,
  } = props;

  switch(section) {
    case 'Global Stats':
      return (
        <>
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-[20px] font-bold mb-1">{t('Command Center')}</h1>
              <p className="text-slate-500 dark:text-slate-400">{t('Welcome')}, {user.name}. {t('System health is optimal')}.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onAddClient}
                className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all"
              >
                <Plus className="h-5 w-5" /> {t('New User')}
              </button>
              <button 
                onClick={onAddClinic}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                <Plus className="h-5 w-5" /> {t('New Clinic')}
              </button>
            </div>
          </header>

          {/* Real-time Clinic Management (same as before) */}
          <div className="glass rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-700 mb-12">
            <h3 className="text-xl font-bold mb-6">{t('Assign Clinics to Clients')}</h3>
            <div className="flex flex-wrap gap-4 mb-8">
              <select 
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 dark:text-slate-200 focus:outline-none focus:border-emerald-500 min-w-[200px]"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">{t('Select Client User')}</option>
                {users.filter(u => u.role === 'client').map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
              <select 
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 dark:text-slate-200 focus:outline-none focus:border-emerald-500 min-w-[200px]"
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
              >
                <option value="">{t('Select Clinic/ER')}</option>
                {clinics.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - {c.location}</option>
                ))}
              </select>
              <button 
                onClick={handleAssign}
                disabled={!selectedUser || !selectedClinic || isActionLoading}
                className="bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isActionLoading ? 'Assigning...' : 'Assign'}
              </button>
            </div>

            <h3 className="text-xl font-bold mb-6">Manage Clinics (Real-time Sync)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                    <th className="px-4 py-4">Clinic Name</th>
                    <th className="px-4 py-4">Type</th>
                    <th className="px-4 py-4">Assigned Users</th>
                    <th className="px-4 py-4">Leads</th>
                    <th className="px-4 py-4">Appointments</th>
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {clinics.map(clinic => {
                    const assignedUsers = assignments.filter(a => a.clinicId === clinic.id).map(a => {
                      const u = users.find(user => user.id === a.userId);
                      return u ? { ...u, assignmentId: a.userId } : null;
                    }).filter(Boolean);

                    return (
                      <tr key={clinic.id} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <td className="px-4 py-4 font-bold">{clinic.name}</td>
                        <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{clinic.type}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {assignedUsers.map((u: any) => (
                              <span key={u.id} className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md flex items-center gap-2">
                                {u.name}
                                <button
                                  onClick={() => handleRemoveAssignment(u.id, clinic.id)}
                                  disabled={isActionLoading}
                                  className="text-red-400 hover:text-red-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {assignedUsers.length === 0 && <span className="text-slate-400 text-xs">Unassigned</span>}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <input 
                            type="number" 
                            value={clinic.leads}
                            onChange={(e) => handleUpdateStats(clinic.id, parseInt(e.target.value) || 0, clinic.appointments)}
                            className="w-20 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-center dark:text-slate-200"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <input 
                            type="number" 
                            value={clinic.appointments}
                            onChange={(e) => handleUpdateStats(clinic.id, clinic.leads, parseInt(e.target.value) || 0)}
                            className="w-20 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-center dark:text-slate-200"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-emerald-500 text-xs">Live Sync Active</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => onQuickAssign(clinic.id)}
                                className="text-xs bg-emerald-500 text-black px-3 py-1 rounded hover:bg-emerald-400 transition-colors font-bold"
                              >
                                + Assign
                              </button>
                              <button 
                                onClick={() => onEditClinic(clinic)}
                                className="text-xs bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors font-bold"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => onDeleteClinic(clinic.id)}
                                className="text-xs bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white px-3 py-1 rounded transition-colors font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Patient Visits - Last Week */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Week</h4>
              </div>
              <p className="text-3xl font-bold mb-1">{commandCenterData.weeklyPatients.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Patient Visits</p>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <span className={commandCenterData.weeklyPatientsTrend >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                  {commandCenterData.weeklyPatientsTrend >= 0 ? '↑' : '↓'} {Math.abs(commandCenterData.weeklyPatientsTrend)}%
                </span>
                <span className="text-slate-500 dark:text-slate-400">vs prev week</span>
              </div>
            </div>

            {/* Total Patient Visits - Last Month */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Month</h4>
              </div>
              <p className="text-3xl font-bold mb-1">{commandCenterData.monthlyPatients.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Patient Visits</p>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <span className={commandCenterData.monthlyPatientsTrend >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                  {commandCenterData.monthlyPatientsTrend >= 0 ? '↑' : '↓'} {Math.abs(commandCenterData.monthlyPatientsTrend)}%
                </span>
                <span className="text-slate-500 dark:text-slate-400">vs prev month</span>
              </div>
            </div>

            {/* Total Ad Spend - Week */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-amber-500" />
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Weekly Ad Spend</h4>
              </div>
              <p className="text-3xl font-bold mb-1">${commandCenterData.weeklyAdSpend.total.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Meta + Google</p>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Meta: ${commandCenterData.weeklyAdSpend.meta.toLocaleString()} • Google: ${commandCenterData.weeklyAdSpend.google.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Ad Spend - Month */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-purple-500" />
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Ad Spend</h4>
              </div>
              <p className="text-3xl font-bold mb-1">${commandCenterData.monthlyAdSpend.total.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Meta + Google</p>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Meta: ${commandCenterData.monthlyAdSpend.meta.toLocaleString()} • Google: ${commandCenterData.monthlyAdSpend.google.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Patient Visits by Clinic & Traffic Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Patient Visits by Clinic */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-lg font-bold">Top Performing Clinics</h3>
                </div>
                <button 
                  onClick={() => navigateToSection('Analytics')}
                  className="text-xs text-emerald-500 hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {commandCenterData.topClinics.length > 0 ? (
                  commandCenterData.topClinics.map((clinic: any) => (
                    <div key={clinic.clinicId} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{clinic.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{clinic.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{clinic.patients.toLocaleString()}</p>
                        <p className="text-xs">
                          <span className={clinic.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                            {clinic.trend >= 0 ? '↑' : '↓'} {Math.abs(clinic.trend)}%
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-sm">No data available</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Add weekly analytics to see clinic performance</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Traffic & GMB Summary */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-bold">Traffic & GMB Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Traffic</p>
                  <p className="text-2xl font-bold">{commandCenterData.traffic.total.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Phone Calls</p>
                  <p className="text-2xl font-bold">{commandCenterData.traffic.calls.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Website Visits</p>
                  <p className="text-2xl font-bold">{commandCenterData.traffic.websiteVisits.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Direction Clicks</p>
                  <p className="text-2xl font-bold">{commandCenterData.traffic.directionClicks.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* System Alerts & Issues */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <ShieldAlert className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-bold">System Alerts</h3>
              </div>
              <div className="space-y-3">
                {commandCenterData.alerts.length > 0 ? (
                  commandCenterData.alerts.map((alert: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{alert.message}</p>
                        {alert.details && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{alert.details}</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.type === 'warning'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {alert.type === 'warning' ? '⚠️' : '❌'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">All systems operational</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">No alerts or issues detected</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">OK</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Admin Activity */}
            <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-bold">Recent Activity</h3>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {commandCenterData.recentActivity.length > 0 ? (
                  commandCenterData.recentActivity.map((activity: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{activity.action}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {activity.name} {activity.details && `• ${activity.details}`}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 dark:text-slate-400">No recent activity</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      );

    case 'User Management':
      return (
        <StaffManagementSection
          users={users}
          setUsers={setUsers}
          setAssignments={setAssignments}
          currentUserId={user?.id}
          startActionFeedback={startActionFeedback}
          finishActionSuccess={finishActionSuccess}
          finishActionError={finishActionError}
        />
      );

    case 'Registered Clients':
      return (
        <div>
          <h2 className="text-2xl font-bold mb-6">Registered Clients</h2>
          <p className="mb-4 text-slate-600 dark:text-slate-400">All users who have signed up as clients on the platform.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Signup Date</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {users.filter(u => u.role === 'client').map(client => (
                  <tr key={client.id} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-4 font-bold">{client.name}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{client.email}</td>
                    <td className="px-4 py-4"><span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">{client.role}</span></td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{client.createdAt ? new Date(client.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-4 py-4 flex items-center gap-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full">Active</span>
                      <button onClick={() => onDeleteClient(client.id)} className="p-1 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.filter(u => u.role === 'client').length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                      No clients registered yet. <button onClick={onAddClient} className="text-emerald-500 font-bold hover:underline">Add one now</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'Client Sites':
      return (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Client Sites</h2>
              <p className="text-slate-600 dark:text-slate-400">Overview of every clinic/ER registered with the platform.</p>
            </div>
            <button
              onClick={onAddClinic}
              className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-xl font-bold hover:bg-emerald-400 transition-all"
            >
              <Plus className="h-5 w-5" /> Add Clinic
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Leads</th>
                  <th className="px-4 py-4">Appointments</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {clinics.map(c => (
                  <tr key={c.id} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-4 font-bold">{c.name}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{c.type}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{c.location}</td>
                    <td className="px-4 py-4">{c.leads}</td>
                    <td className="px-4 py-4">{c.appointments}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onEditClinic(c)} className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => onDeleteClinic(c.id)} className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {clinics.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                      No clinics registered yet. <button onClick={onAddClinic} className="text-emerald-500 font-bold hover:underline">Add one now</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'Activity Feed':
      return (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Activity Feed</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Live platform events — auto-refreshes every 15 seconds</p>
            </div>
            {platformHealthLoading && <DashboardLoader variant="inline" />}
          </div>

          {!platformHealth ? (
            <DashboardLoader variant="card" label="Loading activity..." />
          ) : (
            <>
              {/* Quick stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Leads (24h)</p>
                  <p className="text-3xl font-black text-blue-500">{platformHealth.recent?.leads24h || 0}</p>
                </div>
                <div className="glass rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">New Users (7d)</p>
                  <p className="text-3xl font-black text-emerald-500">{platformHealth.recent?.users7d || 0}</p>
                </div>
                <div className="glass rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Posts (7d)</p>
                  <p className="text-3xl font-black text-purple-500">{platformHealth.recent?.posts7d || 0}</p>
                </div>
                <div className="glass rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Chat Sessions (7d)</p>
                  <p className="text-3xl font-black text-amber-500">{platformHealth.recent?.sessions7d || 0}</p>
                </div>
              </div>

              {/* Activity timeline */}
              <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {(platformHealth.activityFeed || []).map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                      <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                        item.type === 'lead' ? 'bg-blue-500' :
                        item.type === 'user' ? 'bg-emerald-500' :
                        item.type === 'post' ? 'bg-purple-500' :
                        item.type === 'chat' ? 'bg-amber-500' :
                        item.type === 'news' ? 'bg-rose-500' :
                        'bg-slate-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                        {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                  {(!platformHealth.activityFeed || platformHealth.activityFeed.length === 0) && (
                    <p className="text-center text-slate-500 py-8">No recent activity yet.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      );

    case 'Platform Health':
      return (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Platform Health</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Real-time database stats and system overview</p>
            </div>
            {platformHealthLoading && <DashboardLoader variant="inline" />}
          </div>

          {!platformHealth ? (
            <DashboardLoader variant="card" label="Loading health data..." />
          ) : (
            <>
              {/* Database record counts */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { label: 'Users', value: platformHealth.counts?.users, color: 'text-blue-500' },
                  { label: 'Clinics', value: platformHealth.counts?.clinics, color: 'text-emerald-500' },
                  { label: 'Blog Posts', value: platformHealth.counts?.posts, color: 'text-purple-500' },
                  { label: 'News Articles', value: platformHealth.counts?.news, color: 'text-rose-500' },
                  { label: 'Leads', value: platformHealth.counts?.leads, color: 'text-amber-500' },
                  { label: 'Subscribers', value: platformHealth.counts?.subscribers, color: 'text-cyan-500' },
                  { label: 'Chat Sessions', value: platformHealth.counts?.chatSessions, color: 'text-indigo-500' },
                  { label: 'Chat Messages', value: platformHealth.counts?.chatMessages, color: 'text-pink-500' },
                  { label: 'Google Connected', value: platformHealth.counts?.connectedClinics, color: 'text-green-500' },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value?.toLocaleString() ?? 0}</p>
                  </div>
                ))}
              </div>

              {/* Content breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-4">Content Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Published Posts</span>
                      <span className="font-bold text-emerald-500">{platformHealth.content?.publishedPosts ?? 0}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${platformHealth.counts?.posts ? Math.round((platformHealth.content?.publishedPosts / platformHealth.counts.posts) * 100) : 0}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Draft Posts</span>
                      <span className="font-bold text-amber-500">{platformHealth.content?.draftPosts ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Published News</span>
                      <span className="font-bold text-blue-500">{platformHealth.content?.publishedNews ?? 0}</span>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-4">7-Day Snapshot</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-sm">New Leads</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{platformHealth.recent?.leads24h ?? 0} today</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <span className="text-sm">New Users</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{platformHealth.recent?.users7d ?? 0} this week</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="text-sm">New Posts</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">{platformHealth.recent?.posts7d ?? 0} this week</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <span className="text-sm">Chat Sessions</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{platformHealth.recent?.sessions7d ?? 0} this week</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      );

    case 'Content Overview':
      return (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Content Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Blog, news, and newsletter performance at a glance</p>
            </div>
            {platformHealthLoading && <DashboardLoader variant="inline" />}
          </div>

          {!platformHealth ? (
            <DashboardLoader variant="card" label="Loading content data..." />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="glass rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Total Posts</p>
                  </div>
                  <p className="text-3xl font-black">{platformHealth.counts?.posts ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-1">{platformHealth.content?.publishedPosts ?? 0} published · {platformHealth.content?.draftPosts ?? 0} drafts</p>
                </div>
                <div className="glass rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Newspaper className="h-5 w-5 text-rose-500" />
                    <p className="text-xs text-slate-500 uppercase tracking-wider">News Articles</p>
                  </div>
                  <p className="text-3xl font-black">{platformHealth.counts?.news ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-1">{platformHealth.content?.publishedNews ?? 0} published</p>
                </div>
                <div className="glass rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-cyan-500" />
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Subscribers</p>
                  </div>
                  <p className="text-3xl font-black text-cyan-500">{platformHealth.counts?.subscribers ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-1">Active newsletter subscribers</p>
                </div>
                <div className="glass rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-amber-500" />
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Chat Messages</p>
                  </div>
                  <p className="text-3xl font-black text-amber-500">{platformHealth.counts?.chatMessages?.toLocaleString() ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-1">{platformHealth.counts?.chatSessions ?? 0} sessions total</p>
                </div>
              </div>

              {/* Recent content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-4">Recent Blog Posts</h3>
                  <div className="space-y-3">
                    {(platformHealth.activityFeed || []).filter((a: any) => a.type === 'post').slice(0, 5).map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                          <span className="text-sm truncate">{item.title?.replace('Blog: ', '')}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${item.detail === 'published' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700'}`}>
                          {item.detail}
                        </span>
                      </div>
                    ))}
                    {(platformHealth.activityFeed || []).filter((a: any) => a.type === 'post').length === 0 && (
                      <p className="text-center text-slate-500 py-4 text-sm">No recent posts</p>
                    )}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-4">Recent News</h3>
                  <div className="space-y-3">
                    {(platformHealth.activityFeed || []).filter((a: any) => a.type === 'news').slice(0, 5).map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0" />
                          <span className="text-sm truncate">{item.title?.replace('News: ', '')}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${item.detail === 'published' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700'}`}>
                          {item.detail}
                        </span>
                      </div>
                    ))}
                    {(platformHealth.activityFeed || []).filter((a: any) => a.type === 'news').length === 0 && (
                      <p className="text-center text-slate-500 py-4 text-sm">No recent news</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Link to="/dashboard/admin?view=blog-management" className="glass rounded-xl px-5 py-3 border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Manage Blog →
                </Link>
                <Link to="/dashboard/admin?view=news-management" className="glass rounded-xl px-5 py-3 border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Manage News →
                </Link>
              </div>
            </>
          )}
        </div>
      );

    case 'Lead Pipeline':
      return (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Lead Pipeline</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Track leads through every stage of the funnel</p>
            </div>
            <div className="flex items-center gap-3">
              {platformHealthLoading && <DashboardLoader variant="inline" />}
              <Link to="/dashboard/admin/leads" className="text-sm font-bold text-emerald-500 hover:underline">
                View All Leads →
              </Link>
            </div>
          </div>

          {!platformHealth ? (
            <DashboardLoader variant="card" label="Loading pipeline..." />
          ) : (
            <>
              {/* Pipeline funnel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'New', value: platformHealth.leadPipeline?.new ?? 0, color: 'bg-blue-500', textColor: 'text-blue-500', bgLight: 'bg-blue-50 dark:bg-blue-900/20' },
                  { label: 'Contacted', value: platformHealth.leadPipeline?.contacted ?? 0, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50 dark:bg-yellow-900/20' },
                  { label: 'Qualified', value: platformHealth.leadPipeline?.qualified ?? 0, color: 'bg-emerald-500', textColor: 'text-emerald-500', bgLight: 'bg-emerald-50 dark:bg-emerald-900/20' },
                  { label: 'Closed', value: platformHealth.leadPipeline?.closed ?? 0, color: 'bg-slate-500', textColor: 'text-slate-500', bgLight: 'bg-slate-50 dark:bg-slate-800' },
                ].map((stage, i) => (
                  <div key={i} className={`rounded-xl p-5 border border-slate-200 dark:border-slate-700 ${stage.bgLight}`}>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{stage.label}</p>
                    <p className={`text-3xl font-black ${stage.textColor}`}>{stage.value}</p>
                    <div className="mt-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                      <div className={`${stage.color} h-1.5 rounded-full transition-all`} style={{ width: `${platformHealth.counts?.leads ? Math.max(5, Math.round((stage.value / platformHealth.counts.leads) * 100)) : 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total + conversion */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Total Leads</p>
                  <p className="text-3xl font-black">{platformHealth.counts?.leads ?? 0}</p>
                </div>
                <div className="glass rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Leads Today</p>
                  <p className="text-3xl font-black text-blue-500">{platformHealth.recent?.leads24h ?? 0}</p>
                </div>
                <div className="glass rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Qualified Rate</p>
                  <p className="text-3xl font-black text-emerald-500">
                    {platformHealth.counts?.leads ? Math.round(((platformHealth.leadPipeline?.qualified ?? 0) / platformHealth.counts.leads) * 100) : 0}%
                  </p>
                </div>
              </div>

              {/* Recent leads table */}
              <div className="glass rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold">Latest Leads</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {(platformHealth.activityFeed || []).filter((a: any) => a.type === 'lead').slice(0, 8).map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          item.status === 'new' ? 'bg-blue-500' :
                          item.status === 'qualified' ? 'bg-emerald-500' :
                          item.status === 'contacted' ? 'bg-yellow-500' :
                          'bg-slate-400'
                        }`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.title?.replace('New lead: ', '')}</p>
                          <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700' :
                          item.status === 'qualified' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700' :
                          item.status === 'contacted' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-600'
                        }`}>{item.status}</span>
                        <span className="text-xs text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {(platformHealth.activityFeed || []).filter((a: any) => a.type === 'lead').length === 0 && (
                    <p className="text-center text-slate-500 py-8 text-sm">No leads yet. Leads will appear here when users submit contact forms.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      );

    case 'Analytics':
      return (
        <div className="space-y-8">
          {/* Data Entry Form – at the TOP */}
          <AnalyticsForm
            onSaved={() => {
              setAnalyticsRefreshKey((k) => k + 1);
              // Note: Socket.io is disabled for Vercel serverless deployment
            }}
          />

          {/* Analytics Charts – refreshed after every save */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-black mb-2">📊 Charts & Insights</h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Charts below update in real time after each save. Edit your data above to see instant results.
              </p>
            </div>
            <div className={`pt-6 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              <ClientErrorBoundary
                isDark={isDark}
                title="Analytics charts failed to load"
                description="A client-side rendering error occurred in the analytics charts. You can retry below without reloading the dashboard."
              >
                <ClientAnalyticsView isAdmin refreshTrigger={analyticsRefreshKey} />
              </ClientErrorBoundary>
            </div>
          </div>

          {/* Google Analytics & Search Console (per-clinic) */}
          <ClientErrorBoundary
            isDark={isDark}
            title="Google analytics section failed to load"
            description="A client-side rendering error occurred in the Google Analytics/Search Console section. Retry to continue."
          >
            <GoogleAnalyticsSection clinics={clinics} isDark={isDark} />
          </ClientErrorBoundary>
        </div>
      );

    case 'Blog Management':
      return <BlogManagementSection addBackgroundTask={addBackgroundTask} updateBackgroundTask={updateBackgroundTask} />;

    case 'News Management':
      return <NewsManagementSection addBackgroundTask={addBackgroundTask} updateBackgroundTask={updateBackgroundTask} />;

    case 'My Profile':
      return <AdminProfileView user={user} />;

    case 'Settings':
      return <DashboardSettingsView role="admin" />;

    default:
      return <div>Unknown section</div>;
  }
}

/* ─── Blog Management Section ─── */
function BlogManagementSection({ 
  addBackgroundTask, 
  updateBackgroundTask 
}: {
  addBackgroundTask: (type: 'blog' | 'news', message: string) => string;
  updateBackgroundTask: (id: string, status: 'success' | 'error', message: string, details?: string) => void;
}) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Auto-Blog state
  const [aiCustomTopic, setAiCustomTopic] = useState('');
  const [aiShowPanel, setAiShowPanel] = useState(false);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    postId: 0,
    postTitle: '',
    isLoading: false,
  });

  useEffect(() => {
    // Admin list — returns drafts too (the public /api/posts filters them out).
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => { setPosts(data.posts || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const post = posts.find(p => p.id === id);
    setDeleteModal({
      isOpen: true,
      postId: id,
      postTitle: post?.title || '',
      isLoading: false,
    });
  };

  const confirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isLoading: true }));
    try {
      await fetch(`/api/admin/posts/${deleteModal.postId}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p.id !== deleteModal.postId));
      setDeleteModal({ isOpen: false, postId: 0, postTitle: '', isLoading: false });
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(`❌ Failed to delete post: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setDeleteModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  // ── Toggle publish/draft status ───────────────────────────────────
  const handleTogglePublish = async (postId: number, currentStatus: string | null, slug: string) => {
    try {
      const newStatus = currentStatus ? null : new Date().toISOString();
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishedAt: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      
      // Update local state
      setPosts(posts.map(p => p.id === postId ? { ...p, publishedAt: newStatus } : p));
      
      // Revalidate sitemap + homepage whenever publish state changes
      await fetch('/api/revalidate-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type: 'blog' }),
      });
    } catch (error) {
      console.error('Toggle publish error:', error);
      alert('Failed to update post status');
    }
  };

  // ── Change publish date ───────────────────────────────────────────
  const handleChangePublishDate = async (postId: number, newDate: string, slug: string) => {
    if (!newDate) return;
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishedAt: new Date(newDate).toISOString() }),
      });
      if (!res.ok) throw new Error('Failed to update date');
      setPosts(posts.map(p => p.id === postId ? { ...p, publishedAt: new Date(newDate).toISOString() } : p));
      await fetch('/api/revalidate-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type: 'blog' }),
      });
    } catch (error) {
      console.error('Change publish date error:', error);
      alert('Failed to update publish date');
    }
  };

  // ── AI Blog generation handler ────────────────────────────────────
  const handleAiGenerate = async (autoPublish: boolean) => {
    const taskId = addBackgroundTask('blog', `Generating AI blog post${autoPublish ? ' and publishing' : ''}...`);
    setAiCustomTopic('');
    setAiShowPanel(false); // Close the panel so user can navigate away
    
    try {
      const res = await fetch('/api/ai/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiCustomTopic.trim() || undefined,
          autoPublish,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Generation failed');
      
      // Refresh post list — admin endpoint so drafts are included.
      const postsRes = await fetch('/api/admin/posts');
      const postsData = await postsRes.json();
      setPosts(postsData.posts || []);

      // Show success notification
      updateBackgroundTask(
        taskId, 
        'success', 
        '✅ Blog post generated successfully!',
        `"${data.post.title}" is now ${autoPublish ? 'published' : 'saved as draft'}`
      );
    } catch (err) {
      updateBackgroundTask(
        taskId, 
        'error', 
        '❌ Blog generation failed',
        err instanceof Error ? err.message : 'Unknown error'
      );
    }
  };

  // ── One-Shot Blog generation handler ──────────────────────────────
  const handleOneShotGenerate = async (autoPublish: boolean) => {
    const taskId = addBackgroundTask('blog', `One-shot blog draft${autoPublish ? ' + publish' : ''}...`);
    setAiCustomTopic('');
    setAiShowPanel(false);
    
    try {
      const res = await fetch('/api/ai/generate-blog-oneshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiCustomTopic.trim() || undefined,
          autoPublish,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Generation failed');
      
      const postsRes = await fetch('/api/admin/posts');
      const postsData = await postsRes.json();
      setPosts(postsData.posts || []);

      updateBackgroundTask(
        taskId, 
        'success', 
        '✅ One-shot blog draft created!',
        `"${data.post.title}" — SEO ${data.post.seoScore}/100 — ${autoPublish ? 'published' : 'saved as draft'}`
      );
    } catch (err) {
      updateBackgroundTask(
        taskId, 
        'error', 
        '❌ One-shot blog failed',
        err instanceof Error ? err.message : 'Unknown error'
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-slate-600 dark:text-slate-400">Create and manage blog posts for your website.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setAiShowPanel(!aiShowPanel)}
            className="flex items-center gap-2 bg-violet-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-violet-400 transition-all"
          >
            <Sparkles className="h-5 w-5" /> AI Auto-Blog
          </button>
          <Link
            to="/dashboard/admin/blog/new"
            className="flex items-center gap-2 bg-emerald-500 text-black px-5 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all"
          >
            <Plus className="h-5 w-5" /> New Post
          </Link>
        </div>
      </div>

      {/* ── AI Auto-Blog Panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {aiShowPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="glass rounded-2xl border border-violet-200 dark:border-violet-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                  <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Blog Generator</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Auto-generates SEO-optimized posts with images, internal & external links. Runs daily at 8 AM CST.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Custom Topic (optional)</label>
                  <input
                    type="text"
                    value={aiCustomTopic}
                    onChange={(e) => setAiCustomTopic(e.target.value)}
                    placeholder="Leave blank for auto-selected healthcare marketing topic..."
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAiGenerate(false)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all"
                  >
                    <Sparkles className="h-4 w-4" /> Generate Draft
                  </button>
                  <button
                    onClick={() => handleAiGenerate(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-violet-500 text-white hover:bg-violet-400 transition-all"
                  >
                    <Zap className="h-4 w-4" /> Generate &amp; Publish
                  </button>
                </div>

                {/* One-Shot Draft Mode */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wide">One-Shot Draft (GPT-4o, single output, no retries)</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleOneShotGenerate(false)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
                    >
                      <Sparkles className="h-4 w-4" /> One-Shot Draft
                    </button>
                    <button
                      onClick={() => handleOneShotGenerate(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 text-white hover:bg-amber-400 transition-all"
                    >
                      <Zap className="h-4 w-4" /> One-Shot &amp; Publish
                    </button>
                  </div>
                </div>

                {/* Info about daily automation */}
                <div className="flex items-start gap-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0 text-violet-500" />
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Daily Auto-Publish Active</p>
                    <p>A new blog post is automatically generated and published every day at <strong>8:00 AM CST</strong>. Each post includes SEO fields, a DALL-E cover image, internal links to your services, and external citations from credible healthcare sources.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <DashboardLoader variant="card" label="Loading posts..." className="text-emerald-500" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">No posts yet. Create your first blog post!</p>
          <Link to="/dashboard/admin/blog/new" className="text-emerald-500 dark:text-emerald-400 font-bold hover:underline">Create Post →</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                {post.coverImage ? (
                  <img src={post.coverImage} alt="" className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">{post.excerpt}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="text-slate-500 dark:text-slate-500 font-mono">/{post.slug}</span>
                        {post.publishedAt ? (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                            <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></span>
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full font-medium">
                            <span className="w-1.5 h-1.5 bg-amber-500 dark:bg-amber-400 rounded-full"></span>
                            Draft
                          </span>
                        )}
                        {/* Publish date picker — visible when published */}
                        {post.publishedAt && (
                          <label className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 cursor-pointer" title="Change publish date">
                            <Calendar className="h-3.5 w-3.5" />
                            <input
                              type="date"
                              defaultValue={post.publishedAt.substring(0, 10)}
                              onChange={(e) => handleChangePublishDate(post.id, e.target.value, post.slug)}
                              className="bg-transparent text-xs text-slate-600 dark:text-slate-400 border-0 outline-none cursor-pointer w-28"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublish(post.id, post.publishedAt, post.slug)}
                    className={`p-2 rounded-lg transition-all ${
                      post.publishedAt
                        ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                        : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    }`}
                    title={post.publishedAt ? 'Unpublish' : 'Publish'}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <Link
                    to={`/dashboard/admin/blog/edit/${post.id}`}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Blog Post"
        description="This will permanently delete the blog post. This action cannot be undone."
        itemName={deleteModal.postTitle}
        isLoading={deleteModal.isLoading}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, postId: 0, postTitle: '', isLoading: false })}
      />
    </div>
  );
}

/* ─── News Management Section ─── */
function NewsManagementSection({ 
  addBackgroundTask, 
  updateBackgroundTask 
}: {
  addBackgroundTask: (type: 'blog' | 'news', message: string) => string;
  updateBackgroundTask: (id: string, status: 'success' | 'error', message: string, details?: string) => void;
}) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Auto-News state
  const [aiCustomTopic, setAiCustomTopic] = useState('');
  const [aiShowPanel, setAiShowPanel] = useState(false);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    articleId: 0,
    articleTitle: '',
    isLoading: false,
  });

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => { setArticles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const article = articles.find(a => a.id === id);
    setDeleteModal({
      isOpen: true,
      articleId: id,
      articleTitle: article?.title || '',
      isLoading: false,
    });
  };

  const confirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isLoading: true }));
    try {
      await fetch(`/api/admin/news/${deleteModal.articleId}`, { method: 'DELETE' });
      setArticles(articles.filter(a => a.id !== deleteModal.articleId));
      setDeleteModal({ isOpen: false, articleId: 0, articleTitle: '', isLoading: false });
    } catch (error) {
      console.error('Error deleting article:', error);
      alert(`❌ Failed to delete article: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setDeleteModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  // ── Toggle publish/draft status ───────────────────────────────────
  const handleTogglePublish = async (articleId: number, currentStatus: string | null, slug: string) => {
    try {
      const newStatus = currentStatus ? null : new Date().toISOString();
      const res = await fetch(`/api/admin/news/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishedAt: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      
      setArticles(articles.map(a => a.id === articleId ? { ...a, publishedAt: newStatus } : a));

      // Revalidate sitemap + homepage whenever publish state changes
      await fetch('/api/revalidate-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type: 'news' }),
      });
    } catch (error) {
      console.error('Toggle publish error:', error);
      alert('Failed to update article status');
    }
  };

  // ── Change publish date ───────────────────────────────────────────
  const handleChangePublishDate = async (articleId: number, newDate: string, slug: string) => {
    if (!newDate) return;
    try {
      const res = await fetch(`/api/admin/news/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishedAt: new Date(newDate).toISOString() }),
      });
      if (!res.ok) throw new Error('Failed to update date');
      setArticles(articles.map(a => a.id === articleId ? { ...a, publishedAt: new Date(newDate).toISOString() } : a));
      await fetch('/api/revalidate-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type: 'news' }),
      });
    } catch (error) {
      console.error('Change publish date error:', error);
      alert('Failed to update publish date');
    }
  };

  // ── AI News generation handler ────────────────────────────────────
  const handleAiGenerate = async (autoPublish: boolean) => {
    const taskId = addBackgroundTask('news', `Generating AI news article${autoPublish ? ' and publishing' : ''}...`);
    setAiCustomTopic('');
    setAiShowPanel(false); // Close the panel so user can navigate away
    
    try {
      const res = await fetch('/api/ai/generate-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiCustomTopic.trim() || undefined,
          autoPublish,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Generation failed');
      
      // Refresh article list
      const articlesRes = await fetch('/api/news');
      const articlesData = await articlesRes.json();
      setArticles(articlesData);
      
      // Show success notification
      updateBackgroundTask(
        taskId, 
        'success', 
        '✅ News article generated successfully!',
        `"${data.article.title}" is now ${autoPublish ? 'published' : 'saved as draft'}`
      );
    } catch (err) {
      updateBackgroundTask(
        taskId, 
        'error', 
        '❌ News generation failed',
        err instanceof Error ? err.message : 'Unknown error'
      );
    }
  };

  // ── One-Shot News generation handler ──────────────────────────────
  const handleOneShotGenerate = async (autoPublish: boolean) => {
    const taskId = addBackgroundTask('news', `One-shot news draft${autoPublish ? ' + publish' : ''}...`);
    setAiCustomTopic('');
    setAiShowPanel(false);
    
    try {
      const res = await fetch('/api/ai/generate-news-oneshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiCustomTopic.trim() || undefined,
          autoPublish,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Generation failed');
      
      const articlesRes = await fetch('/api/news');
      const articlesData = await articlesRes.json();
      setArticles(articlesData);
      
      updateBackgroundTask(
        taskId, 
        'success', 
        '✅ One-shot news draft created!',
        `"${data.article.title}" — SEO ${data.article.validationScore}/100 — ${autoPublish ? 'published' : 'saved as draft'}`
      );
    } catch (err) {
      updateBackgroundTask(
        taskId, 
        'error', 
        '❌ One-shot news failed',
        err instanceof Error ? err.message : 'Unknown error'
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">News Management</h2>
          <p className="text-slate-600 dark:text-slate-400">Create and manage healthcare news articles.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setAiShowPanel(!aiShowPanel)}
            className="flex items-center gap-2 bg-violet-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-violet-400 transition-all"
          >
            <Sparkles className="h-5 w-5" /> AI Auto-News
          </button>
          <Link
            to="/dashboard/admin/news/new"
            className="flex items-center gap-2 bg-emerald-500 text-black px-5 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all"
          >
            <Plus className="h-5 w-5" /> New Article
          </Link>
        </div>
      </div>

      {/* ── AI Auto-News Panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {aiShowPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="glass rounded-2xl border border-violet-200 dark:border-violet-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                  <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI News Generator</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Auto-generates SEO-optimized news articles with images and credible sources. Runs daily at 2 PM CST.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Custom Topic (optional)</label>
                  <input
                    type="text"
                    value={aiCustomTopic}
                    onChange={(e) => setAiCustomTopic(e.target.value)}
                    placeholder="Leave blank for auto-selected healthcare news topic..."
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAiGenerate(false)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all"
                  >
                    <Sparkles className="h-4 w-4" /> Generate Draft
                  </button>
                  <button
                    onClick={() => handleAiGenerate(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-violet-500 text-white hover:bg-violet-400 transition-all"
                  >
                    <Zap className="h-4 w-4" /> Generate &amp; Publish
                  </button>
                </div>

                {/* One-Shot Draft Mode */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wide">One-Shot Draft (GPT-4o, single output, no retries)</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleOneShotGenerate(false)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
                    >
                      <Sparkles className="h-4 w-4" /> One-Shot Draft
                    </button>
                    <button
                      onClick={() => handleOneShotGenerate(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 text-white hover:bg-amber-400 transition-all"
                    >
                      <Zap className="h-4 w-4" /> One-Shot &amp; Publish
                    </button>
                  </div>
                </div>

                {/* Info about daily automation */}
                <div className="flex items-start gap-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0 text-violet-500" />
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Daily Auto-Publish Active</p>
                    <p>A new news article is automatically generated and published every day at <strong>2:00 PM CST</strong>. Each article includes SEO fields, a DALL-E cover image, internal links, and external citations from credible healthcare news sources.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <DashboardLoader variant="card" label="Loading articles..." className="text-emerald-500" />
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <Newspaper className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">No news articles yet. Create your first one!</p>
          <Link to="/dashboard/admin/news/new" className="text-emerald-500 dark:text-emerald-400 font-bold hover:underline">Create Article →</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {articles.map(article => (
            <div key={article.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                {article.coverImage ? (
                  <img src={article.coverImage} alt="" className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Newspaper className="h-8 w-8 text-slate-400" />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">{article.title}</h3>
                      {article.excerpt && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">{article.excerpt}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="text-slate-500 dark:text-slate-500 font-mono">/{article.slug}</span>
                        {article.source && (
                          <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full font-medium">
                            {article.source}
                          </span>
                        )}
                        {article.publishedAt ? (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                            <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></span>
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full font-medium">
                            <span className="w-1.5 h-1.5 bg-amber-500 dark:bg-amber-400 rounded-full"></span>
                            Draft
                          </span>
                        )}
                        {/* Publish date picker — visible when published */}
                        {article.publishedAt && (
                          <label className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 cursor-pointer" title="Change publish date">
                            <Calendar className="h-3.5 w-3.5" />
                            <input
                              type="date"
                              defaultValue={article.publishedAt.substring(0, 10)}
                              onChange={(e) => handleChangePublishDate(article.id, e.target.value, article.slug)}
                              className="bg-transparent text-xs text-slate-600 dark:text-slate-400 border-0 outline-none cursor-pointer w-28"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublish(article.id, article.publishedAt, article.slug)}
                    className={`p-2 rounded-lg transition-all ${
                      article.publishedAt
                        ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                        : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    }`}
                    title={article.publishedAt ? 'Unpublish' : 'Publish'}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <Link
                    to={`/dashboard/admin/news/edit/${article.id}`}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete News Article"
        description="This will permanently delete the news article. This action cannot be undone."
        itemName={deleteModal.articleTitle}
        isLoading={deleteModal.isLoading}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, articleId: 0, articleTitle: '', isLoading: false })}
      />
    </div>
  );
}

/* ─── Google Analytics + Search Console section (clinic picker + graphs) ─── */
function GoogleAnalyticsSection({ clinics, isDark }: { clinics: any[]; isDark: boolean }) {
  const [selectedClinicId, setSelectedClinicId] = useState('');

  return (
    <div className="space-y-4">
      <div className={`pt-6 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
        <h2 className="text-2xl font-black mb-2">📊 Google Analytics, Search Console & Business Profile</h2>
        <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Select a clinic to view GA4, Search Console, and Google Business Profile data. Configure analytics sources in the clinic&apos;s Edit modal.
        </p>
        <select
          value={selectedClinicId}
          onChange={(e) => setSelectedClinicId(e.target.value)}
          className={`w-64 rounded-xl border p-2 ${isDark ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-white'}`}
        >
          <option value="">Select a clinic...</option>
          {clinics.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      {selectedClinicId && (
        <GoogleAnalyticsView clinicId={selectedClinicId} isDark={isDark} />
      )}
    </div>
  );
}
