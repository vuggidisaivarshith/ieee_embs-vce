import React, { useState } from 'react';
import { 
  Calendar, Image as ImageIcon, Users, Megaphone, 
  Award, BookOpen, FileText, Mail, Settings, LogOut, LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import EventsManager from './EventsManager';
import GalleryManager from './GalleryManager';
import TeamManager from './TeamManager';
import AnnouncementsManager from './AnnouncementsManager';
import AchievementsManager from './AchievementsManager';
import ResourcesManager from './ResourcesManager';
import SiteContentManager from './SiteContentManager';
import MessagesManager from './MessagesManager';
import SiteSettingsManager from './SiteSettingsManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'team', label: 'Team & Officers', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'content', label: 'Page Content', icon: FileText },
    { id: 'messages', label: 'Inquiries', icon: Mail },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-slate-800 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
              <LayoutDashboard className="w-4 h-4" /> IEEE EMBS Admin Dashboard
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Management Portal</h1>
            <p className="text-xs text-slate-300">Authenticated as: <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">{user?.email}</span></p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-rose-600 hover:text-white border border-slate-700 transition flex items-center gap-2 w-fit shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Main Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition text-left border ${
                    active 
                      ? 'bg-ieee-blue text-white border-ieee-blue shadow-lg shadow-ieee-blue/30 font-extrabold' 
                      : 'text-slate-200 bg-slate-900/80 border-slate-800 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-sky-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Module Content Area */}
          <div className="lg:col-span-9 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
            {activeTab === 'events' && <EventsManager />}
            {activeTab === 'gallery' && <GalleryManager />}
            {activeTab === 'team' && <TeamManager />}
            {activeTab === 'announcements' && <AnnouncementsManager />}
            {activeTab === 'achievements' && <AchievementsManager />}
            {activeTab === 'resources' && <ResourcesManager />}
            {activeTab === 'content' && <SiteContentManager />}
            {activeTab === 'messages' && <MessagesManager />}
            {activeTab === 'settings' && <SiteSettingsManager />}
          </div>

        </div>

      </div>
    </div>
  );
}
