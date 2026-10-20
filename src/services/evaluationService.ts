/**
 * @file evaluationService.ts
 * @description Layanan untuk pengelolaan penilaian kurator/reviewer,
 * matriks evaluasi pokja, flags peringatan, dan penetapan status persetujuan.
 */

import type { UseCaseEvaluation, UseCaseStatus, UseCaseItem } from '../types/index.ts';
import { UseCaseService } from './useCaseService.ts';
import { calculateEvaluationProgress, determineRecommendedCategory } from './rules.ts';

export class EvaluationService {
  /**
   * Menyimpan atau memperbarui hasil evaluasi untuk suatu Use Case
   */
  public static saveEvaluation(
    useCaseId: string,
    evaluationData: Omit<UseCaseEvaluation, 'id' | 'useCaseId' | 'progressEvaluasi' | 'tanggalEvaluasi'> & {
      statusKeputusan?: UseCaseStatus;
    }
  ): UseCaseItem {
    const useCase = UseCaseService.getById(useCaseId);
    if (!useCase) {
      throw new Error(`Use Case dengan ID ${useCaseId} tidak ditemukan.`);
    }

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    const progressStr = calculateEvaluationProgress(evaluationData.indikator, 6);
    const progressWithDate = `${progressStr} (${formattedDate})`;

    const recommendedCat =
      evaluationData.rekomendasiKategori || determineRecommendedCategory(evaluationData.indikator);

    const statusKeputusan = evaluationData.statusKeputusan || useCase.status;

    const completeEvaluation: UseCaseEvaluation = {
      id: useCase.evaluasi?.id || `eval-${Date.now().toString(36)}`,
      useCaseId: useCase.id,
      reviewerId: evaluationData.reviewerId || 'user_reviewer_1',
      reviewerName: evaluationData.reviewerName || 'Budi Santoso, Ph.D.',
      tanggalEvaluasi: formattedDate,
      progressEvaluasi: progressWithDate,
      indikator: evaluationData.indikator,
      rekomendasiKategori: recommendedCat,
      flags: evaluationData.flags || [],
      catatanUmum: evaluationData.catatanUmum || '',
      statusKeputusan: statusKeputusan,
    };

    const updatedUseCase: UseCaseItem = {
      ...useCase,
      status: statusKeputusan,
      progressEvaluasi: progressWithDate,
      evaluasi: completeEvaluation,
    };

    return UseCaseService.save(updatedUseCase);
  }
}
