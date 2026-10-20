/**
 * @file FaqPage.tsx
 * @description Halaman FAQ & Bantuan teknis panduan penggunaan platform PRISMA AI.
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, CheckCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Apa itu platform PRISMA AI?',
      answer:
        'PRISMA AI adalah Platform Registrasi, Integrasi, dan Sistem Monitoring AI Nasional yang mengoordinasikan pendaftaran, kurasi, evaluasi pokja, serta pemetaan use case kecerdasan artifisial di seluruh instansi pemerintah, BUMN, dan mitra periset di Indonesia.',
    },
    {
      question: 'Bagaimana alur pengajuan use case baru?',
      answer:
        'Pengusul (K/L atau institusi) terlebih dahulu memilih tahap pengembangan AI (Proof of Concept, Prototype, Minimum Viable Product, atau Implemented), kemudian mengisi 4 fase formulir: Fase 1 (Konseptualisasi & Perencanaan), Fase 2 (Pengembangan Data & Model), Fase 3 (Implementasi & Evaluasi), dan Fase 4 (Pengelolaan & Keberlanjutan). Data dapat disimpan sebagai draf atau langsung dikirimkan ke antrean kurator.',
    },
    {
      question: 'Apa saja 7 pilar penilaian Pokja AI?',
      answer:
        '7 pilar kerangka kerja pokja meliputi: (1) Kebijakan dan Regulasi, (2) Etika, (3) Talenta, (4) Infrastruktur dan Data, (5) Riset dan Inovasi, (6) Investasi dan Pembiayaan, serta (7) Masyarakat Sipil.',
    },
    {
      question: 'Apa arti rekomendasi kategori Quick Win, Sandbox, dan Frontier?',
      answer:
        'Quick Win diberikan pada solusi AI yang berdaya guna cepat dengan kesiapan teknologi tinggi (TRL 7-9) dan risiko rendah; Sandbox ditujukan bagi use case yang membutuhkan pengujian terbatas dalam ruang uji regulasi; sedangkan Frontier diperuntukkan bagi inovasi riset terdepan.',
    },
    {
      question: 'Siapa saja yang dapat mengakses Direktori Use Case Terbuka?',
      answer:
        'Direktori use case terbuka dapat diakses oleh publik, akademisi, pengembang industri, maupun jajaran kementerian/lembaga untuk transparansi, pertukaran pengetahuan, dan replikasi solusi unggulan.',
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          FAQ & Panduan Bantuan PRISMA AI
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Panduan teknis pengisian 4 fase, mekanisme evaluasi kurator, dan tata kelola AI nasional.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
