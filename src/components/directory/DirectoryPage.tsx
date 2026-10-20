/**
 * @file DirectoryPage.tsx
 * @description Direktori Use Case Terbuka untuk publik dan kementerian/lembaga sesuai Mockup Halaman 11.
 */

import React, { useState } from 'react';
import { Search, X, CheckCircle, ExternalLink, Building, Cpu, Tag } from 'lucide-react';
import type { UseCaseItem, FilterState } from '../../types/index.ts';
import { SECTOR_OPTIONS, TECHNOLOGY_OPTIONS } from '../../constants/options.ts';
import { StageBadge, CategoryBadge } from '../common/Badge.tsx';

interface DirectoryPageProps {
  useCases: UseCaseItem[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  useCases,
  filters,
  onFilterChange,
}) => {
  // Hanya tampilkan use case yang sudah disetujui / kurasi lolos untuk direktori publik
  const curatedUseCases = useCases.filter(
    (item) => item.status === 'disetujui' || item.status === 'diperiksa'
  );

  const [activeModalItem, setActiveModalItem] = useState<UseCaseItem | null>(null);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Direktori Use Case
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Katalog terbuka inovasi AI nasional yang telah lolos verifikasi dan kurasi pokja.
        </p>
      </div>

      {/* Filter Row: Cari Use Case, Sektor, Teknologi (Mockup Page 11) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        {/* Search Bar */}
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
        <div className="w-full sm:w-52">
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
        <div className="w-full sm:w-52">
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

      {/* 6 Cards Grid (Mockup Page 11) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {curatedUseCases.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Graphic Banner */}
              <div className="h-40 bg-gradient-to-tr from-slate-800 via-blue-900 to-indigo-900 p-4 flex flex-col justify-between text-white relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded backdrop-blur-xs">
                    {item.sektor}
                  </span>
                  <CategoryBadge category={item.evaluasi?.rekomendasiKategori || 'quick_win'} />
                </div>
                <div>
                  <span className="text-xl font-extrabold tracking-tight text-white block">
                    AI
                  </span>
                  <span className="text-[10px] text-blue-200 font-medium">
                    Tahap: {item.tahapan.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors">
                  {item.judul}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {item.deskripsiSingkat}
                </p>

                <div className="pt-2 text-xs text-slate-600 font-medium flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.fase1.instansi}</span>
                </div>
              </div>
            </div>

            {/* Footer with Pill Tags */}
            <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex flex-wrap gap-1.5 items-center">
              {item.teknologi.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal for Public Showcase */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {activeModalItem.sektor}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {activeModalItem.judul}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Diajukan oleh: <span className="font-semibold">{activeModalItem.fase1.instansi}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Tutup"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Deskripsi & Urgensi Solusi</h4>
                <p className="p-3 bg-slate-50 rounded-lg leading-relaxed">
                  {activeModalItem.deskripsiSingkat}
                </p>
              </div>

              {/* STDA Decomposition */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  Arsitektur Keputusan STDA (Sense - Think - Decide - Act)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <span className="font-bold text-blue-800 block mb-0.5">SENSE:</span>
                    <span>{activeModalItem.fase1.analisisStda.sense || 'Pengumpulan sinyal sensor/data.'}</span>
                  </div>
                  <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                    <span className="font-bold text-indigo-800 block mb-0.5">THINK:</span>
                    <span>{activeModalItem.fase1.analisisStda.think || 'Pemrosesan algoritma AI.'}</span>
                  </div>
                  <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                    <span className="font-bold text-amber-800 block mb-0.5">DECIDE:</span>
                    <span>{activeModalItem.fase1.analisisStda.decide || 'Penetapan rekomendasi.'}</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                    <span className="font-bold text-emerald-800 block mb-0.5">ACT:</span>
                    <span>{activeModalItem.fase1.analisisStda.act || 'Eksekusi respon operasional.'}</span>
                  </div>
                </div>
              </div>

              {/* Kurasi & Kesiapan */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Tahap Pengembangan:</span>
                  <StageBadge stage={activeModalItem.tahapan} />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Kategori Output:</span>
                  <CategoryBadge category={activeModalItem.evaluasi?.rekomendasiKategori || 'quick_win'} />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Status:</span>
                  <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold text-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Terverifikasi Kurator</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
