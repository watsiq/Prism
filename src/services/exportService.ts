/**
 * @file exportService.ts
 * @description Layanan ekspor data ringkasan eksekutif dan statistik use case AI (CSV & JSON).
 */

import type { UseCaseItem } from '../types/index.ts';

export class ExportService {
  /**
   * Mengekspor daftar use case ke dalam format CSV
   */
  public static exportToCsv(items: UseCaseItem[], filename = 'prisma_ai_katalog_nasional.csv'): void {
    try {
      const headers = ['ID', 'Judul Use Case', 'Tahapan', 'Sektor', 'Instansi', 'Tanggal Pengajuan', 'Status', 'Progress Evaluasi'];
      const rows = items.map((item) => [
        `"${item.id}"`,
        `"${item.judul.replace(/"/g, '""')}"`,
        `"${item.tahapan.toUpperCase()}"`,
        `"${item.sektor}"`,
        `"${item.fase1.instansi.replace(/"/g, '""')}"`,
        `"${item.tanggalPengajuan}"`,
        `"${item.status}"`,
        `"${item.progressEvaluasi}"`,
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Gagal mengekspor CSV:', error);
    }
  }

  /**
   * Mengekspor data dalam format JSON
   */
  public static exportToJson(data: unknown, filename = 'prisma_ai_data_export.json'): void {
    try {
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Gagal mengekspor JSON:', error);
    }
  }
}
