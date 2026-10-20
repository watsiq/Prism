/**
 * @file SubmissionPreview.tsx
 * @description Halaman Preview Pengajuan Use Case sesuai Mockup Halaman 6.
 */

import React, { useState } from 'react';
import { ArrowLeft, Send, Save, Edit3, CheckCircle2 } from 'lucide-react';
import type {
  DevelopmentStage,
  Phase1Conceptualization,
  Phase2DataAndModel,
  Phase3ImplementationAndEvaluation,
  Phase4GovernanceAndSustainability,
} from '../../types/index.ts';

interface SubmissionPreviewProps {
  stage: DevelopmentStage;
  fase1: Phase1Conceptualization;
  fase2: Phase2DataAndModel;
  fase3: Phase3ImplementationAndEvaluation;
  fase4: Phase4GovernanceAndSustainability;
  onEditSection: (stepNumber: number) => void;
  onSubmitFinal: () => void;
  onSaveDraft: () => void;
}

export const SubmissionPreview: React.FC<SubmissionPreviewProps> = ({
  stage,
  fase1,
  fase2,
  fase3,
  fase4,
  onEditSection,
  onSubmitFinal,
  onSaveDraft,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [submittedModal, setSubmittedModal] = useState<boolean>(false);

  const steps = [
    { num: 1, title: 'Konseptualisasi & Perencanaan' },
    { num: 2, title: 'Pengembangan Data & Model' },
    { num: 3, title: 'Implementasi & Evaluasi' },
    { num: 4, title: 'Pengelolaan & Pengembangan Lanjutan' },
    { num: 5, title: 'Preview' },
  ];

  const handleFinalSubmit = () => {
    onSubmitFinal();
    setSubmittedModal(true);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Form Pengajuan Use Case
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Tahap 5: Tinjau dan konfirmasi seluruh data sebelum pengajuan final ke kurator.
        </p>
      </div>

      {/* Stepper (Step 5 Active) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
          {steps.map((st) => {
            const isPreviewStep = st.num === 5;
            return (
              <div
                key={st.num}
                className={`p-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                  isPreviewStep
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'text-slate-600 font-medium'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 font-bold ${
                    isPreviewStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {isPreviewStep ? '5' : '✓'}
                </div>
                <span className="text-[11px] leading-tight line-clamp-2">
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Graphic Hero Banner (Mockup Page 6) */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm relative">
        <div className="p-8 md:p-10 bg-gradient-to-r from-blue-900/90 to-slate-900 text-white flex flex-col justify-end min-h-[180px]">
          <div className="inline-block px-3 py-1 rounded bg-blue-500/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/20 w-fit">
            Tahap: {stage.toUpperCase()} | Sektor: {fase1.sektor}
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight max-w-2xl">
            {fase1.judul || 'Judul Use Case Belum Dituliskan'}
          </h1>
          <p className="text-xs text-slate-300 mt-2 max-w-2xl line-clamp-2 leading-relaxed">
            {fase1.deskripsiSingkat}
          </p>
        </div>
      </div>

      {/* Phase Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 flex overflow-x-auto space-x-1 text-xs">
        {[
          { num: 1, label: 'Konseptualisasi & Perencanaan' },
          { num: 2, label: 'Pengembangan Data & Model' },
          { num: 3, label: 'Implementasi & Evaluasi' },
          { num: 4, label: 'Pengelolaan & Pengembangan Lanjutan' },
        ].map((tab) => (
          <button
            key={tab.num}
            type="button"
            onClick={() => setActiveTab(tab.num)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.num
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content for Selected Phase */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {/* TAB 1 */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Identitas dan Kontak Pengusul
              </h3>
              <button
                type="button"
                onClick={() => onEditSection(1)}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Nama Pengusul:</span>
                <span className="font-semibold text-slate-800">{fase1.namaPengusul}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Instansi & Unit Kerja:</span>
                <span className="font-semibold text-slate-800">
                  {fase1.instansi} - {fase1.unitKerja}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Kontak (Email / No HP / PIC):</span>
                <span className="font-semibold text-slate-800">
                  {fase1.email} | {fase1.noHp} | PIC: {fase1.pic}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Alamat:</span>
                <span className="font-semibold text-slate-800">{fase1.alamat}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Ringkasan Eksekutif:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase1.ringkasanEksekutif || '-'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Latar Belakang:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase1.latarBelakang || '-'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Value Proposition AI:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase1.valuePropositionAi || '-'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Spesifikasi Teknis Data & Model
              </h3>
              <button
                type="button"
                onClick={() => onEditSection(2)}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div>
                <span className="text-slate-400 block font-medium">Spesifikasi Teknis:</span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase2.spesifikasiTeknis || '-'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Data Requirements:</span>
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
                      {fase2.dataRequirements.map((d) => (
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

              <div>
                <span className="text-slate-400 block font-medium mb-1">Teknik Model AI:</span>
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Teknik Model</th>
                        <th className="px-3 py-2">Output</th>
                        <th className="px-3 py-2">Variabel Kunci</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fase2.analyticsModels.map((m) => (
                        <tr key={m.id}>
                          <td className="px-3 py-2 font-medium">{m.teknikModel}</td>
                          <td className="px-3 py-2 text-slate-500">{m.output}</td>
                          <td className="px-3 py-2 text-slate-500">{m.variabelKunci}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Rencana Implementasi & Evaluasi
              </h3>
              <button
                type="button"
                onClick={() => onEditSection(3)}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
            </div>

            <div className="text-xs space-y-4">
              <div>
                <span className="text-slate-400 block font-medium mb-1">Rencana Aksi:</span>
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Aktivitas</th>
                        <th className="px-3 py-2">Pelaksana</th>
                        <th className="px-3 py-2">Durasi</th>
                        <th className="px-3 py-2">Output</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fase3.rencanaAksi.map((ra) => (
                        <tr key={ra.id}>
                          <td className="px-3 py-2 font-medium">{ra.aktivitas}</td>
                          <td className="px-3 py-2 text-slate-500">{ra.pelaksana}</td>
                          <td className="px-3 py-2 text-slate-500">{ra.durasi}</td>
                          <td className="px-3 py-2 text-slate-500">{ra.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Skenario Kasus Penerapan Nyata:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase3.studiKasusSkenario || '-'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Strategi Mitigasi Risiko:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase3.strategiMitigasi || '-'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Pengelolaan & Keberlanjutan Jangka Panjang
              </h3>
              <button
                type="button"
                onClick={() => onEditSection(4)}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
            </div>

            <div className="text-xs space-y-4">
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Rencana Replikasi & Skalabilitas:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase4.rencanaReplikasiSkalabilitas || '-'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Kepatuhan Hukum & Etika AI:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase4.kepatuhanHukumEtika || '-'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Keterkaitan RPJMN / Stranas AI:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {fase4.keterkaitanRpjm || '-'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => onEditSection(4)}
          className="flex items-center space-x-1.5 px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Form</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onSaveDraft}
            className="flex items-center space-x-1.5 px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Draft</span>
          </button>
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="flex items-center space-x-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Pengajuan</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Pengajuan Berhasil Dikirimkan!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use Case <span className="font-semibold">{fase1.judul}</span> telah masuk ke dalam antrean evaluasi Reviewer / Kurator Sektoral PRISMA AI dengan status <span className="font-semibold text-amber-600">Diperiksa</span>.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedModal(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
            >
              Kembali ke Daftar Pengajuan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
