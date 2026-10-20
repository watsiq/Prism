/**
 * @file index.ts
 * @description Tipe data dan antarmuka untuk platform PRISMA AI.
 * Sesuai dengan spesifikasi dokumen Mockup, Arsitektur, dan Modul Fitur.
 */

export type UserRole =
  | 'pengusul'
  | 'reviewer'
  | 'admin'
  | 'editor'
  | 'regulator'
  | 'public';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agency?: string;
  unit?: string;
  avatarUrl?: string;
}

export type DevelopmentStage =
  | 'poc'
  | 'prototype'
  | 'mvp'
  | 'implemented';

export type UseCaseStatus =
  | 'draft'
  | 'diperiksa'
  | 'disetujui'
  | 'perlu_revisi'
  | 'ditolak';

export type OutputCategory =
  | 'quick_win'
  | 'sandbox'
  | 'frontier'
  | 'tidak_direkomendasikan';

export interface DataRequirementItem {
  id: string;
  sumber: string;
  format: string;
  volume: string;
  update: string;
}

export interface AnalyticsModelItem {
  id: string;
  teknikModel: string;
  output: string;
  variabelKunci: string;
}

export interface ImplementationPlanItem {
  id: string;
  aktivitas: string;
  pelaksana: string;
  durasi: string;
  output: string;
}

export interface EvaluationIndicator {
  indikatorId: string;
  namaIndikator: string;
  penilaian: string; // Skor atau rating kualitatif (e.g., 'Sangat Siap', 'Cukup', '1-5')
  komentar: string;
}

export interface UseCaseEvaluation {
  id: string;
  useCaseId: string;
  reviewerId: string;
  reviewerName: string;
  tanggalEvaluasi: string;
  progressEvaluasi: string; // e.g. "3/9" or "6/6"
  indikator: EvaluationIndicator[];
  rekomendasiKategori?: OutputCategory;
  flags: string[]; // e.g., ["Etika Sensitif", "Butuh Pendampingan"]
  catatanUmum: string;
  statusKeputusan: UseCaseStatus;
}

export interface Phase1Conceptualization {
  judul: string;
  deskripsiSingkat: string;
  sektor: string;
  namaPengusul: string;
  instansi: string;
  unitKerja: string;
  email: string;
  noHp: string;
  pic: string;
  alamat: string;
  ringkasanEksekutif: string;
  latarBelakang: string;
  analisisPermasalahan: string;
  dampakFinansialOperasional: string;
  valuePropositionAi: string;
  analisisStda: {
    sense: string;
    think: string;
    decide: string;
    act: string;
  };
  roadmapImplementasi: string;
  anggaranSumberDana: string;
}

export interface Phase2DataAndModel {
  spesifikasiTeknis: string;
  dataRequirements: DataRequirementItem[];
  infrastrukturPendukung: {
    serverLokal: boolean;
    gpuKhusus: boolean;
    komputasiAwan: boolean;
    router: boolean;
    lainnya: boolean;
    keteranganLainnya?: string;
  };
  sistemYangDibutuhkanLampiran?: string;
  analyticsModels: AnalyticsModelItem[];
  analisisRisikoTeknologi: string;
}

export interface Phase3ImplementationAndEvaluation {
  rencanaAksi: ImplementationPlanItem[];
  studiKasusSkenario: string;
  lampiranStudiKasusUrl?: string;
  analisisRisikoImplementasi: string;
  strategiMitigasi: string;
}

export interface Phase4GovernanceAndSustainability {
  rencanaReplikasiSkalabilitas: string;
  siklusPemeliharaanModel: string;
  potensiReuseKemitraan: string;
  kepatuhanHukumEtika: string;
  keterkaitanRpjm: string;
}

export interface UseCaseItem {
  id: string;
  judul: string;
  deskripsiSingkat: string;
  tahapan: DevelopmentStage;
  sektor: string;
  teknologi: string[];
  wilayah: string;
  tanggalPengajuan: string;
  status: UseCaseStatus;
  progressEvaluasi: string;
  imageUrl?: string;
  pengusulId: string;
  fase1: Phase1Conceptualization;
  fase2: Phase2DataAndModel;
  fase3: Phase3ImplementationAndEvaluation;
  fase4: Phase4GovernanceAndSustainability;
  evaluasi?: UseCaseEvaluation;
}

export interface FilterState {
  searchQuery: string;
  sektor: string;
  teknologi: string;
  wilayah: string;
  status: string;
  tanggalPengajuan?: string;
}

export interface DashboardMetricData {
  proyekPerSektor: { sektor: string; count: number; color: string }[];
  sektorAktifMemperbaharui: { sektor: string; count: number }[];
  sandboxRegulasi: { sektor: string; count: number }[];
  solusiLokalDiimplementasikan: { month: string; count: number }[];
  adopsiPemerintahDanBumn: { month: string; pemerintah: number; bumn: number }[];
  pendapatanKomersial: { year: string; count: number }[];
  adopsiPerTahap: { stage: string; count: number; color: string }[];
  rujukanTalentaAi: { category: string; count: number; color: string }[];
}
