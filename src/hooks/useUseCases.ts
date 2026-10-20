/**
 * @file useUseCases.ts
 * @description Custom hook untuk mengelola state Use Case, penyaringan data, dan interaksi CRUD.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { UseCaseItem, FilterState, DevelopmentStage } from '../types/index.ts';
import { UseCaseService } from '../services/useCaseService.ts';
import { filterUseCases } from '../services/rules.ts';

const initialFilterState: FilterState = {
  searchQuery: '',
  sektor: 'Semua Sektor',
  teknologi: 'Semua Teknologi',
  wilayah: 'Semua Wilayah',
  status: 'all',
};

export function useUseCases() {
  const [useCases, setUseCases] = useState<UseCaseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string | null>(null);

  const reloadData = useCallback(() => {
    try {
      setLoading(true);
      const data = UseCaseService.getAll();
      setUseCases(data);
    } catch (error) {
      console.error('Gagal memuat data use case:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const filteredUseCases = useMemo(() => {
    return filterUseCases(useCases, filters);
  }, [useCases, filters]);

  const selectedUseCase = useMemo(() => {
    if (!selectedUseCaseId) return null;
    return useCases.find((item) => item.id === selectedUseCaseId) || null;
  }, [useCases, selectedUseCaseId]);

  const createUseCase = useCallback(
    (
      stage: DevelopmentStage,
      fase1: UseCaseItem['fase1'],
      fase2: UseCaseItem['fase2'],
      fase3: UseCaseItem['fase3'],
      fase4: UseCaseItem['fase4'],
      isDraft = false
    ) => {
      const created = UseCaseService.create(
        stage,
        fase1,
        fase2,
        fase3,
        fase4,
        isDraft ? 'draft' : 'diperiksa'
      );
      reloadData();
      return created;
    },
    [reloadData]
  );

  const updateUseCase = useCallback(
    (item: UseCaseItem) => {
      const updated = UseCaseService.save(item);
      reloadData();
      return updated;
    },
    [reloadData]
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  return {
    useCases,
    filteredUseCases,
    selectedUseCase,
    selectedUseCaseId,
    setSelectedUseCaseId,
    loading,
    filters,
    setFilters,
    resetFilters,
    reloadData,
    createUseCase,
    updateUseCase,
  };
}
