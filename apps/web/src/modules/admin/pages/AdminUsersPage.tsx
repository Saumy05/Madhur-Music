import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  AdminUser,
  CreateUserPayload,
} from '@/data/songsApi';
import { useAdminAuthStore } from '../auth/useAdminAuthStore';

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'USER' | 'ARTIST' | 'ADMIN';

interface UserFormState {
  username: string;
  displayName: string;
  email: string;
  password: string;
  role: Role;
  avatarUrl: string;
}

const EMPTY_FORM: UserFormState = {
  username: '',
  displayName: '',
  email: '',
  password: '',
  role: 'USER',
  avatarUrl: '',
};

const ROLE_COLORS: Record<Role, string> = {
  ADMIN:  'bg-red-500/10 text-red-500',
  ARTIST: 'bg-purple-500/10 text-purple-500',
  USER:   'bg-sky-500/10 text-sky-500',
};

// ─── Modal ────────────────────────────────────────────────────────────────────

interface UserModalProps {
  mode: 'create' | 'edit';
  initial?: Partial<UserFormState>;
  onSubmit: (data: UserFormState) => Promise<void>;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ mode, initial, onSubmit, onClose }) => {
  const [form, setForm] = useState<UserFormState>({ ...EMPTY_FORM, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof UserFormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(form);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-full max-w-lg border border-[#e6bcbd]/40 dark:border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6bcbd]/30 dark:border-white/10">
          <div>
            <h2 className="text-base font-extrabold text-[#281718] dark:text-white">
              {mode === 'create' ? 'Provision New User' : 'Edit User Account'}
            </h2>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400 mt-0.5">
              {mode === 'create'
                ? 'Configure username, password and role freely.'
                : 'Update any field. Leave password blank to keep current.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-[#ffe9e9] dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#ba0034] text-xl">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold">
              ✗ {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">
                Username *
              </label>
              <input
                required={mode === 'create'}
                value={form.username}
                onChange={(e) => set('username', e.target.value)}
                placeholder="johndoe"
                className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">
                Display Name *
              </label>
              <input
                required={mode === 'create'}
                value={form.displayName}
                onChange={(e) => set('displayName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">
              Email *
            </label>
            <input
              type="email"
              required={mode === 'create'}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">
              Password {mode === 'edit' && <span className="text-zinc-400 normal-case">(leave blank to keep)</span>}
              {mode === 'create' && ' *'}
            </label>
            <input
              type="password"
              required={mode === 'create'}
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              placeholder={mode === 'edit' ? '••••••••' : 'Min 6 characters'}
              autoComplete="new-password"
              className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">
                Platform Role
              </label>
              <select
                value={form.role}
                onChange={(e) => set('role', e.target.value as Role)}
                className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] cursor-pointer"
              >
                <option value="USER">Listener (USER)</option>
                <option value="ARTIST">Artist (ARTIST)</option>
                <option value="ADMIN">Administrator (ADMIN)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">
                Avatar URL
              </label>
              <input
                value={form.avatarUrl}
                onChange={(e) => set('avatarUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-[#5d3f40] dark:text-zinc-400 border border-[#e6bcbd]/50 dark:border-zinc-700 hover:bg-[#ffe9e9]/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-white bg-[#ba0034] hover:bg-[#9a0028] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving
                ? (mode === 'create' ? 'Creating…' : 'Saving…')
                : (mode === 'create' ? 'Create User' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

export const AdminUsersPage: React.FC = () => {
  const { token } = useAdminAuthStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(!!token); // only show loading when we have a token
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [modal, setModal] = useState<
    { mode: 'create' } | { mode: 'edit'; user: AdminUser } | null
  >(null);

  const [deleteConfirm, setDeleteConfirm] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Redirect to login when no JWT is present
  if (!token) return <Navigate to="/admin/login" replace />;

  // ── Load ─────────────────────────────────────────────────────────────────────

  const { clearSession } = useAdminAuthStore();

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers(token);
      setUsers(data);
    } catch (e: any) {
      if (e.message?.toLowerCase().includes('unauthorized') || e.message?.includes('401')) {
        clearSession();
        return;
      }
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [token, clearSession]);

  useEffect(() => { load(); }, [load]);

  // ── CRUD handlers ─────────────────────────────────────────────────────────────

  const handleCreate = async (form: UserFormState) => {
    if (!token) return;
    const payload: CreateUserPayload = {
      username: form.username,
      displayName: form.displayName,
      email: form.email,
      password: form.password,
      role: form.role,
      avatarUrl: form.avatarUrl || undefined,
    };
    await createUser(token, payload);
    setModal(null);
    await load();
  };

  const handleEdit = async (form: UserFormState) => {
    if (!token || modal?.mode !== 'edit') return;
    const payload: Partial<CreateUserPayload> = {};
    if (form.username) payload.username = form.username;
    if (form.displayName) payload.displayName = form.displayName;
    if (form.email) payload.email = form.email;
    if (form.password) payload.password = form.password;
    if (form.role) payload.role = form.role;
    if (form.avatarUrl !== undefined) payload.avatarUrl = form.avatarUrl;
    await updateUser(token, modal.user.id, payload);
    setModal(null);
    await load();
  };

  const handleDelete = async () => {
    if (!token || !deleteConfirm) return;
    setDeleting(true);
    try {
      await deleteUser(token, deleteConfirm.id);
      setDeleteConfirm(null);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeleting(false);
    }
  };

  // ── Filter ────────────────────────────────────────────────────────────────────

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.username.toLowerCase().includes(q) ||
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
              User Account Management
            </h1>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
              Provision, configure, and delete user accounts. All credentials are fully customisable.
            </p>
          </div>

          <PillButton variant="primary" glow onClick={() => setModal({ mode: 'create' })}>
            <span className="material-symbols-outlined text-lg">person_add</span>
            <span>Provision User</span>
          </PillButton>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold">
            ✗ {error}
          </div>
        )}

        {/* Search */}
        <div className="glass-panel p-4 rounded-2xl border border-white/40 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#ba0034]">search</span>
          <input
            type="text"
            placeholder="Search by username, name, email or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-[#281718] dark:text-white focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="cursor-pointer">
              <span className="material-symbols-outlined text-zinc-400 text-lg">close</span>
            </button>
          )}
        </div>

        {/* Table */}
        <div className="glass-panel p-6 rounded-3xl border border-white/40 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-[#5d3f40] dark:text-zinc-400">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              <span className="text-sm font-semibold">Loading users…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-[#5d3f40] dark:text-zinc-500">
              <span className="material-symbols-outlined text-4xl">group_off</span>
              <p className="text-sm font-semibold">
                {search ? 'No users match your search' : 'No users provisioned yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#e6bcbd]/40 dark:border-white/10 text-[#5d3f40] dark:text-zinc-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Username</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6bcbd]/20 dark:divide-white/5">
                  {filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-[#ffe9e9]/50 dark:hover:bg-white/5 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {u.avatarUrl ? (
                            <img src={u.avatarUrl} alt={u.displayName} className="w-7 h-7 rounded-full object-cover" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#ba0034]/10 flex items-center justify-center text-[#ba0034] text-[11px] font-black">
                              {u.displayName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-bold text-[#281718] dark:text-zinc-100">{u.displayName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#5d3f40] dark:text-zinc-400">@{u.username}</td>
                      <td className="py-3.5 px-4 text-[#281718] dark:text-zinc-300">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${ROLE_COLORS[u.role as Role] ?? 'bg-zinc-100 text-zinc-500'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#5d3f40] dark:text-zinc-500">
                        {new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setModal({ mode: 'edit', user: u })}
                            className="px-2.5 py-1 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(u)}
                            className="px-2.5 py-1 rounded-xl bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-[#5d3f40] dark:text-zinc-500 mt-4 font-semibold">
                {filtered.length} of {users.length} users shown
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {modal?.mode === 'create' && (
        <UserModal
          mode="create"
          onSubmit={handleCreate}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.mode === 'edit' && (
        <UserModal
          mode="edit"
          initial={{
            username: modal.user.username,
            displayName: modal.user.displayName,
            email: modal.user.email,
            password: '',
            role: modal.user.role as Role,
            avatarUrl: modal.user.avatarUrl ?? '',
          }}
          onSubmit={handleEdit}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-full max-w-sm border border-red-200 dark:border-red-900 p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl">person_remove</span>
            </div>
            <h3 className="text-base font-extrabold text-[#281718] dark:text-white">Delete User?</h3>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
              Permanently delete <strong>@{deleteConfirm.username}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-[#5d3f40] dark:text-zinc-400 border border-[#e6bcbd]/50 dark:border-zinc-700 cursor-pointer hover:bg-[#ffe9e9]/50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
