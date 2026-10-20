/**
 * @file rules.ts
 * @description Modul aturan bisnis murni (pure business logic) untuk PRISMA AI.
 * Mengimplementasikan prinsip SOLID, DRY, dan sepenuhnya teruji dengan unit test.
 */

import type {
  Phase1Conceptualization,
  Phase2DataAndModel,
  EvaluationIndicator,
  OutputCategory,
  UseCaseItem,
  FilterState,
} from '../types/index.ts';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Memvalidasi isian data Fase 1: Konseptualisasi & Perencanaan.
 * @param data Objek fase 1 parsial
 * @returns Status validitas dan daftar pesan error jika ada
 */
export function validatePhase1(data: Partial<Phase1Conceptualization>): ValidationResult {
  const errors: string[] = [];

  try {
    if (!data.judul || data.judul.trim().length < 5) {
      errors.push('Judul Use Case minimal 5 karakter.');
    }

    if (!data.deskripsiSingkat || data.deskripsiSingkat.trim().length < 10) {
      errors.push('Deskripsi Singkat minimal 10 karakter.');
    }

    if (!data.namaPengusul || data.namaPengusul.trim().length < 3) {
      errors.push('Nama Pengusul wajib diisi.');
    }

    if (!data.instansi || data.instansi.trim().length < 2) {
      errors.push('Instansi wajib dipilih atau diisi.');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Format email pengusul tidak valid.');
    }

    if (!data.noHp || data.noHp.trim().length < 8) {
      errors.push('Nomor HP pengusul minimal 8 digit.');
    }
  } catch (error) {
    // Tangani kemungkinan error tak terduga
    errors.push(`Error internal validasi Fase 1: ${error instanceof Error ? error.message : String(error)}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Memvalidasi isian data Fase 2: Pengembangan Data & Model.
 * @param data Objek fase 2 parsial
 * @returns Status validitas dan daftar error
 */
export function validatePhase2(data: Partial<Phase2DataAndModel>): ValidationResult {
  const errors: string[] = [];

  try {
    if (!data.spesifikasiTeknis || data.spesifikasiTeknis.trim().length < 10) {
      errors.push('Spesifikasi Teknis data dan model wajib diisi.');
    }

    if (!data.dataRequirements || data.dataRequirements.length === 0) {
      errors.push('Minimal harus terdapat 1 data requirement.');
    }

    if (!data.analyticsModels || data.analyticsModels.length === 0) {
      errors.push('Minimal harus terdapat 1 teknik model analitik AI.');
    }
  } catch (error) {
    errors.push(`Error internal validasi Fase 2: ${error instanceof Error ? error.message : String(error)}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Menghitung string kemajuan evaluasi matriks (misal "3/6" atau "6/6").
 * @param indikator Daftar indikator yang telah dinilai
 * @param totalIndikator Jumlah total indikator evaluasi pokja (default 6)
 * @returns Format string rasio kemajuan
 */
export function calculateEvaluationProgress(
  indikator: EvaluationIndicator[],
  totalIndikator = 6
): string {
  try {
    if (!Array.isArray(indikator)) return `0/${totalIndikator}`;
    const completed = indikator.filter(
      (item) => item.penilaian && item.penilaian.trim().length > 0
    ).length;
    return `${completed}/${totalIndikator}`;
  } catch (error) {
    console.error('Error kalkulasi progress evaluasi:', error);
    return `0/${totalIndikator}`;
  }
}

/**
 * Menghitung rekomendasi kategori output AI (Quick Win, Sandbox, Frontier, Tunda)
 * berdasarkan indikator evaluasi yang diberikan kurator/reviewer.
 * @param indikator Daftar penilaian indikator
 * @returns Kategori output yang direkomendasikan
 */
export function determineRecommendedCategory(indikator: EvaluationIndicator[]): OutputCategory {
  try {
    if (!indikator || indikator.length === 0) {
      return 'tidak_direkomendasikan';
    }

    const regIndicator = indikator.find((i) => i.indikatorId === 'regulasi_hukum');
    const trlIndicator = indikator.find((i) => i.indikatorId === 'trl');
    const ethicsIndicator = indikator.find((i) => i.indikatorId === 'etika_privasi');

    // Jika regulasi butuh sandbox atau etika berisiko tinggi => Sandbox
    if (
      (regIndicator && regIndicator.penilaian.toLowerCase().includes('sandbox')) ||
      (ethicsIndicator && ethicsIndicator.penilaian.toLowerCase().includes('tinggi'))
    ) {
      return 'sandbox';
    }

    // Jika TRL tinggi (7-9) dan dampak tinggi => Quick Win
    if (trlIndicator && trlIndicator.penilaian.includes('TRL 7-9')) {
      return 'quick_win';
    }

    // Jika TRL rendah (1-3) atau inovasi riset terdepan => Frontier
    if (trlIndicator && trlIndicator.penilaian.includes('TRL 1-3')) {
      return 'frontier';
    }

    return 'quick_win';
  } catch (error) {
    console.error('Error saat menentukan rekomendasi kategori:', error);
    return 'tidak_direkomendasikan';
  }
}

/**
 * Memfilter use case berdasarkan kriteria pencarian, sektor, teknologi, wilayah, dan status.
 * @param items Daftar lengkap use case
 * @param filter Kriteria filter yang aktif
 * @returns Hasil filter
 */
export function filterUseCases(items: UseCaseItem[], filter: FilterState): UseCaseItem[] {
  try {
    if (!Array.isArray(items)) return [];

    return items.filter((item) => {
      // 1. Text Search query pada judul, deskripsi, atau instansi
      if (filter.searchQuery && filter.searchQuery.trim() !== '') {
        const query = filter.searchQuery.toLowerCase().trim();
        const matchTitle = item.judul.toLowerCase().includes(query);
        const matchDesc = item.deskripsiSingkat.toLowerCase().includes(query);
        const matchInstansi = item.fase1.instansi.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchInstansi) {
          return false;
        }
      }

      // 2. Sektor filter
      if (filter.sektor && filter.sektor !== 'Semua Sektor') {
        if (item.sektor.toLowerCase() !== filter.sektor.toLowerCase()) {
          return false;
        }
      }

      // 3. Teknologi filter
      if (filter.teknologi && filter.teknologi !== 'Semua Teknologi') {
        const hasTech = item.teknologi.some((tech) =>
          tech.toLowerCase().includes(filter.teknologi.toLowerCase())
        );
        if (!hasTech) {
          return false;
        }
      }

      // 4. Wilayah filter
      if (filter.wilayah && filter.wilayah !== 'Semua Wilayah') {
        if (item.wilayah.toLowerCase() !== filter.wilayah.toLowerCase()) {
          return false;
        }
      }

      // 5. Status filter
      if (filter.status && filter.status !== 'all') {
        if (item.status.toLowerCase() !== filter.status.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  } catch (error) {
    console.error('Error saat memfilter use case:', error);
    return items;
  }
}
