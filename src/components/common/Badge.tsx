/**
 * @file Badge.tsx
 * @description Komponen badge status dan kategori sesuai standar desain PRISMA AI.
 */

import React from 'react';
import type { UseCaseStatus, DevelopmentStage, OutputCategory } from '../../types/index.ts';

interface StatusBadgeProps {
  status: UseCaseStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'disetujui':
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white ${className}`}
        >
          Disetujui
        </span>
      );
    case 'diperiksa':
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-400 text-slate-900 ${className}`}
        >
          Diperiksa
        </span>
      );
    case 'perlu_revisi':
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500 text-white ${className}`}
        >
          Perlu Revisi
        </span>
      );
    case 'draft':
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700 ${className}`}
        >
          Draf
        </span>
      );
    case 'ditolak':
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white ${className}`}
        >
          Ditolak
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700 ${className}`}
        >
          {status}
        </span>
      );
  }
};

interface StageBadgeProps {
  stage: DevelopmentStage;
}

export const StageBadge: React.FC<StageBadgeProps> = ({ stage }) => {
  const map: Record<DevelopmentStage, { label: string; bg: string }> = {
    poc: { label: 'Proof of Concept', bg: 'bg-sky-100 text-sky-800' },
    prototype: { label: 'Prototype', bg: 'bg-indigo-100 text-indigo-800' },
    mvp: { label: 'Minimum Viable Product', bg: 'bg-purple-100 text-purple-800' },
    implemented: { label: 'Implemented', bg: 'bg-emerald-100 text-emerald-800' },
  };

  const item = map[stage] || { label: stage, bg: 'bg-slate-100 text-slate-800' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${item.bg}`}>
      {item.label}
    </span>
  );
};

interface CategoryBadgeProps {
  category?: OutputCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  if (!category) return null;

  const map: Record<OutputCategory, { label: string; bg: string }> = {
    quick_win: { label: 'Quick Win', bg: 'bg-emerald-600 text-white' },
    sandbox: { label: 'Sandbox', bg: 'bg-amber-500 text-white' },
    frontier: { label: 'Frontier', bg: 'bg-indigo-600 text-white' },
    tidak_direkomendasikan: { label: 'Tunda', bg: 'bg-slate-500 text-white' },
  };

  const item = map[category] || { label: category, bg: 'bg-slate-500 text-white' };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${item.bg}`}>
      {item.label}
    </span>
  );
};
