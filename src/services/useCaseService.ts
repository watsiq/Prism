/**
 * @file useCaseService.ts
 * @description Layanan pengelolaan data Use Case (CRUD, penyimpanan draf, filter)
 * Menggunakan pola repository dengan fallback penyimpanan localStorage.
 */

import type { UseCaseItem, DevelopmentStage, UseCaseStatus } from '../types/index.ts';
import { INITIAL_USE_CASES } from '../constants/initialData.ts';

const STORAGE_KEY = 'prisma_ai_use_cases_v1';
const DRAFT_KEY = 'prisma_ai_submission_draft_v1';

export class UseCaseService {
  /**
   * Mengambil semua use case dari penyimpanan lokal atau seed data awal
   */
  public static getAll(): UseCaseItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UseCaseItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      // Simpan seed awal ke localStorage jika kosong
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USE_CASES));
      return INITIAL_USE_CASES;
    } catch (error) {
      console.warn('Gagal membaca storage, menggunakan data in-memory:', error);
      return INITIAL_USE_CASES;
    }
  }

  /**
   * Mengambil satu use case berdasarkan ID
   */
  public static getById(id: string): UseCaseItem | undefined {
    const list = this.getAll();
    return list.find((item) => item.id === id);
  }

  /**
   * Menyimpan atau memperbarui use case
   */
  public static save(item: UseCaseItem): UseCaseItem {
    try {
      const list = this.getAll();
      const index = list.findIndex((x) => x.id === item.id);
      let updatedList: UseCaseItem[];

      if (index >= 0) {
        updatedList = [...list];
        updatedList[index] = item;
      } else {
        updatedList = [item, ...list];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return item;
    } catch (error) {
      console.error('Error saat menyimpan use case:', error);
      throw new Error('Gagal menyimpan use case ke penyimpanan.');
    }
  }

  /**
   * Menambahkan pengajuan use case baru
   */
  public static create(
    stage: DevelopmentStage,
    fase1: UseCaseItem['fase1'],
    fase2: UseCaseItem['fase2'],
    fase3: UseCaseItem['fase3'],
    fase4: UseCaseItem['fase4'],
    status: UseCaseStatus = 'diperiksa'
  ): UseCaseItem {
    const newId = `uc-${Date.now().toString(36)}`;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    const newItem: UseCaseItem = {
      id: newId,
      judul: fase1.judul,
      deskripsiSingkat: fase1.deskripsiSingkat,
      tahapan: stage,
      sektor: fase1.sektor || 'Kesehatan',
      teknologi: ['Machine Learning & Deep Learning'],
      wilayah: 'DKI Jakarta',
      tanggalPengajuan: formattedDate,
      status: status,
      progressEvaluasi: `0/6 (${formattedDate})`,
      pengusulId: 'user_pengusul_1',
      fase1,
      fase2,
      fase3,
      fase4,
    };

    return this.save(newItem);
  }

  /**
   * Menyimpan draft pengajuan yang sedang dikerjakan
   */
  public static saveDraft(draftData: unknown): void {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    } catch (error) {
      console.error('Gagal menyimpan draft:', error);
    }
  }

  /**
   * Mengambil draft pengajuan
   */
  public static getDraft<T>(): T | null {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      return draft ? (JSON.parse(draft) as T) : null;
    } catch (error) {
      console.warn('Gagal membaca draft:', error);
      return null;
    }
  }

  /**
   * Menghapus draft setelah pengajuan berhasil dikirim
   */
  public static clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error('Gagal menghapus draft:', error);
    }
  }
}
