import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAuthStore } from '../auth/useAdminAuthStore';
import {
  Banner,
  fetchAdminBanners,
  createBanner,
  updateBanner,
  reorderBanners,
  deleteBanner,
  CreateBannerPayload,
} from '@/data/songsApi';

export const AdminBannersPage: React.FC = () => {
  const { token } = useAdminAuthStore();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [badgeText, setBadgeText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaLink, setCtaLink] = useState('');
  const [targetPage, setTargetPage] = useState('HOME');
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadBanners = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminBanners(token);
      setBanners(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load banners');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  const resetForm = () => {
    setEditingBanner(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setBadgeText('');
    setImageUrl('');
    setCtaText('');
    setCtaLink('');
    setTargetPage('HOME');
    setIsActive(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (b: Banner) => {
    setEditingBanner(b);
    setTitle(b.title);
    setSubtitle(b.subtitle || '');
    setDescription(b.description);
    setBadgeText(b.badgeText || '');
    setImageUrl(b.imageUrl || '');
    setCtaText(b.ctaText || '');
    setCtaLink(b.ctaLink || '');
    setTargetPage(b.targetPage || 'HOME');
    setIsActive(b.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);
    try {
      const payload: CreateBannerPayload = {
        title,
        subtitle: subtitle || undefined,
        description,
        badgeText: badgeText || undefined,
        imageUrl: imageUrl || undefined,
        ctaText: ctaText || undefined,
        ctaLink: ctaLink || undefined,
        targetPage,
        isActive,
      };

      if (editingBanner) {
        await updateBanner(token, editingBanner.id, payload);
      } else {
        await createBanner(token, payload);
      }
      setIsModalOpen(false);
      resetForm();
      await loadBanners();
    } catch (err: any) {
      alert(err.message || 'Failed to save banner');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    if (!token) return;
    try {
      await updateBanner(token, banner.id, { isActive: !banner.isActive });
      setBanners((prev) =>
        prev.map((b) => (b.id === banner.id ? { ...b, isActive: !b.isActive } : b))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update banner status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      await deleteBanner(token, id);
      await loadBanners();
    } catch (err: any) {
      alert(err.message || 'Failed to delete banner');
    }
  };

  const handleMove = async (index: number, direction: 'UP' | 'DOWN') => {
    if (!token) return;
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    const newBanners = [...banners];
    const [moved] = newBanners.splice(index, 1);
    newBanners.splice(targetIndex, 0, moved);

    setBanners(newBanners);

    const bannerIds = newBanners.map((b) => b.id);
    try {
      await reorderBanners(token, bannerIds);
    } catch (err: any) {
      alert('Failed to persist reordering to database');
      await loadBanners();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-mono pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest bg-[#ba0034]/10 text-[#ba0034]">
            [User End Content Management]
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Banner & Hero Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Configure, edit, and reorder promotional hero banners displayed on user-facing listener screens.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ba0034] text-white text-xs font-bold hover:bg-[#9a0028] transition-colors shadow-md cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Create New Banner</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold">
          ✗ {error}
        </div>
      )}

      {/* Banner List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Active & Sequences ({banners.length} Configured)
          </h2>
          <span className="text-[11px] text-zinc-500">Use Move Up / Move Down buttons to reorder position</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-zinc-400 space-y-2">
            <span className="material-symbols-outlined text-3xl animate-spin text-[#ba0034]">progress_activity</span>
            <p>Loading configured banners…</p>
          </div>
        ) : banners.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-400 glass-panel rounded-3xl border border-white/20">
            No banners configured yet. Click "Create New Banner" above.
          </div>
        ) : (
          <div className="space-y-3">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  banner.isActive
                    ? 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/50 opacity-60'
                }`}
              >
                {/* Reorder Buttons & Index */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-zinc-700">
                    #{index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <button
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'UP')}
                      className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Up"
                    >
                      <span className="material-symbols-outlined text-base">keyboard_arrow_up</span>
                    </button>
                    <button
                      disabled={index === banners.length - 1}
                      onClick={() => handleMove(index, 'DOWN')}
                      className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Down"
                    >
                      <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
                    </button>
                  </div>
                </div>

                {/* Banner Thumbnail & Text Content */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {banner.imageUrl && (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-20 h-14 sm:w-28 sm:h-16 rounded-xl object-cover border border-slate-200 dark:border-zinc-800 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {banner.badgeText && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#ba0034]/15 text-[#ba0034]">
                          {banner.badgeText}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                        [{banner.targetPage}]
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                      {banner.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {banner.description}
                    </p>
                    {banner.ctaText && (
                      <p className="text-[11px] font-bold text-[#ba0034] pt-0.5">
                        CTA: {banner.ctaText} → ({banner.ctaLink || '#'})
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => handleToggleActive(banner)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      banner.isActive
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30 hover:bg-zinc-500/20'
                    }`}
                  >
                    {banner.isActive ? 'Active' : 'Disabled'}
                  </button>

                  <button
                    onClick={() => openEditModal(banner)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    title="Edit Banner"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                    title="Delete Banner"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {editingBanner ? 'Edit Banner Configuration' : 'Create New User Banner'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Banner Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Hi-Res Audio Headroom Calibrator"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Subtitle (Optional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. 24-bit 192kHz Spatial Dolby Atmos"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed copy text displayed on user banner..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="e.g. Dolby Spatial"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Target Page
                  </label>
                  <select
                    value={targetPage}
                    onChange={(e) => setTargetPage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                  >
                    <option value="HOME">HOME</option>
                    <option value="EXPLORE">EXPLORE</option>
                    <option value="PODCASTS">PODCASTS</option>
                    <option value="CONCERTS">CONCERTS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g. Calibrate Staging"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    CTA Button Target Link
                  </label>
                  <input
                    type="text"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    placeholder="e.g. /listener/spatial-calibrator"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ba0034]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="accent-[#ba0034] w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Banner is active and visible to listeners
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#ba0034] text-white text-xs font-bold hover:bg-[#9a0028] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Saving Banner…' : editingBanner ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
