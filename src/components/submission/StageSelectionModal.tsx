/**
 * @file StageSelectionModal.tsx
 * @description Modal Pemilihan Tahapan AI Use Case sesuai Mockup Halaman 3.
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { DevelopmentStage } from '../../types/index.ts';
import { STAGE_OPTIONS } from '../../constants/options.ts';

interface StageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage: (stage: DevelopmentStage) => void;
}

export const StageSelectionModal: React.FC<StageSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectStage,
}) => {
  const [selected, setSelected] = useState<DevelopmentStage>('prototype');

  if (!isOpen) return null;

  const handleProceed = () => {
    onSelectStage(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Pilih Tahapan Pengembangan AI Use Case
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xl">
              Silakan pilih tahap pengembangan yang paling sesuai dengan kondisi use case AI Anda saat ini.
              Pemilihan tahap ini akan membantu menyesuaikan proses evaluasi dan dukungan yang tepat.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {STAGE_OPTIONS.map((item) => {
            const isChosen = selected === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelected(item.id as DevelopmentStage)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isChosen
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-slate-900">
                    {item.title}
                  </h3>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isChosen ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}
                  >
                    {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="px-6 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};
