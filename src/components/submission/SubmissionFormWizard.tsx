/**
 * @file SubmissionFormWizard.tsx
 * @description Form Pengajuan Use Case berbasis 4 Fase input sesuai Mockup Halaman 4 & 5.
 */

import React, { useState } from 'react';
import { Upload, Plus, Trash2, ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';
import type {
  DevelopmentStage,
  Phase1Conceptualization,
  Phase2DataAndModel,
  Phase3ImplementationAndEvaluation,
  Phase4GovernanceAndSustainability,
  DataRequirementItem,
  AnalyticsModelItem,
  ImplementationPlanItem,
} from '../../types/index.ts';
import { SECTOR_OPTIONS } from '../../constants/options.ts';
import { validatePhase1, validatePhase2 } from '../../services/rules.ts';

interface SubmissionFormWizardProps {
  initialStage: DevelopmentStage;
  initialData?: {
    fase1?: Partial<Phase1Conceptualization>;
    fase2?: Partial<Phase2DataAndModel>;
    fase3?: Partial<Phase3ImplementationAndEvaluation>;
    fase4?: Partial<Phase4GovernanceAndSustainability>;
  };
  onSaveDraft: (data: unknown) => void;
  onProceedToPreview: (
    stage: DevelopmentStage,
    fase1: Phase1Conceptualization,
    fase2: Phase2DataAndModel,
    fase3: Phase3ImplementationAndEvaluation,
    fase4: Phase4GovernanceAndSustainability
  ) => void;
  onCancel: () => void;
}

export const SubmissionFormWizard: React.FC<SubmissionFormWizardProps> = ({
  initialStage,
  initialData,
  onSaveDraft,
  onProceedToPreview,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Fase 1 state
  const [fase1, setFase1] = useState<Phase1Conceptualization>({
    judul: initialData?.fase1?.judul || '',
    deskripsiSingkat: initialData?.fase1?.deskripsiSingkat || '',
    sektor: initialData?.fase1?.sektor || 'Kesehatan',
    namaPengusul: initialData?.fase1?.namaPengusul || 'Dr. Rina Setiawati, M.Kes',
    instansi: initialData?.fase1?.instansi || 'Kementerian Kesehatan',
    unitKerja: initialData?.fase1?.unitKerja || 'Pusat Data dan Teknologi Informasi Kesehatan (Pusdatin)',
    email: initialData?.fase1?.email || 'rinasetiawati@gmail.com',
    noHp: initialData?.fase1?.noHp || '081312345678',
    pic: initialData?.fase1?.pic || 'dr. Sultan Ardiansyah',
    alamat: initialData?.fase1?.alamat || 'Jl. H.R. Rasuna Said Blok X.5 Kav 4-9, Jakarta Selatan',
    ringkasanEksekutif: initialData?.fase1?.ringkasanEksekutif || '',
    latarBelakang: initialData?.fase1?.latarBelakang || '',
    analisisPermasalahan: initialData?.fase1?.analisisPermasalahan || '',
    dampakFinansialOperasional: initialData?.fase1?.dampakFinansialOperasional || '',
    valuePropositionAi: initialData?.fase1?.valuePropositionAi || '',
    analisisStda: initialData?.fase1?.analisisStda || {
      sense: '',
      think: '',
      decide: '',
      act: '',
    },
    roadmapImplementasi: initialData?.fase1?.roadmapImplementasi || '',
    anggaranSumberDana: initialData?.fase1?.anggaranSumberDana || '',
  });

  // Fase 2 state
  const [fase2, setFase2] = useState<Phase2DataAndModel>({
    spesifikasiTeknis: initialData?.fase2?.spesifikasiTeknis || '',
    dataRequirements: initialData?.fase2?.dataRequirements || [
      {
        id: 'dr-1',
        sumber: 'Aplikasi Surat Masuk Pemda',
        format: 'pdf',
        volume: '>5.000 file',
        update: 'Bulanan',
      },
      {
        id: 'dr-2',
        sumber: 'Website Mahkamah Agung',
        format: 'html / Web Scraping',
        volume: '>1.200 dokumen putusan',
        update: 'Sekali Saja',
      },
    ],
    infrastrukturPendukung: initialData?.fase2?.infrastrukturPendukung || {
      serverLokal: false,
      gpuKhusus: true,
      komputasiAwan: true,
      router: false,
      lainnya: false,
      keteranganLainnya: '',
    },
    analyticsModels: initialData?.fase2?.analyticsModels || [
      {
        id: 'am-1',
        teknikModel: 'NLP - Text Retrieval + RAG (Retrieval-Augmented Generation)',
        output: 'Jawaban hukum berbasis dokumen terstruktur',
        variabelKunci: 'Pertanyaan dari pengguna, isi dokumen hukum, Metadata dokumen',
      },
      {
        id: 'am-2',
        teknikModel: 'Named Entity Recognition (NER)',
        output: 'Menandai entitas hukum: nama lembaga, pasal, tahun UU',
        variabelKunci: 'Teks pertanyaan, Dokumen peraturan',
      },
    ],
    analisisRisikoTeknologi: initialData?.fase2?.analisisRisikoTeknologi || '',
  });

  // Fase 3 state
  const [fase3, setFase3] = useState<Phase3ImplementationAndEvaluation>({
    rencanaAksi: initialData?.fase3?.rencanaAksi || [
      {
        id: 'ra-1',
        aktivitas: 'Aplikasi Surat Masuk Pemda',
        pelaksana: '.pdf',
        durasi: '>5.000 file',
        output: 'Bulanan',
      },
      {
        id: 'ra-2',
        aktivitas: 'Website Mahkamah Agung',
        pelaksana: 'html / Web Scraping',
        durasi: '>1.200 dokumen putusan',
        output: 'Sekali Saja',
      },
    ],
    studiKasusSkenario: initialData?.fase3?.studiKasusSkenario || '',
    analisisRisikoImplementasi: initialData?.fase3?.analisisRisikoImplementasi || '',
    strategiMitigasi: initialData?.fase3?.strategiMitigasi || '',
  });

  // Fase 4 state
  const [fase4, setFase4] = useState<Phase4GovernanceAndSustainability>({
    rencanaReplikasiSkalabilitas: initialData?.fase4?.rencanaReplikasiSkalabilitas || '',
    siklusPemeliharaanModel: initialData?.fase4?.siklusPemeliharaanModel || '',
    potensiReuseKemitraan: initialData?.fase4?.potensiReuseKemitraan || '',
    kepatuhanHukumEtika: initialData?.fase4?.kepatuhanHukumEtika || '',
    keterkaitanRpjm: initialData?.fase4?.keterkaitanRpjm || '',
  });

  // Stepper steps configuration
  const steps = [
    { num: 1, title: 'Konseptualisasi & Perencanaan' },
    { num: 2, title: 'Pengembangan Data & Model' },
    { num: 3, title: 'Implementasi & Evaluasi' },
    { num: 4, title: 'Pengelolaan & Pengembangan Lanjutan' },
    { num: 5, title: 'Preview' },
  ];

  // Helper untuk menambah baris Data Requirement
  const handleAddDataRequirement = () => {
    const newItem: DataRequirementItem = {
      id: `dr-${Date.now()}`,
      sumber: '',
      format: '',
      volume: '',
      update: '',
    };
    setFase2((prev) => ({
      ...prev,
      dataRequirements: [...prev.dataRequirements, newItem],
    }));
  };

  const handleRemoveDataRequirement = (id: string) => {
    setFase2((prev) => ({
      ...prev,
      dataRequirements: prev.dataRequirements.filter((i) => i.id !== id),
    }));
  };

  // Helper untuk menambah baris Model AI
  const handleAddAnalyticsModel = () => {
    const newItem: AnalyticsModelItem = {
      id: `am-${Date.now()}`,
      teknikModel: '',
      output: '',
      variabelKunci: '',
    };
    setFase2((prev) => ({
      ...prev,
      analyticsModels: [...prev.analyticsModels, newItem],
    }));
  };

  const handleRemoveAnalyticsModel = (id: string) => {
    setFase2((prev) => ({
      ...prev,
      analyticsModels: prev.analyticsModels.filter((i) => i.id !== id),
    }));
  };

  // Helper untuk menambah baris Rencana Aksi
  const handleAddImplementationPlan = () => {
    const newItem: ImplementationPlanItem = {
      id: `ra-${Date.now()}`,
      aktivitas: '',
      pelaksana: '',
      durasi: '',
      output: '',
    };
    setFase3((prev) => ({
      ...prev,
      rencanaAksi: [...prev.rencanaAksi, newItem],
    }));
  };

  const handleRemoveImplementationPlan = (id: string) => {
    setFase3((prev) => ({
      ...prev,
      rencanaAksi: prev.rencanaAksi.filter((i) => i.id !== id),
    }));
  };

  // Navigasi langkah berikutnya dengan validasi
  const handleNextStep = () => {
    setValidationErrors([]);

    if (currentStep === 1) {
      const res = validatePhase1(fase1);
      if (!res.isValid) {
        setValidationErrors(res.errors);
        return;
      }
    } else if (currentStep === 2) {
      const res = validatePhase2(fase2);
      if (!res.isValid) {
        setValidationErrors(res.errors);
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 4) {
      // Menuju Preview (Step 5)
      onProceedToPreview(initialStage, fase1, fase2, fase3, fase4);
    }
  };

  const handlePrevStep = () => {
    setValidationErrors([]);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  const handleSaveDraftAction = () => {
    onSaveDraft({
      stage: initialStage,
      fase1,
      fase2,
      fase3,
      fase4,
    });
    setToastMessage('Draf pengajuan use case berhasil disimpan secara bertahap.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Form Pengajuan Use Case
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tahap AI yang diajukan: <span className="font-semibold text-blue-600 uppercase">{initialStage}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveDraftAction}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Simpan Draf</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Stepper Wizard (Mockup Page 4 & 5) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
          {steps.map((st) => {
            const isActive = currentStep === st.num;
            const isCompleted = currentStep > st.num;
            return (
              <div
                key={st.num}
                className={`p-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : isCompleted
                    ? 'text-slate-600 font-medium'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 font-bold ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {st.num}
                </div>
                <span className="text-[11px] leading-tight line-clamp-2">
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Validation Alert */}
      {validationErrors.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs space-y-1">
          <div className="font-bold">Mohon lengkapi isian berikut:</div>
          <ul className="list-disc pl-4 space-y-0.5">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* FORM STEP CONTENT */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-8">
        {/* ================= STEP 1: Konseptualisasi & Perencanaan ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* INFORMASI UMUM */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                INFORMASI UMUM
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Judul Use Case *
                  </label>
                  <input
                    type="text"
                    placeholder="Tuliskan judul dari use case ini"
                    value={fase1.judul}
                    onChange={(e) => setFase1({ ...fase1, judul: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Deskripsi Singkat *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Berikan deskripsi singkat untuk use case ini"
                    value={fase1.deskripsiSingkat}
                    onChange={(e) => setFase1({ ...fase1, deskripsiSingkat: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sektor Prioritas *
                  </label>
                  <select
                    value={fase1.sektor}
                    onChange={(e) => setFase1({ ...fase1, sektor: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {SECTOR_OPTIONS.filter((s) => s !== 'Semua Sektor').map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* IDENTITAS DAN KONTAK PENGUSUL */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                IDENTITAS DAN KONTAK PENGUSUL
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Pengusul *
                  </label>
                  <input
                    type="text"
                    placeholder="Nama dari pengusul use case ini"
                    value={fase1.namaPengusul}
                    onChange={(e) => setFase1({ ...fase1, namaPengusul: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Instansi *
                    </label>
                    <input
                      type="text"
                      placeholder="Pilih jabatan / instansi pengusul"
                      value={fase1.instansi}
                      onChange={(e) => setFase1({ ...fase1, instansi: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Unit Kerja *
                    </label>
                    <input
                      type="text"
                      placeholder="Pilih unit kerja dari pengusul"
                      value={fase1.unitKerja}
                      onChange={(e) => setFase1({ ...fase1, unitKerja: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="Masukkan email penanggung jawab"
                      value={fase1.email}
                      onChange={(e) => setFase1({ ...fase1, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      No. HP *
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan no. HP pengusul"
                      value={fase1.noHp}
                      onChange={(e) => setFase1({ ...fase1, noHp: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PIC (Person in Charge)
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan PIC"
                      value={fase1.pic}
                      onChange={(e) => setFase1({ ...fase1, pic: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Berikan alamat kantor / unit kerja pengusul"
                    value={fase1.alamat}
                    onChange={(e) => setFase1({ ...fase1, alamat: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* RINGKASAN EKSEKUTIF & LATAR BELAKANG */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                RINGKASAN EKSEKUTIF & LATAR BELAKANG
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ringkasan Eksekutif
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan ringkasan eksekutif inovasi AI ini"
                    value={fase1.ringkasanEksekutif}
                    onChange={(e) => setFase1({ ...fase1, ringkasanEksekutif: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Latar Belakang Masalah
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan latar belakang dan urgensi penyelesaian masalah"
                    value={fase1.latarBelakang}
                    onChange={(e) => setFase1({ ...fase1, latarBelakang: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Value Proposition Solusi AI
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Nilai tambah dan keunggulan spesifik solusi AI dibanding pendekatan konvensional"
                    value={fase1.valuePropositionAi}
                    onChange={(e) => setFase1({ ...fase1, valuePropositionAi: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: Pengembangan Data & Model ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* SPESIFIKASI TEKNIS */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                SPESIFIKASI TEKNIS
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Spesifikasi Teknis Data & Model *
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan teknis data, model yang digunakan, dsb."
                  value={fase2.spesifikasiTeknis}
                  onChange={(e) => setFase2({ ...fase2, spesifikasiTeknis: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* REQUIREMENT DATA (Tabel Dinamis) */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  REQUIREMENT DATA
                </h3>
                <button
                  type="button"
                  onClick={handleAddDataRequirement}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Baris</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Sumber</th>
                      <th className="px-3 py-2">Format</th>
                      <th className="px-3 py-2">Volume</th>
                      <th className="px-3 py-2">Update</th>
                      <th className="px-2 py-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fase2.dataRequirements.map((row) => (
                      <tr key={row.id}>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.sumber}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase2((prev) => ({
                                ...prev,
                                dataRequirements: prev.dataRequirements.map((i) =>
                                  i.id === row.id ? { ...i, sumber: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.format}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase2((prev) => ({
                                ...prev,
                                dataRequirements: prev.dataRequirements.map((i) =>
                                  i.id === row.id ? { ...i, format: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.volume}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase2((prev) => ({
                                ...prev,
                                dataRequirements: prev.dataRequirements.map((i) =>
                                  i.id === row.id ? { ...i, volume: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.update}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase2((prev) => ({
                                ...prev,
                                dataRequirements: prev.dataRequirements.map((i) =>
                                  i.id === row.id ? { ...i, update: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveDataRequirement(row.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* INFRASTRUKTUR PENDUKUNG */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                INFRASTRUKTUR PENDUKUNG
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Perangkat Keras & Infrastruktur
                  </label>
                  <div className="space-y-2 text-xs text-slate-700">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={fase2.infrastrukturPendukung.serverLokal}
                        onChange={(e) =>
                          setFase2({
                            ...fase2,
                            infrastrukturPendukung: {
                              ...fase2.infrastrukturPendukung,
                              serverLokal: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Server Lokal</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={fase2.infrastrukturPendukung.gpuKhusus}
                        onChange={(e) =>
                          setFase2({
                            ...fase2,
                            infrastrukturPendukung: {
                              ...fase2.infrastrukturPendukung,
                              gpuKhusus: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>GPU Khusus</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={fase2.infrastrukturPendukung.komputasiAwan}
                        onChange={(e) =>
                          setFase2({
                            ...fase2,
                            infrastrukturPendukung: {
                              ...fase2.infrastrukturPendukung,
                              komputasiAwan: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Komputasi Awan (Cloud Computing)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={fase2.infrastrukturPendukung.router}
                        onChange={(e) =>
                          setFase2({
                            ...fase2,
                            infrastrukturPendukung: {
                              ...fase2.infrastrukturPendukung,
                              router: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Router & Jaringan Khusus</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={fase2.infrastrukturPendukung.lainnya}
                        onChange={(e) =>
                          setFase2({
                            ...fase2,
                            infrastrukturPendukung: {
                              ...fase2.infrastrukturPendukung,
                              lainnya: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Lainnya</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Sistem yang dibutuhkan (Diagram / Lampiran)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50/10 cursor-pointer">
                    <Upload className="w-8 h-8 mb-2 text-slate-300" />
                    <span className="text-xs font-medium text-slate-600">
                      Klik untuk upload file arsitektur / topologi sistem
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">
                      PDF, PNG, JPG (maks 10MB)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ANALITIK & MODEL AI (Tabel Dinamis) */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ANALITIK & MODEL AI
                </h3>
                <button
                  type="button"
                  onClick={handleAddAnalyticsModel}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Baris</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Teknik Model</th>
                      <th className="px-3 py-2">Output</th>
                      <th className="px-3 py-2">Variabel Kunci</th>
                      <th className="px-2 py-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fase2.analyticsModels.map((row) => (
                      <tr key={row.id}>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.teknikModel}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase2((prev) => ({
                                ...prev,
                                analyticsModels: prev.analyticsModels.map((i) =>
                                  i.id === row.id ? { ...i, teknikModel: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.output}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase2((prev) => ({
                                ...prev,
                                analyticsModels: prev.analyticsModels.map((i) =>
                                  i.id === row.id ? { ...i, output: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.variabelKunci}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase2((prev) => ({
                                ...prev,
                                analyticsModels: prev.analyticsModels.map((i) =>
                                  i.id === row.id ? { ...i, variabelKunci: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveAnalyticsModel(row.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ANALISIS RISIKO TEKNOLOGI & DATA */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                ANALISIS RISIKO TEKNOLOGI & DATA
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Risiko Kualitas Data, Integrasi, dan Bias Model
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan risiko terkait kualitas data, reliabilitas integrasi sistem, dan potensi bias algoritma"
                  value={fase2.analisisRisikoTeknologi}
                  onChange={(e) => setFase2({ ...fase2, analisisRisikoTeknologi: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: Implementasi & Evaluasi ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* RENCANA AKSI & IMPLEMENTASI (Tabel Dinamis) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  RENCANA AKSI & IMPLEMENTASI
                </h3>
                <button
                  type="button"
                  onClick={handleAddImplementationPlan}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Baris</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Aktivitas</th>
                      <th className="px-3 py-2">Pelaksana</th>
                      <th className="px-3 py-2">Durasi</th>
                      <th className="px-3 py-2">Output</th>
                      <th className="px-2 py-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fase3.rencanaAksi.map((row) => (
                      <tr key={row.id}>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.aktivitas}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase3((prev) => ({
                                ...prev,
                                rencanaAksi: prev.rencanaAksi.map((i) =>
                                  i.id === row.id ? { ...i, aktivitas: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.pelaksana}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase3((prev) => ({
                                ...prev,
                                rencanaAksi: prev.rencanaAksi.map((i) =>
                                  i.id === row.id ? { ...i, pelaksana: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.durasi}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase3((prev) => ({
                                ...prev,
                                rencanaAksi: prev.rencanaAksi.map((i) =>
                                  i.id === row.id ? { ...i, durasi: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.output}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFase3((prev) => ({
                                ...prev,
                                rencanaAksi: prev.rencanaAksi.map((i) =>
                                  i.id === row.id ? { ...i, output: val } : i
                                ),
                              }));
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveImplementationPlan(row.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CONTOH IMPLEMENTASI NYATA */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                CONTOH IMPLEMENTASI NYATA
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Studi Kasus atau Skenario Penerapan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Silakan tuliskan studi kasus atau upload file jika anda telah memilikinya"
                    value={fase3.studiKasusSkenario}
                    onChange={(e) => setFase3({ ...fase3, studiKasusSkenario: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload File Lampiran
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-center space-x-2 text-slate-500 hover:border-blue-400 cursor-pointer">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-xs">Klik untuk melampirkan berkas studi kasus (PDF / Docx)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ANALISIS RISIKO IMPLEMENTASI */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                ANALISIS RISIKO IMPLEMENTASI
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Potensi Kendala Teknis dan Non-Teknis
                </label>
                <textarea
                  rows={2}
                  placeholder="Silakan tuliskan potensi kendala teknis dan non-teknis selama proses penerapan"
                  value={fase3.analisisRisikoImplementasi}
                  onChange={(e) => setFase3({ ...fase3, analisisRisikoImplementasi: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* STRATEGI MITIGASI */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                STRATEGI MITIGASI
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Strategi Menghadapi Tantangan Selama Pelaksanaan
                </label>
                <textarea
                  rows={2}
                  placeholder="Silakan tuliskan strategi mitigasi untuk menghadapi tantangan selama pelaksanaan"
                  value={fase3.strategiMitigasi}
                  onChange={(e) => setFase3({ ...fase3, strategiMitigasi: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: Pengelolaan & Pengembangan Lanjutan ================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                PENGELOLAAN & KEBERLANJUTAN JANGKA PANJANG
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rencana Replikasi dan Skalabilitas
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Rencana perluasan atau replikasi ke faskes / unit kerja / daerah lain"
                    value={fase4.rencanaReplikasiSkalabilitas}
                    onChange={(e) => setFase4({ ...fase4, rencanaReplikasiSkalabilitas: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Siklus Pemeliharaan & Retraining Model AI
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mekanisme pembaruan data latih, monitoring drift data, dan evaluasi performa model berkala"
                    value={fase4.siklusPemeliharaanModel}
                    onChange={(e) => setFase4({ ...fase4, siklusPemeliharaanModel: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Potensi Kolaborasi, Reuse, & Kemitraan Antar Instansi
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Kemitraan dengan universitas, BRIN, BUMN, atau industri teknologi"
                    value={fase4.potensiReuseKemitraan}
                    onChange={(e) => setFase4({ ...fase4, potensiReuseKemitraan: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kepatuhan Hukum, Privasi Data (UU PDP) & Etika AI
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Langkah kepatuhan regulasi perlindungan data pribadi dan pedoman etika AI nasional"
                    value={fase4.kepatuhanHukumEtika}
                    onChange={(e) => setFase4({ ...fase4, kepatuhanHukumEtika: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Keterkaitan dengan Target RPJMN & Stranas AI
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Pilar RPJMN atau Stranas AI yang secara langsung didukung oleh inisiatif ini"
                    value={fase4.keterkaitanRpjm}
                    onChange={(e) => setFase4({ ...fase4, keterkaitanRpjm: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex items-center space-x-1.5 px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{currentStep === 1 ? 'Batal' : 'Kembali'}</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleSaveDraftAction}
            className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Simpan Draft
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            className="flex items-center space-x-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <span>{currentStep === 4 ? 'Lihat Preview (Lanjut)' : 'Lanjut'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
