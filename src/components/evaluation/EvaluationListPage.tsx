/**
 * @file EvaluationListPage.tsx
 * @description Halaman Daftar Pengajuan Use Case untuk Reviewer / Kurator sesuai Mockup Halaman 8.
 */

import React, { useState } from 'react';
import { Search, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import type { UseCaseItem, FilterState } from '../../types/index.ts';
import { StatusBadge } from '../common/Badge.tsx';

interface EvaluationListPageProps {
  useCases: UseCaseItem[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSelectUseCaseForEvaluation: (item: UseCaseItem) => void;
}

export const EvaluationListPage: React.FC<EvaluationListPageProps> = ({
  useCases,
  filters,
  onFilterChange,
  onSelectUseCaseForEvaluation,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(useCases.length / itemsPerPage) || 1;
  const displayedItems = useCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Evaluasi Use Case
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Halaman penelaahan, kurasi matriks pokja, dan persetujuan implementasi inovasi AI.
        </p>
      </div>

      {/* Filter Row: Cari Use Case & Tanggal Pengajuan */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari Use Case"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative w-full sm:w-56">
          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tanggal Pengajuan"
            value={filters.tanggalPengajuan || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, tanggalPengajuan: e.target.value })
            }
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Use Cases Evaluation Table (Mockup Page 8) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Judul Use Case</th>
                <th className="px-4 py-3.5">Kategori</th>
                <th className="px-4 py-3.5">Instansi</th>
                <th className="px-4 py-3.5">Tanggal Pengajuan</th>
                <th className="px-4 py-3.5">Progress Evaluasi</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {displayedItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectUseCaseForEvaluation(item)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900 group-hover:text-blue-600 block line-clamp-1">
                      {item.judul}
                    </span>
                    <span className="text-[11px] text-slate-400 block line-clamp-1">
                      {item.deskripsiSingkat}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-600 font-medium">
                    {item.teknologi[0] || 'AI Solution'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    {item.fase1.instansi}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    {item.tanggalPengajuan}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-slate-700">
                    {item.progressEvaluasi}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      type="button"
                      aria-label="Lihat dan Evaluasi"
                      className="p-1.5 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination `< (1) 2 3 4 >` */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {displayedItems.length} dari {useCases.length} use case</span>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded text-xs font-semibold ${
                    currentPage === p
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
