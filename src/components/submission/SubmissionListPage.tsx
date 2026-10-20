/**
 * @file SubmissionListPage.tsx
 * @description Halaman Daftar Pengajuan Use Case untuk Pengusul sesuai Mockup Halaman 2.
 */

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import type { UseCaseItem, DevelopmentStage, FilterState } from '../../types/index.ts';
import { SECTOR_OPTIONS, TECHNOLOGY_OPTIONS } from '../../constants/options.ts';
import { StatusBadge } from '../common/Badge.tsx';
import { StageSelectionModal } from './StageSelectionModal.tsx';

interface SubmissionListPageProps {
  useCases: UseCaseItem[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onStartNewSubmission: (stage: DevelopmentStage) => void;
  onSelectUseCase: (item: UseCaseItem) => void;
}

export const SubmissionListPage: React.FC<SubmissionListPageProps> = ({
  useCases,
  filters,
  onFilterChange,
  onStartNewSubmission,
  onSelectUseCase,
}) => {
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);

  const handleStageSelect = (stage: DevelopmentStage) => {
    setIsStageModalOpen(false);
    onStartNewSubmission(stage);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Pengajuan Use Case
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Kelola seluruh inisiatif dan pengajuan inovasi kecerdasan artifisial instansi Anda.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari Use Case"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
          />
        </div>

        {/* Sektor Dropdown */}
        <div className="w-full sm:w-48">
          <select
            value={filters.sektor}
            onChange={(e) => onFilterChange({ ...filters, sektor: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {SECTOR_OPTIONS.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* Teknologi Dropdown */}
        <div className="w-full sm:w-48">
          <select
            value={filters.teknologi}
            onChange={(e) => onFilterChange({ ...filters, teknologi: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {TECHNOLOGY_OPTIONS.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* "+ Tambah Baru" Card (Mockup Page 2 Card 1) */}
        <button
          type="button"
          onClick={() => setIsStageModalOpen(true)}
          className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[340px] text-slate-500 hover:text-blue-600 transition-all group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors mb-3">
            <Plus className="w-8 h-8 text-slate-400 group-hover:text-blue-600" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-slate-700 group-hover:text-blue-600">
            Tambah Baru
          </span>
          <span className="text-[11px] text-slate-400 mt-1 text-center">
            Mulai registrasi inisiatif AI baru berdasarkan 4 Fase
          </span>
        </button>

        {/* Use Cases Cards */}
        {useCases.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectUseCase(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Graphic Banner Area */}
              <div className="h-36 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100 p-4 flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 font-bold border border-blue-100 text-xl">
                  AI
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/90 text-slate-600 border border-slate-200">
                    {item.sektor}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {item.deskripsiSingkat}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Tanggal Pengajuan</span>
                <span className="text-xs font-semibold text-slate-700">
                  {item.tanggalPengajuan}
                </span>
              </div>
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Stage Selection Modal */}
      <StageSelectionModal
        isOpen={isStageModalOpen}
        onClose={() => setIsStageModalOpen(false)}
        onSelectStage={handleStageSelect}
      />
    </div>
  );
};
