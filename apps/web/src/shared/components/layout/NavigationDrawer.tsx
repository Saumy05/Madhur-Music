import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PageLink {
  title: string;
  path: string;
  category: string;
  icon: string;
}

export const ALL_PAGE_LINKS: PageLink[] = [
  // Music & Discovery
  { title: 'Home Spotlight', path: '/listener', category: 'Music & Discovery', icon: 'home' },
  { title: 'Explore Hub', path: '/listener/explore', category: 'Music & Discovery', icon: 'explore' },
  { title: 'Advanced Explore', path: '/listener/explore/advanced', category: 'Music & Discovery', icon: 'travel_explore' },
  { title: 'Charts', path: '/listener/charts', category: 'Music & Discovery', icon: 'bar_chart' },
  { title: 'Search (Text & Voice)', path: '/listener/search', category: 'Music & Discovery', icon: 'search' },
  { title: 'Voice Search Direct', path: '/listener/voice-search', category: 'Music & Discovery', icon: 'mic' },
  { title: 'Smart DJ Mode', path: '/listener/dj-mode', category: 'Music & Discovery', icon: 'album' },
  { title: 'Focus Mode (432Hz)', path: '/listener/focus-mode', category: 'Music & Discovery', icon: 'center_focus_strong' },
  { title: 'Audio Lab (10-Band EQ)', path: '/listener/audio-lab', category: 'Music & Discovery', icon: 'graphic_eq' },
  { title: 'Equalizer Presets', path: '/listener/equalizer-presets', category: 'Music & Discovery', icon: 'tune' },
  { title: 'Spatial Headroom Calibrator', path: '/listener/spatial-calibrator', category: 'Music & Discovery', icon: '3d_rotation' },
  { title: 'Acoustic Song Identifier', path: '/listener/song-identifier', category: 'Music & Discovery', icon: 'graphic_eq' },
  { title: 'Real-time 3D Visualizer', path: '/listener/audio-visualizer', category: 'Music & Discovery', icon: 'equalizer' },
  { title: 'Submit a Song', path: '/listener/submit-song', category: 'Music & Discovery', icon: 'upload' },
  { title: 'Radio Stations', path: '/listener/radio', category: 'Music & Discovery', icon: 'radio' },
  { title: 'Artist Radio', path: '/listener/radio/artist', category: 'Music & Discovery', icon: 'spatial_audio' },
  { title: 'Mood Radio', path: '/listener/radio/mood', category: 'Music & Discovery', icon: 'sentiment_satisfied' },

  // Podcasts
  { title: 'Podcasts Hub', path: '/listener/podcasts', category: 'Podcasts Suite', icon: 'podcasts' },
  { title: 'Podcast Player', path: '/listener/podcasts/player/ep-1', category: 'Podcasts Suite', icon: 'play_circle' },
  { title: 'Podcast Creator Studio', path: '/podcasts/studio', category: 'Podcasts Suite', icon: 'mic_external_on' },
  { title: 'Subscribed Podcasts', path: '/listener/podcast-subscriptions', category: 'Podcasts Suite', icon: 'subscriptions' },

  // Social & Fan Perks
  { title: 'Social Feed & Hub', path: '/listener/social', category: 'Social & Community', icon: 'diversity_3' },
  { title: 'Activity Feed Stream', path: '/listener/social/feed', category: 'Social & Community', icon: 'feed' },
  { title: 'Live Jam Room', path: '/listener/social/jam', category: 'Social & Community', icon: 'groups' },
  { title: 'Group Listening Handoff', path: '/listener/social/group-session', category: 'Social & Community', icon: 'speaker_group' },
  { title: 'Party Sync Broadcast', path: '/listener/party-sync', category: 'Social & Community', icon: 'sensors' },
  { title: 'Friend Profile View', path: '/listener/social/friend/1', category: 'Social & Community', icon: 'person' },
  { title: 'Fan Club & Tier', path: '/listener/fan-club', category: 'Social & Community', icon: 'workspace_premium' },
  { title: 'Fan Leaderboard', path: '/listener/fan-club/leaderboard', category: 'Social & Community', icon: 'leaderboard' },
  { title: 'Daily Music Trivia Quiz', path: '/listener/fan-club/trivia', category: 'Social & Community', icon: 'quiz' },
  { title: 'VIP Backstage Pass', path: '/listener/backstage', category: 'Social & Community', icon: 'key' },
  { title: 'VIP Rewards Store', path: '/listener/vip-rewards', category: 'Social & Community', icon: 'redeem' },

  // Concerts & Events
  { title: 'Concerts & Tour Hub', path: '/listener/concerts', category: 'Concerts & Live', icon: 'confirmation_number' },
  { title: 'Interactive Concert Map', path: '/listener/concerts/map', category: 'Concerts & Live', icon: 'map' },
  { title: 'Live Stream Event', path: '/listener/concerts/live/conc-1', category: 'Concerts & Live', icon: 'live_tv' },
  { title: 'Music Gigs Near You', path: '/listener/music-near-you', category: 'Concerts & Live', icon: 'near_me' },

  // Artist & Creator Suite
  { title: 'Public Artist Profile', path: '/artist/art-1', category: 'Artist Suite', icon: 'person_stars' },
  { title: 'Artist Merch & Vinyl', path: '/artist/merch', category: 'Artist Suite', icon: 'shopping_bag' },
  { title: 'Artist Royalty Dashboard', path: '/artist/dashboard', category: 'Artist Suite', icon: 'dashboard' },
  { title: 'Artist Financials & Splits', path: '/artist/finances', category: 'Artist Suite', icon: 'account_balance' },
  { title: 'Artist Marketing Campaigns', path: '/artist/marketing', category: 'Artist Suite', icon: 'campaign' },
  { title: 'Artist Press Newsroom', path: '/artist/newsroom', category: 'Artist Suite', icon: 'newspaper' },
  { title: 'Creator Master Studio', path: '/creator-studio', category: 'Artist Suite', icon: 'audio_file' },
  { title: 'Raw Multitrack Stems', path: '/audio-stems-studio', category: 'Artist Suite', icon: 'instant_mix' },

  // Library & Collections
  { title: 'User Library', path: '/listener/library', category: 'Library & Storage', icon: 'library_music' },
  { title: 'Playlist Detail View', path: '/listener/playlist/1', category: 'Library & Storage', icon: 'queue_music' },
  { title: 'Smart AI Playlist', path: '/listener/playlist/smart/1', category: 'Library & Storage', icon: 'auto_awesome' },
  { title: 'Advanced Playlist Editor', path: '/listener/playlist/advanced-editor/1', category: 'Library & Storage', icon: 'brush' },
  { title: 'Album Detail View', path: '/listener/album/alb-1', category: 'Library & Storage', icon: 'album' },
  { title: 'HD Music Video', path: '/listener/music-video/1', category: 'Library & Storage', icon: 'movie' },
  { title: 'Lyrics View', path: '/listener/lyrics', category: 'Library & Storage', icon: 'subtitles' },
  { title: 'AI Lyric Translator', path: '/listener/lyrics/translator', category: 'Library & Storage', icon: 'translate' },
  { title: 'Synchronized Lyrics Editor', path: '/listener/lyrics-editor', category: 'Library & Storage', icon: 'edit_note' },
  { title: 'Offline Downloads Vault', path: '/listener/downloads', category: 'Library & Storage', icon: 'download_for_offline' },
  { title: 'AES-256 Encrypted Vault', path: '/listener/offline-vault', category: 'Library & Storage', icon: 'lock' },

  // User Account & Settings
  { title: 'User Account Profile', path: '/listener/user-profile', category: 'Account & Settings', icon: 'account_circle' },
  { title: 'Auth (Sign In / Register)', path: '/listener/auth', category: 'Account & Settings', icon: 'login' },
  { title: 'Genre Preference Onboarding', path: '/listener/onboarding', category: 'Account & Settings', icon: 'tune' },
  { title: 'Welcome Screen', path: '/listener/welcome', category: 'Account & Settings', icon: 'waving_hand' },
  { title: 'Settings & Quality', path: '/listener/settings', category: 'Account & Settings', icon: 'settings' },
  { title: 'Notifications Center', path: '/listener/notifications', category: 'Account & Settings', icon: 'notifications' },
  { title: 'Connected Devices (Connect)', path: '/listener/devices', category: 'Account & Settings', icon: 'devices' },
  { title: 'Family Sharing Management', path: '/listener/family-sharing', category: 'Account & Settings', icon: 'family_history' },
  { title: 'Theme & Dark Mode Settings', path: '/listener/dark-mode-settings', category: 'Account & Settings', icon: 'dark_mode' },
  { title: 'Audio Stream Memory Cache', path: '/listener/audio-cache', category: 'Account & Settings', icon: 'memory' },
  { title: 'Smart Sleep Timer', path: '/listener/sleep-timer', category: 'Account & Settings', icon: 'bedtime' },
  { title: 'Smart Morning Alarm', path: '/listener/smart-alarm', category: 'Account & Settings', icon: 'alarm' },
  { title: 'Year in Music 2026', path: '/listener/your-year', category: 'Account & Settings', icon: 'auto_graph' },
  { title: 'Personal Listening Insights', path: '/listener/listening-insights', category: 'Account & Settings', icon: 'insights' },
  { title: 'Subscription Plans', path: '/listener/pricing', category: 'Account & Settings', icon: 'payments' },
  { title: 'Premium VIP Showcase', path: '/listener/premium', category: 'Account & Settings', icon: 'workspace_premium' },
  { title: 'Secure Checkout', path: '/listener/checkout', category: 'Account & Settings', icon: 'shopping_cart_checkout' },
  { title: 'Help & Support Center', path: '/listener/help', category: 'Account & Settings', icon: 'help' },

  // Music Label Suite
  { title: 'Label Dashboard', path: '/label/dashboard', category: 'Music Label Suite', icon: 'dashboard' },
  { title: 'Label Roster & Artists', path: '/label/artists', category: 'Music Label Suite', icon: 'recent_actors' },
  { title: 'Label Albums & Releases', path: '/label/albums', category: 'Music Label Suite', icon: 'library_music' },
  { title: 'Master Sound Catalog', path: '/label/catalog', category: 'Music Label Suite', icon: 'inventory_2' },
  { title: 'Artist Contracts & Legal', path: '/label/contracts', category: 'Music Label Suite', icon: 'description' },
  { title: 'IP & Copyright Protection', path: '/label/copyright', category: 'Music Label Suite', icon: 'gavel' },
  { title: 'Royalty Distribution & Payouts', path: '/label/royalties', category: 'Music Label Suite', icon: 'request_quote' },
  { title: 'Label Revenue Streams', path: '/label/revenue', category: 'Music Label Suite', icon: 'account_balance' },
  { title: 'Label Performance Analytics', path: '/label/analytics', category: 'Music Label Suite', icon: 'stacked_line_chart' },
  { title: 'Release Approvals Queue', path: '/label/approvals', category: 'Music Label Suite', icon: 'fact_check' },

  // Podcast Host Suite
  { title: 'Podcast Host Dashboard', path: '/podcast/dashboard', category: 'Podcast Host Suite', icon: 'dashboard' },
  { title: 'Show Episodes Manager', path: '/podcast/episodes', category: 'Podcast Host Suite', icon: 'graphic_eq' },
  { title: 'Upload & Publish Episode', path: '/podcast/upload-episode', category: 'Podcast Host Suite', icon: 'mic_external_on' },
  { title: 'Podcast Series Catalog', path: '/podcast/series', category: 'Podcast Host Suite', icon: 'video_library' },
  { title: 'Audience Demographics', path: '/podcast/audience', category: 'Podcast Host Suite', icon: 'groups_3' },
  { title: 'Monetization & Ads', path: '/podcast/revenue', category: 'Podcast Host Suite', icon: 'monetization_on' },
  { title: 'Brand Sponsors Hub', path: '/podcast/sponsors', category: 'Podcast Host Suite', icon: 'handshake' },
  { title: 'Podcast Listener Analytics', path: '/podcast/analytics', category: 'Podcast Host Suite', icon: 'insights' },

  // Event Promoter Suite
  { title: 'Promoter Dashboard', path: '/promoter/dashboard', category: 'Event Promoter Suite', icon: 'dashboard' },
  { title: 'Live Events & Concerts', path: '/promoter/events', category: 'Event Promoter Suite', icon: 'event_seat' },
  { title: 'Venues Directory', path: '/promoter/venues', category: 'Event Promoter Suite', icon: 'location_city' },
  { title: 'Booked Headliners & Artists', path: '/promoter/artists', category: 'Event Promoter Suite', icon: 'stars' },
  { title: 'Ticket Sales & Tiers', path: '/promoter/tickets', category: 'Event Promoter Suite', icon: 'confirmation_number' },
  { title: 'Ad Campaigns & Promo', path: '/promoter/campaigns', category: 'Event Promoter Suite', icon: 'campaign' },
  { title: 'Box Office Sales', path: '/promoter/sales', category: 'Event Promoter Suite', icon: 'trending_up' },

  // Moderator Suite
  { title: 'Trust & Safety Dashboard', path: '/moderator/dashboard', category: 'Moderator Suite', icon: 'dashboard' },
  { title: 'Reported Songs Queue', path: '/moderator/reported-songs', category: 'Moderator Suite', icon: 'report_problem' },
  { title: 'Reported Podcasts Queue', path: '/moderator/reported-podcasts', category: 'Moderator Suite', icon: 'podcasts' },
  { title: 'Copyright Dispute Resolution', path: '/moderator/copyright-claims', category: 'Moderator Suite', icon: 'copyright' },
  { title: 'Artist Verification Review', path: '/moderator/artist-verification', category: 'Moderator Suite', icon: 'verified_user' },
  { title: 'User Community Flags', path: '/moderator/user-reports', category: 'Moderator Suite', icon: 'flag' },
  { title: 'Global Approvals Queue', path: '/moderator/approval-queue', category: 'Moderator Suite', icon: 'rule' },

  // Admin Ecosystem Suite
  { title: 'Enterprise Admin Dashboard', path: '/admin/dashboard', category: 'Admin Suite', icon: 'dashboard' },
  { title: 'User Account Directory', path: '/admin/users', category: 'Admin Suite', icon: 'manage_accounts' },
  { title: 'Artist & Creator Roster', path: '/admin/artists', category: 'Admin Suite', icon: 'person_stars' },
  { title: 'Registered Music Labels', path: '/admin/labels', category: 'Admin Suite', icon: 'domain' },
  { title: 'Subscription Plans & Tiers', path: '/admin/subscriptions', category: 'Admin Suite', icon: 'subscriptions' },
  { title: 'Platform Financial Revenue', path: '/admin/revenue', category: 'Admin Suite', icon: 'account_balance_wallet' },
  { title: 'Platform Telemetry & Analytics', path: '/admin/analytics', category: 'Admin Suite', icon: 'query_stats' },
  { title: 'System Roles Matrix', path: '/admin/roles', category: 'Admin Suite', icon: 'admin_panel_settings' },
  { title: 'RBAC Access Permissions', path: '/admin/permissions', category: 'Admin Suite', icon: 'vpn_key' },
  { title: 'Moderation System Control', path: '/admin/moderation', category: 'Admin Suite', icon: 'security' },
  { title: 'Global System Settings', path: '/admin/system-settings', category: 'Admin Suite', icon: 'tune' },
  { title: 'Audit Trail & Compliance Logs', path: '/admin/audit-logs', category: 'Admin Suite', icon: 'history' },

  // Corporate & Developer
  { title: 'Launch Landing Page', path: '/landing', category: 'Corporate & Dev', icon: 'rocket_launch' },
  { title: 'Corporate Finance Portal', path: '/corporate', category: 'Corporate & Dev', icon: 'domain' },
  { title: 'SOC2 Corporate Security', path: '/corporate/security', category: 'Corporate & Dev', icon: 'security' },
  { title: 'Legal & Copyright Center', path: '/legal', category: 'Corporate & Dev', icon: 'gavel' },
  { title: 'API & Developer Portal', path: '/developer', category: 'Corporate & Dev', icon: 'code' },
  { title: 'App Store Feature Preview', path: '/app-store-preview', category: 'Corporate & Dev', icon: 'store' },
  { title: 'Brand Style Guide & Tokens', path: '/style-guide', category: 'Corporate & Dev', icon: 'palette' },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const filteredLinks = ALL_PAGE_LINKS.filter(
    (link) =>
      link.title.toLowerCase().includes(filter.toLowerCase()) ||
      link.category.toLowerCase().includes(filter.toLowerCase())
  );

  const categories = Array.from(
    new Set(filteredLinks.map((l) => l.category))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl flex justify-center p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-white/40 dark:border-white/10 p-6 sm:p-8 my-auto space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6bcbd]/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl premium-gradient flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">grid_view</span>
            </div>
            <div>
              <h2 className="font-extrabold text-xl sm:text-2xl text-[#281718] dark:text-white">
                All Pages & Feature Catalog
              </h2>
              <p className="text-xs text-[#5d3f40]">
                Access any page in 1 click ({ALL_PAGE_LINKS.length} complete screens)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#ffe9e9] dark:bg-white/10 flex items-center justify-center text-[#281718] dark:text-white hover:bg-[#ba0034] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#ba0034]">
            filter_alt
          </span>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search pages by name or category (e.g. Devices, Audio Lab, Vault)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#ba0034]"
          />
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat} className="space-y-3">
              <h3 className="font-bold text-xs text-[#ba0034] uppercase tracking-widest border-b border-[#e6bcbd]/30 pb-1">
                {cat}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {filteredLinks
                  .filter((l) => l.category === cat)
                  .map((link) => (
                    <div
                      key={link.path + link.title}
                      onClick={() => {
                        navigate(link.path);
                        onClose();
                      }}
                      className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer flex items-center gap-3 group"
                    >
                      <span className="material-symbols-outlined text-xl text-[#ba0034] group-hover:text-white">
                        {link.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-xs truncate">
                          {link.title}
                        </p>
                        <p className="text-[10px] text-[#5d3f40] group-hover:text-white/80 truncate">
                          {link.path}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
