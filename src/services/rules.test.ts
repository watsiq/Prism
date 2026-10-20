/**
 * @file rules.test.ts
 * @description Unit test untuk modul rules.ts menggunakan native node:test runner.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePhase1,
  validatePhase2,
  calculateEvaluationProgress,
  determineRecommendedCategory,
  filterUseCases,
} from './rules.ts';
import type { UseCaseItem, FilterState } from '../types/index.ts';

test('validatePhase1 detects invalid empty inputs', () => {
  const result = validatePhase1({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.length >= 4);
});

test('validatePhase1 succeeds for valid input payload', () => {
  const result = validatePhase1({
    judul: 'Deteksi Dini Wabah Penyakit',
    deskripsiSingkat: 'Pemanfaatan data puskesmas untuk prediksi wabah',
    namaPengusul: 'Dr. Rina',
    instansi: 'Kementerian Kesehatan',
    email: 'rina@kemenkes.go.id',
    noHp: '08123456789',
  });
  assert.equal(result.isValid, true);
  assert.equal(result.errors.length, 0);
});

test('validatePhase2 validates requirements and models', () => {
  const emptyRes = validatePhase2({});
  assert.equal(emptyRes.isValid, false);

  const validRes = validatePhase2({
    spesifikasiTeknis: 'Model LSTM dan Transformer untuk data berkala.',
    dataRequirements: [
      { id: '1', sumber: 'SIRANAP', format: 'API', volume: '10k', update: 'Harian' },
    ],
    analyticsModels: [
      { id: '1', teknikModel: 'LSTM', output: 'Prediksi BOR', variabelKunci: 'Pasien' },
    ],
  });
  assert.equal(validRes.isValid, true);
});

test('calculateEvaluationProgress returns proper ratio', () => {
  assert.equal(
    calculateEvaluationProgress([
      { indikatorId: '1', namaIndikator: 'Dampak', penilaian: 'Tinggi', komentar: 'Bagus' },
      { indikatorId: '2', namaIndikator: 'TRL', penilaian: 'TRL 7', komentar: 'Siap' },
    ], 6),
    '2/6'
  );

  assert.equal(calculateEvaluationProgress([], 6), '0/6');
});

test('determineRecommendedCategory identifies sandbox correctly', () => {
  const category = determineRecommendedCategory([
    {
      indikatorId: 'regulasi_hukum',
      namaIndikator: 'Kesiapan Regulasi',
      penilaian: 'Membutuhkan Sandbox Regulasi',
      komentar: 'Perlu pengujian terbatas',
    },
  ]);
  assert.equal(category, 'sandbox');
});

test('filterUseCases filters by query and sector accurately', () => {
  const dummyItems: UseCaseItem[] = [
    {
      id: '1',
      judul: 'AI Rumah Sakit',
      deskripsiSingkat: 'Optimasi bed',
      tahapan: 'mvp',
      sektor: 'Kesehatan',
      teknologi: ['Predictive Analytics'],
      wilayah: 'DKI Jakarta',
      tanggalPengajuan: '2025-05-01',
      status: 'disetujui',
      progressEvaluasi: '6/6',
      pengusulId: 'user1',
      fase1: {
        judul: 'AI Rumah Sakit',
        deskripsiSingkat: 'Optimasi bed',
        sektor: 'Kesehatan',
        namaPengusul: 'Dr. Hendra',
        instansi: 'Kemenkes',
        unitKerja: 'Yankes',
        email: 'hendra@kemenkes.go.id',
        noHp: '0812345678',
        pic: 'dr. Andi',
        alamat: 'Jakarta',
        ringkasanEksekutif: 'Ringkasan',
        latarBelakang: 'Latar',
        analisisPermasalahan: 'Masalah',
        dampakFinansialOperasional: 'Dampak',
        valuePropositionAi: 'Value',
        analisisStda: { sense: '', think: '', decide: '', act: '' },
        roadmapImplementasi: 'Roadmap',
        anggaranSumberDana: 'APBN',
      },
      fase2: {
        spesifikasiTeknis: 'Teknis',
        dataRequirements: [],
        infrastrukturPendukung: {
          serverLokal: false,
          gpuKhusus: false,
          komputasiAwan: true,
          router: false,
          lainnya: false,
        },
        analyticsModels: [],
        analisisRisikoTeknologi: 'Risiko',
      },
      fase3: {
        rencanaAksi: [],
        studiKasusSkenario: 'Kasus',
        analisisRisikoImplementasi: 'Risiko',
        strategiMitigasi: 'Mitigasi',
      },
      fase4: {
        rencanaReplikasiSkalabilitas: 'Skala',
        siklusPemeliharaanModel: 'Siklus',
        potensiReuseKemitraan: 'Mitra',
        kepatuhanHukumEtika: 'Etika',
        keterkaitanRpjm: 'RPJM',
      },
    },
    {
      id: '2',
      judul: 'Deteksi Macet CCTV',
      deskripsiSingkat: 'Lalu lintas',
      tahapan: 'poc',
      sektor: 'Transportasi',
      teknologi: ['Computer Vision (CV)'],
      wilayah: 'Jawa Barat',
      tanggalPengajuan: '2025-05-02',
      status: 'diperiksa',
      progressEvaluasi: '3/6',
      pengusulId: 'user2',
      fase1: {
        judul: 'Deteksi Macet CCTV',
        deskripsiSingkat: 'Lalu lintas',
        sektor: 'Transportasi',
        namaPengusul: 'Budi',
        instansi: 'Dishub',
        unitKerja: 'Lantas',
        email: 'budi@dishub.go.id',
        noHp: '0812345679',
        pic: 'Agus',
        alamat: 'Bandung',
        ringkasanEksekutif: 'Ringkasan',
        latarBelakang: 'Latar',
        analisisPermasalahan: 'Masalah',
        dampakFinansialOperasional: 'Dampak',
        valuePropositionAi: 'Value',
        analisisStda: { sense: '', think: '', decide: '', act: '' },
        roadmapImplementasi: 'Roadmap',
        anggaranSumberDana: 'APBD',
      },
      fase2: {
        spesifikasiTeknis: 'Teknis',
        dataRequirements: [],
        infrastrukturPendukung: {
          serverLokal: true,
          gpuKhusus: true,
          komputasiAwan: false,
          router: true,
          lainnya: false,
        },
        analyticsModels: [],
        analisisRisikoTeknologi: 'Risiko',
      },
      fase3: {
        rencanaAksi: [],
        studiKasusSkenario: 'Kasus',
        analisisRisikoImplementasi: 'Risiko',
        strategiMitigasi: 'Mitigasi',
      },
      fase4: {
        rencanaReplikasiSkalabilitas: 'Skala',
        siklusPemeliharaanModel: 'Siklus',
        potensiReuseKemitraan: 'Mitra',
        kepatuhanHukumEtika: 'Etika',
        keterkaitanRpjm: 'RPJM',
      },
    },
  ];

  const filter1: FilterState = {
    searchQuery: 'Rumah Sakit',
    sektor: 'Semua Sektor',
    teknologi: 'Semua Teknologi',
    wilayah: 'Semua Wilayah',
    status: 'all',
  };
  const res1 = filterUseCases(dummyItems, filter1);
  assert.equal(res1.length, 1);
  assert.equal(res1[0].id, '1');

  const filter2: FilterState = {
    searchQuery: '',
    sektor: 'Transportasi',
    teknologi: 'Semua Teknologi',
    wilayah: 'Semua Wilayah',
    status: 'all',
  };
  const res2 = filterUseCases(dummyItems, filter2);
  assert.equal(res2.length, 1);
  assert.equal(res2[0].id, '2');
});
