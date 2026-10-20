/**
 * @file MonitoringDashboard.tsx
 * @description Dashboard Monitoring Use Case PRISMA AI yang secara presisi mereplikasi Mockup Halaman 7.
 */

import React from 'react';
import { Download, TrendingUp, BarChart2 } from 'lucide-react';
import type { DashboardMetricData } from '../../types/index.ts';
import { INITIAL_DASHBOARD_METRICS } from '../../constants/initialData.ts';
import { ExportService } from '../../services/exportService.ts';

interface MonitoringDashboardProps {
  metrics?: DashboardMetricData;
}

export const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({
  metrics = INITIAL_DASHBOARD_METRICS,
}) => {
  const handleExportCsv = () => {
    // Ekspor data ringkasan ke format CSV
    const rows = metrics.adopsiPemerintahDanBumn.map((d) => ({
      Bulan: d.month,
      Pemerintah: d.pemerintah,
      BUMN: d.bumn,
    }));
    ExportService.exportToJson(rows, 'statistik_adopsi_prisma_ai.json');
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Title & Export Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Dashboard Monitoring Use Case
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Memonitoring sebaran, tingkat kesiapan, dan perkembangan use case AI nasional.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor Data Statistik</span>
          </button>
        </div>
      </div>

      {/* Grid of 8 Charts Matching Mockup Page 7 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CHART 1: Jumlah Proyek AI di Sektor Prioritas (Donut Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-4">
            Jumlah Proyek AI di Sektor Prioritas
          </h3>

          <div className="flex items-center justify-around my-auto">
            {/* SVG Donut */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="5"
                  strokeDasharray="35 65"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="5"
                  strokeDasharray="25 75"
                  strokeDashoffset="-35"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#EAB308"
                  strokeWidth="5"
                  strokeDasharray="20 80"
                  strokeDashoffset="-60"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="5"
                  strokeDasharray="12 88"
                  strokeDashoffset="-80"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="5"
                  strokeDasharray="8 92"
                  strokeDashoffset="-92"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-800">100%</span>
                <span className="text-[10px] text-slate-400 font-medium">Prioritas</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-1.5 text-[11px] text-slate-600">
              {metrics.proyekPerSektor.map((sec, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: sec.color }}
                  />
                  <span>{sec.sektor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHART 2: Jumlah Sektor Aktif Memperbaharui Use Case (Bar Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-4">
            Jumlah Sektor Aktif Memperbaharui Use Case
          </h3>

          <div className="h-44 flex items-end justify-between px-4 pt-4 border-b border-slate-100">
            {metrics.sektorAktifMemperbaharui.map((sec, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 flex-1">
                <span className="text-[10px] text-slate-400 font-medium">{sec.count}</span>
                <div
                  className="w-7 bg-blue-200 hover:bg-blue-400 rounded-t-sm transition-all"
                  style={{ height: `${(sec.count / 60) * 120}px` }}
                />
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  {sec.sektor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 3: Jumlah Use Case yang Masuk Sandbox Regulasi AI (Bar Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-4">
            Jumlah Use Case yang Masuk Sandbox Regulasi AI
          </h3>

          <div className="h-44 flex items-end justify-around px-4 pt-4 border-b border-slate-100">
            {metrics.sandboxRegulasi.map((sec, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 flex-1">
                <span className="text-[10px] text-slate-400 font-medium">{sec.count}</span>
                <div
                  className="w-6 bg-indigo-500 rounded-t-sm hover:opacity-90 transition-all"
                  style={{ height: `${(sec.count / 16) * 120}px` }}
                />
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  {sec.sektor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 4: Jumlah Solusi AI Lokal yang Diimplementasikan (Trend Line/Area) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-800">
              Jumlah Solusi AI Lokal yang Diimplementasikan
            </h3>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              <span>Tren Positif</span>
            </span>
          </div>

          <div className="h-44 relative flex items-end justify-between px-2 pt-2 border-b border-slate-100">
            {metrics.solusiLokalDiimplementasikan.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1 flex-1">
                <span className="text-[10px] font-bold text-blue-600">{item.count}</span>
                <div
                  className="w-2.5 bg-blue-500 rounded-full"
                  style={{ height: `${(item.count / 55) * 110}px` }}
                />
                <span className="text-[10px] text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 5: Jumlah Inovasi AI yang Diadopsi oleh Instansi Pemerintah dan BUMN */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-800">
              Jumlah Inovasi AI yang Diadopsi oleh Instansi Pemerintah dan BUMN
            </h3>
            <div className="flex items-center space-x-3 text-[10px]">
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm"></span>
                <span className="text-slate-600">Pemerintah</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-sm"></span>
                <span className="text-slate-600">BUMN</span>
              </div>
            </div>
          </div>

          <div className="h-44 flex items-end justify-between px-1 pt-2 border-b border-slate-100 relative">
            {/* Tooltip callout mockup simulation on Mei */}
            <div className="absolute top-2 left-[44%] -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md pointer-events-none">
              Jumlah : 30
            </div>

            {metrics.adopsiPemerintahDanBumn.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1 flex-1">
                <div className="flex items-end space-x-0.5">
                  <div
                    className="w-2.5 bg-amber-400 rounded-t-xs"
                    style={{ height: `${(item.pemerintah / 35) * 110}px` }}
                  />
                  <div
                    className="w-2.5 bg-teal-500 rounded-t-xs"
                    style={{ height: `${(item.bumn / 35) * 110}px` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 6: Jumlah Solusi AI yang Menghasilkan Pendapatan Komersial */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-4">
            Jumlah Solusi AI yang Menghasilkan Pendapatan Komersial
          </h3>

          <div className="h-44 flex items-end justify-around px-4 pt-2 border-b border-slate-100">
            {metrics.pendapatanKomersial.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 flex-1">
                <span className="text-[10px] text-slate-500 font-semibold">{item.count}</span>
                <div
                  className="w-7 bg-rose-400 hover:bg-rose-500 rounded-t-sm transition-all"
                  style={{ height: `${(item.count / 60) * 120}px` }}
                />
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 7: Jumlah Inovasi AI berdasarkan Tahapan Pengembangan (Horizontal Bar) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-4">
            Jumlah Inovasi AI berdasarkan Tahapan Pengembangan
          </h3>

          <div className="space-y-3 my-auto py-2">
            {metrics.adopsiPerTahap.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">{item.stage}</span>
                  <span className="font-bold text-slate-800">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(item.count / 140) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 8: Jumlah Use Case yang Menjadi Rujukan untuk Edukasi, Pelatihan, dan Talenta AI (Donut) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-4">
            Jumlah Use Case yang Menjadi Rujukan untuk Edukasi, Pelatihan, dan Talenta AI
          </h3>

          <div className="flex items-center justify-around my-auto">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="5"
                  strokeDasharray="55 45"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="5"
                  strokeDasharray="30 70"
                  strokeDashoffset="-55"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="5"
                  strokeDasharray="15 85"
                  strokeDashoffset="-85"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <BarChart2 className="w-5 h-5 text-blue-600 mb-0.5" />
                <span className="text-[10px] text-slate-400 font-medium">Talenta</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {metrics.rujukanTalentaAi.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium">
                    {item.category}: <span className="font-bold">{item.count}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
