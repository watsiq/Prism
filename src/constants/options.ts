/**
 * @file options.ts
 * @description Opsi dan konstanta statis untuk form, filter, dan matriks evaluasi PRISMA AI.
 */

export const SECTOR_OPTIONS = [
  'Semua Sektor',
  'Kesehatan',
  'Transportasi',
  'Smart City & Komunikasi',
  'Reformasi Birokrasi',
  'Pendidikan',
  'Pertanian & Ketahanan Pangan',
  'Hukum & Peradilan',
  'Energi & Sumber Daya',
];

export const TECHNOLOGY_OPTIONS = [
  'Semua Teknologi',
  'Computer Vision (CV)',
  'Natural Language Processing (NLP)',
  'LLM & RAG',
  'Predictive Analytics',
  'Digital Twin',
  'Machine Learning & Deep Learning',
  'IoT & Smart Sensor',
];

export const REGION_OPTIONS = [
  'Semua Wilayah',
  'Aceh',
  'Bali',
  'Banten',
  'Bengkulu',
  'D.I. Yogyakarta',
  'DKI Jakarta',
  'Gorontalo',
  'Jambi',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Kalimantan Barat',
  'Kalimantan Selatan',
  'Kalimantan Tengah',
  'Kalimantan Timur',
  'Kepulauan Bangka Belitung',
  'Kepulauan Riau',
  'Lampung',
  'Maluku',
  'Maluku Utara',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Papua',
  'Papua Barat',
  'Riau',
  'Sulawesi Barat',
  'Sulawesi Selatan',
  'Sulawesi Tengah',
  'Sulawesi Tenggara',
  'Sulawesi Utara',
  'Sumatera Barat',
  'Sumatera Selatan',
  'Sumatera Utara',
];

export const STAGE_OPTIONS = [
  {
    id: 'poc',
    title: 'Proof of Concept (PoC)',
    description:
      'Tahap ini berfokus pada pembuktian awal bahwa solusi AI memungkinkan untuk diterapkan pada masalah tertentu.',
  },
  {
    id: 'prototype',
    title: 'Prototype',
    description:
      'Merupakan versi awal dari aplikasi AI yang dikembangkan untuk menunjukkan fungsi dasar dan mengumpulkan masukan dari pengguna sebagai dasar pengembangan.',
  },
  {
    id: 'mvp',
    title: 'Minimum Viable Product',
    description:
      'Produk AI yang sudah fungsional dengan fitur paling mendasar yang dibutuhkan untuk memberikan nilai awal kepada pengguna.',
  },
  {
    id: 'implemented',
    title: 'Implemented',
    description:
      'Solusi AI sudah diimplementasikan sepenuhnya dalam lingkungan operasional, terintegrasi dengan proses yang ada, dan memberikan nilai nyata bagi pengguna.',
  },
];

export const EVALUATION_INDICATORS = [
  {
    id: 'dampak_sosial_ekonomi',
    label: 'Dampak Sosial-Ekonomi',
    options: ['Tinggi (>80%)', 'Sedang (50-80%)', 'Rendah (<50%)', 'Belum Terukur'],
  },
  {
    id: 'trl',
    label: 'Kesiapan Teknologi (Technology Readiness Level / TRL)',
    options: ['TRL 1-3 (Riset Dasar)', 'TRL 4-6 (Validasi Prototipe)', 'TRL 7-9 (Sistem Teruji & Komersial)'],
  },
  {
    id: 'regulasi_hukum',
    label: 'Kesiapan Regulasi & Hukum',
    options: ['Sesuai Regulasi Terkait', 'Membutuhkan Sandbox Regulasi', 'Potensi Pelanggaran Regulasi'],
  },
  {
    id: 'etika_privasi',
    label: 'Risiko Etika & Privasi',
    options: ['Risiko Rendah / Data Publik', 'Risiko Sedang (Data Terbatas)', 'Risiko Tinggi (Data Sensitif / Individu)'],
  },
  {
    id: 'replikasi_skalabilitas',
    label: 'Potensi Replikasi & Skalabilitas',
    options: ['Sangat Mudah Direplikasi Nasional', 'Replikasi Tingkat Provinsi/Sektoral', 'Spesifik Kasus Tunggal'],
  },
  {
    id: 'selaras_rpjmn',
    label: 'Selaras dengan RPJMN / STRANAS AI',
    options: ['Sangat Selaras (Prioritas Nasional 1)', 'Cukup Selaras', 'Kurang Selaras'],
  },
];

export const OUTPUT_CATEGORIES = [
  { id: 'quick_win', label: 'Quick Win', description: 'Solusi berdaya guna cepat dengan risiko rendah' },
  { id: 'sandbox', label: 'Sandbox', description: 'Membutuhkan pengujian kepatuhan dalam ruang uji regulasi' },
  { id: 'frontier', label: 'Frontier', description: 'Inovasi tingkat tinggi dan riset terdepan' },
  { id: 'tidak_direkomendasikan', label: 'Tunda / Tidak Direkomendasikan', description: 'Belum memenuhi kriteria dasar' },
];

export const POKJA_FLAGS = [
  'Etika Sensitif',
  'Butuh Pendampingan',
  'Prioritas Nasional',
  'Data Sensitif',
  'Potensi Monopoli Vendor',
  'Dukungan GPU Diperlukan',
];

