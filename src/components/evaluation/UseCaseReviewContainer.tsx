/**
 * @file UseCaseReviewContainer.tsx
 * @description Komponen Halaman Detail Pengajuan & Evaluasi Use Case sesuai Mockup Halaman 9 & 10.
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Send,
  Save,
} from 'lucide-react';
import type {
  UseCaseItem,
  EvaluationIndicator,
  OutputCategory,
  UseCaseStatus,
} from '../../types/index.ts';
import {
  EVALUATION_INDICATORS,
  OUTPUT_CATEGORIES,
  POKJA_FLAGS,
} from '../../constants/options.ts';
import { EvaluationService } from '../../services/evaluationService.ts';
import { StatusBadge } from '../common/Badge.tsx';

interface UseCaseReviewContainerProps {
  useCase: UseCaseItem;
  onBack: () => void;
  onEvaluationUpdated: (updated: UseCaseItem) => void;
}

export const UseCaseReviewContainer: React.FC<UseCaseReviewContainerProps> = ({
  useCase,
  onBack,
  onEvaluationUpdated,
}) => {
  // Main view tab: 'detail' (Page 9) vs 'evaluasi' (Page 10)
  const [mainTab, setMainTab] = useState<'detail' | 'evaluasi'>('detail');

  // Phase sub-tab for Detailed Use Case (Page 9)
  const [activePhase, setActivePhase] = useState<number>(1);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    ringkasan: true,
    masalah: true,
    dampak: true,
    value: true,
    stda: true,
    roadmap: true,
    anggaran: true,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // State form evaluasi (Page 10)
  const [indicators, setIndicators] = useState<EvaluationIndicator[]>(() => {
    if (useCase.evaluasi?.indikator && useCase.evaluasi.indikator.length > 0) {
      return useCase.evaluasi.indikator;
    }
    return EVALUATION_INDICATORS.map((ind) => ({
      indikatorId: ind.id,
      namaIndikator: ind.label,
      penilaian: '',
      komentar: '',
    }));
  });

  const [selectedCategory, setSelectedCategory] = useState<OutputCategory>(
    useCase.evaluasi?.rekomendasiKategori || 'sandbox'
  );

  const [flags, setFlags] = useState<string[]>(
    useCase.evaluasi?.flags || ['Etika Sensitif', 'Prioritas Nasional']
  );

  const [decisionStatus, setDecisionStatus] = useState<UseCaseStatus>(
    useCase.status || 'diperiksa'
  );

  const [generalComment, setGeneralComment] = useState<string>(
    useCase.evaluasi?.catatanUmum || ''
  );

  const [toastMessage, setToastMessage] = useState<string>('');

  const handleIndicatorChange = (
    id: string,
    field: 'penilaian' | 'komentar',
    value: string
  ) => {
    setIndicators((prev) =>
      prev.map((ind) => (ind.indikatorId === id ? { ...ind, [field]: value } : ind))
    );
  };

  const handleToggleFlag = (flagName: string) => {
    setFlags((prev) =>
      prev.includes(flagName) ? prev.filter((f) => f !== flagName) : [...prev, flagName]
    );
  };

  const handleSaveEvaluation = (statusToApply?: UseCaseStatus) => {
    try {
      const finalStatus = statusToApply || decisionStatus;
      const updated = EvaluationService.saveEvaluation(useCase.id, {
        reviewerId: 'user_reviewer_1',
        reviewerName: 'Budi Santoso, Ph.D.',
        indikator: indicators,
        rekomendasiKategori: selectedCategory,
        flags: flags,
        catatanUmum: generalComment,
        statusKeputusan: finalStatus,
      });

      onEvaluationUpdated(updated);
      setToastMessage('Evaluasi dan kurasi use case berhasil disimpan.');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Error saat menyimpan evaluasi:', err);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Breadcrumb & Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Pengajuan</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Status Saat Ini:</span>
          <StatusBadge status={useCase.status} />
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Layout: Left Side Tabs + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Vertical Tab Selector (Mockup Page 9 & 10) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs space-y-1">
            <button
              type="button"
              onClick={() => setMainTab('detail')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                mainTab === 'detail'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Detailed Use Case</span>
              <span className="text-[10px] opacity-75">Halaman 9</span>
            </button>

            <button
              type="button"
              onClick={() => setMainTab('evaluasi')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                mainTab === 'evaluasi'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Evaluasi Matriks</span>
              <span className="text-[10px] opacity-75">Halaman 10</span>
            </button>
          </div>

          {/* Pengusul Identity Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-xs space-y-3">
            <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
              Identitas Pengusul
            </h4>
            <div>
              <span className="text-slate-400 block text-[11px]">Nama:</span>
              <span className="font-semibold text-slate-800">{useCase.fase1.namaPengusul}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Instansi / Unit:</span>
              <span className="text-slate-700">{useCase.fase1.instansi}</span>
              <span className="text-slate-500 block text-[11px]">{useCase.fase1.unitKerja}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Kontak:</span>
              <span className="text-slate-700 block">{useCase.fase1.email}</span>
              <span className="text-slate-700 block">{useCase.fase1.noHp}</span>
              <span className="text-slate-500 block text-[11px]">PIC: {useCase.fase1.pic}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Alamat:</span>
              <span className="text-slate-600 text-[11px] leading-relaxed">
                {useCase.fase1.alamat}
              </span>
            </div>
          </div>
        </div>

        {/* Right Main Panel */}
        <div className="lg:col-span-9 space-y-6">
          {/* Header Banner (Mockup Page 9 Top) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xl shadow-xs">
              AI
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {useCase.sektor}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 uppercase">
                  {useCase.tahapan}
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                {useCase.judul}
              </h1>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {useCase.deskripsiSingkat}
              </p>
            </div>
          </div>

          {/* ================= VIEW 1: DETAILED USE CASE (Page 9) ================= */}
          {mainTab === 'detail' && (
            <div className="space-y-4">
              {/* Phase Sub-Tabs */}
              <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex overflow-x-auto space-x-1 text-xs">
                {[
                  { num: 1, label: 'Konseptualisasi & Perencanaan' },
                  { num: 2, label: 'Pengembangan Data & Model' },
                  { num: 3, label: 'Implementasi & Evaluasi' },
                  { num: 4, label: 'Pengelolaan & Pengembangan Lanjutan' },
                ].map((ph) => (
                  <button
                    key={ph.num}
                    type="button"
                    onClick={() => setActivePhase(ph.num)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      activePhase === ph.num
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {ph.label}
                  </button>
                ))}
              </div>

              {/* Accordions for Phase 1 (Page 9) */}
              {activePhase === 1 && (
                <div className="space-y-3">
                  {/* Accordion 1: Ringkasan Eksekutif & Latar Belakang */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('ringkasan')}
                      className="w-full px-5 py-3.5 bg-slate-50/75 flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
                    >
                      <span>RINGKASAN EKSEKUTIF & LATAR BELAKANG</span>
                      {openAccordions.ringkasan ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {openAccordions.ringkasan && (
                      <div className="p-5 space-y-4 text-xs">
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-1">
                            Ringkasan Eksekutif
                          </h5>
                          <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                            {useCase.fase1.ringkasanEksekutif || 'Tidak ada data'}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-1">
                            Latar Belakang Masalah
                          </h5>
                          <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                            {useCase.fase1.latarBelakang || 'Tidak ada data'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 2: Analisis Permasalahan */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('masalah')}
                      className="w-full px-5 py-3.5 bg-slate-50/75 flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
                    >
                      <span>ANALISIS PERMASALAHAN</span>
                      {openAccordions.masalah ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {openAccordions.masalah && (
                      <div className="p-5 text-xs">
                        <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                          {useCase.fase1.analisisPermasalahan ||
                            'Analisis hambatan mendasar pada sistem eksisting.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 3: Dampak Finansial dan Operasional */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('dampak')}
                      className="w-full px-5 py-3.5 bg-slate-50/75 flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
                    >
                      <span>DAMPAK FINANSIAL DAN OPERASIONAL</span>
                      {openAccordions.dampak ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {openAccordions.dampak && (
                      <div className="p-5 text-xs">
                        <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                          {useCase.fase1.dampakFinansialOperasional ||
                            'Estimasi efisiensi biaya operasional dan kecepatan respon layanan publik.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 4: Value Proposition AI */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('value')}
                      className="w-full px-5 py-3.5 bg-slate-50/75 flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
                    >
                      <span>VALUE PROPOSITION AI</span>
                      {openAccordions.value ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {openAccordions.value && (
                      <div className="p-5 text-xs">
                        <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                          {useCase.fase1.valuePropositionAi ||
                            'Keunggulan akurasi model AI dalam otomatisasi tugas kompleks.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 5: Analisis STDA (Sense, Think, Decide, Act) */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('stda')}
                      className="w-full px-5 py-3.5 bg-slate-50/75 flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
                    >
                      <span>ANALISIS STDA (SENSE, THINK, DECIDE, ACT)</span>
                      {openAccordions.stda ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {openAccordions.stda && (
                      <div className="p-5 text-xs grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                          <span className="font-bold text-blue-800 block mb-1">
                            1. SENSE (Sensor / Pengumpulan Data)
                          </span>
                          <p className="text-slate-700">
                            {useCase.fase1.analisisStda.sense ||
                              'Pengumpulan data input dari faskes / sistem eksternal.'}
                          </p>
                        </div>
                        <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                          <span className="font-bold text-indigo-800 block mb-1">
                            2. THINK (Pengolahan AI & Machine Learning)
                          </span>
                          <p className="text-slate-700">
                            {useCase.fase1.analisisStda.think ||
                              'Model inferensi dan ekstraksi pola prediktif.'}
                          </p>
                        </div>
                        <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg">
                          <span className="font-bold text-amber-800 block mb-1">
                            3. DECIDE (Logika Keputusan)
                          </span>
                          <p className="text-slate-700">
                            {useCase.fase1.analisisStda.decide ||
                              'Penentuan skor ambang batas dan klasifikasi peringatan dini.'}
                          </p>
                        </div>
                        <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                          <span className="font-bold text-emerald-800 block mb-1">
                            4. ACT (Aksi & Intervensi)
                          </span>
                          <p className="text-slate-700">
                            {useCase.fase1.analisisStda.act ||
                              'Notifikasi tindakan respon cepat ke pihak berwenang.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 6: Roadmap & Anggaran */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('roadmap')}
                      className="w-full px-5 py-3.5 bg-slate-50/75 flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
                    >
                      <span>ROADMAP IMPLEMENTASI & ANGGARAN</span>
                      {openAccordions.roadmap ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {openAccordions.roadmap && (
                      <div className="p-5 text-xs space-y-3">
                        <div>
                          <span className="font-semibold text-slate-900 block mb-1">
                            Roadmap:
                          </span>
                          <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                            {useCase.fase1.roadmapImplementasi || 'Jadwal bertahap implementasi.'}
                          </p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block mb-1">
                            Anggaran & Sumber Pendanaan:
                          </span>
                          <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                            {useCase.fase1.anggaranSumberDana || 'APBN / DIPA Instansi.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Phase 2 display */}
              {activePhase === 2 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-slate-900">
                    Spesifikasi Teknis Data & Model AI
                  </h4>
                  <p className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    {useCase.fase2.spesifikasiTeknis}
                  </p>
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-2">Requirement Data:</h5>
                    <div className="border border-slate-200 rounded-lg overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="px-3 py-2">Sumber</th>
                            <th className="px-3 py-2">Format</th>
                            <th className="px-3 py-2">Volume</th>
                            <th className="px-3 py-2">Update</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {useCase.fase2.dataRequirements.map((d) => (
                            <tr key={d.id}>
                              <td className="px-3 py-2 font-medium">{d.sumber}</td>
                              <td className="px-3 py-2 text-slate-500">{d.format}</td>
                              <td className="px-3 py-2 text-slate-500">{d.volume}</td>
                              <td className="px-3 py-2 text-slate-500">{d.update}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Phase 3 & 4 display */}
              {activePhase >= 3 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-slate-900">
                    {activePhase === 3 ? 'Implementasi & Evaluasi' : 'Pengelolaan & Keberlanjutan'}
                  </h4>
                  <p className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    {activePhase === 3
                      ? useCase.fase3.studiKasusSkenario || 'Studi kasus implementasi.'
                      : useCase.fase4.rencanaReplikasiSkalabilitas || 'Rencana replikasi nasional.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= VIEW 2: HALAMAN EVALUASI (Page 10) ================= */}
          {mainTab === 'evaluasi' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Matriks Evaluasi Pokja AI
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Isi penilaian dan catatan kurator untuk setiap indikator kelayakan use case.
                </p>
              </div>

              {/* Evaluation Matrix Form (Mockup Page 10) */}
              <div className="space-y-4">
                {EVALUATION_INDICATORS.map((ind) => {
                  const currentInd = indicators.find((i) => i.indikatorId === ind.id);
                  return (
                    <div
                      key={ind.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2 text-xs"
                    >
                      <label className="block font-bold text-slate-800">
                        {ind.label}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-4">
                          <select
                            value={currentInd?.penilaian || ''}
                            onChange={(e) =>
                              handleIndicatorChange(ind.id, 'penilaian', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                          >
                            <option value="">-- Pilih Penilaian --</option>
                            {ind.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-8">
                          <input
                            type="text"
                            placeholder="Komentar anda pada indikator ini"
                            value={currentInd?.komentar || ''}
                            onChange={(e) =>
                              handleIndicatorChange(ind.id, 'komentar', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rekomendasi Kategori Output & Tagging (Modul 2) */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Rekomendasi Kategori Output Use Case
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {OUTPUT_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id as OutputCategory)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="font-semibold">{cat.label}</div>
                          <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                            {cat.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tagging & Flagging */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Tagging & Flagging Kurator
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {POKJA_FLAGS.map((fl) => {
                      const isFlagged = flags.includes(fl);
                      return (
                        <button
                          key={fl}
                          type="button"
                          onClick={() => handleToggleFlag(fl)}
                          className={`px-3 py-1.5 rounded-full border transition-all flex items-center space-x-1.5 cursor-pointer ${
                            isFlagged
                              ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {isFlagged && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                          <span>{fl}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Catatan Kesimpulan Umum */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Catatan Umum / Rekomendasi Tindak Lanjut Pokja
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan catatan konsolidasi hasil evaluasi pokja untuk pengusul..."
                    value={generalComment}
                    onChange={(e) => setGeneralComment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Keputusan Akhir Status */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      Keputusan Akhir Kurator:
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Tentukan status kelayakan use case setelah proses kurasi selesai.
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDecisionStatus('perlu_revisi');
                        handleSaveEvaluation('perlu_revisi');
                      }}
                      className="px-4 py-2 border border-orange-300 bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Minta Revisi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDecisionStatus('disetujui');
                        handleSaveEvaluation('disetujui');
                      }}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Setujui Use Case</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEvaluation(decisionStatus)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Evaluasi</span>
                    </button>
                  </div>
                </div>

                {/* Note from Mockup Page 10 */}
                <p className="text-[11px] text-slate-400 italic">
                  Note: Item evaluasi disesuaikan sesuai dengan kebutuhan masing-masing pokja.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
