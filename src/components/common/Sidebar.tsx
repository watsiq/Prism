/**
 * @file Sidebar.tsx
 * @description Komponen bilah navigasi samping PRISMA AI sesuai mockup halaman 2, 7, 8, 9, 11.
 */

import React from 'react';
import {
  LayoutDashboard,
  FilePlus,
  ListTodo,
  FolderKanban,
  Map,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import type { UserProfile, UserRole } from '../../types/index.ts';

export type ActiveNav =
  | 'dashboard_monitoring'
  | 'pengajuan_use_case'
  | 'daftar_pengajuan'
  | 'evaluasi_use_case'
  | 'direktori_use_case'
  | 'peta_interaktif'
  | 'faq_bantuan';

interface SidebarProps {
  activeNav: ActiveNav;
  onNavigate: (nav: ActiveNav) => void;
  currentUser: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onNavigate,
  currentUser,
  onSwitchRole,
  onLogout,
}) => {
  const [dashboardOpen, setDashboardOpen] = React.useState(true);
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const isReviewer = currentUser.role === 'reviewer';
  const isPengusul = currentUser.role === 'pengusul';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen select-none shrink-0">
      {/* Brand & Logo */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Logo Geometric PRISMA AI */}
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-lg leading-tight block">
              PRISMA AI
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              Platform Nasional
            </span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Accordion Dashboards */}
        <div>
          <button
            type="button"
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>Dashboards</span>
            </div>
            {dashboardOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {dashboardOpen && (
            <div className="pl-9 pr-2 py-1 space-y-1">
              <button
                type="button"
                onClick={() => onNavigate('dashboard_monitoring')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center ${
                  activeNav === 'dashboard_monitoring'
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="mr-2 text-base leading-none">•</span>
                Use Case
              </button>
            </div>
          )}
        </div>

        {/* Pengajuan Use Case (Pengusul view) */}
        <button
          type="button"
          onClick={() => onNavigate('pengajuan_use_case')}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeNav === 'pengajuan_use_case'
              ? 'text-blue-600 bg-blue-50 font-semibold'
              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <FilePlus className="w-4 h-4 text-slate-500" />
            <span>Pengajuan Use Case</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Daftar Pengajuan / Evaluasi Use Case (Reviewer view) */}
        <button
          type="button"
          onClick={() =>
            onNavigate(isReviewer ? 'evaluasi_use_case' : 'daftar_pengajuan')
          }
          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeNav === 'daftar_pengajuan' || activeNav === 'evaluasi_use_case'
              ? 'text-blue-600 bg-blue-50 font-semibold'
              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <ListTodo className="w-4 h-4 text-slate-500" />
            <span>
              {isReviewer ? 'Evaluasi Use Case' : 'Daftar Pengajuan'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Direktori Use Case (Public / All users) */}
        <button
          type="button"
          onClick={() => onNavigate('direktori_use_case')}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeNav === 'direktori_use_case'
              ? 'text-blue-600 bg-blue-50 font-semibold'
              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <FolderKanban className="w-4 h-4 text-slate-500" />
            <span>Direktori Use Case</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Peta Interaktif Sebaran Nasional (Modul 4) */}
        <button
          type="button"
          onClick={() => onNavigate('peta_interaktif')}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeNav === 'peta_interaktif'
              ? 'text-blue-600 bg-blue-50 font-semibold'
              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Map className="w-4 h-4 text-slate-500" />
            <span>Peta Interaktif</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>



        {/* FAQ & Bantuan */}
        <button
          type="button"
          onClick={() => onNavigate('faq_bantuan')}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeNav === 'faq_bantuan'
              ? 'text-blue-600 bg-blue-50 font-semibold'
              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>FAQ & Bantuan</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </nav>

      {/* Role Switcher & User Profile (Bottom) */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="relative">
          <button
            type="button"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="w-full flex items-center p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 transition-all text-left shadow-xs"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden shadow-xs">
              {currentUser.role === 'pengusul' ? (
                <span className="text-sm">👩‍⚕️</span>
              ) : currentUser.role === 'reviewer' ? (
                <span className="text-sm">👨‍💼</span>
              ) : (
                <span className="text-sm">👤</span>
              )}
            </div>
            <div className="ml-3 overflow-hidden flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {currentUser.name}
              </p>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-[11px] font-medium text-blue-600 capitalize">
                  {currentUser.role === 'pengusul'
                    ? 'Pengusul'
                    : currentUser.role === 'reviewer'
                    ? 'Reviewer / Kurator'
                    : 'Visitor Publik'}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {/* Role Dropdown Menu */}
          {roleMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-50 text-xs">
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Ganti Peran (Role Switcher)
              </div>
              <button
                type="button"
                onClick={() => {
                  onSwitchRole('pengusul');
                  setRoleMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded flex items-center space-x-2 ${
                  isPengusul
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Pengusul (Kemenkes / Instansi)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchRole('reviewer');
                  setRoleMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded flex items-center space-x-2 ${
                  isReviewer
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Reviewer / Kurator Sektoral</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchRole('public');
                  setRoleMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded flex items-center space-x-2 ${
                  currentUser.role === 'public'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Visitor Publik</span>
              </button>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                type="button"
                onClick={() => {
                  setRoleMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-2 py-1.5 text-red-600 hover:bg-red-50 rounded flex items-center space-x-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar (Halaman Login)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
