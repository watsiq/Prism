/**
 * @file App.tsx
 * @description Komponen utama aplikasi PRISMA AI (Platform Registrasi, Integrasi, dan Sistem Monitoring AI Nasional).
 * Mengimplementasikan arsitektur bersih dan modul terpisah sesuai dengan spesifikasi dan mockup teknis.
 */

import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth.ts';
import { useUseCases } from './hooks/useUseCases.ts';
import type {
  DevelopmentStage,
  UseCaseItem,
  Phase1Conceptualization,
  Phase2DataAndModel,
  Phase3ImplementationAndEvaluation,
  Phase4GovernanceAndSustainability,
} from './types/index.ts';

import { Sidebar, ActiveNav } from './components/common/Sidebar.tsx';
import { LoginPage } from './components/auth/LoginPage.tsx';
import { SubmissionListPage } from './components/submission/SubmissionListPage.tsx';
import { SubmissionFormWizard } from './components/submission/SubmissionFormWizard.tsx';
import { SubmissionPreview } from './components/submission/SubmissionPreview.tsx';
import { MonitoringDashboard } from './components/dashboard/MonitoringDashboard.tsx';
import { EvaluationListPage } from './components/evaluation/EvaluationListPage.tsx';
import { UseCaseReviewContainer } from './components/evaluation/UseCaseReviewContainer.tsx';
import { DirectoryPage } from './components/directory/DirectoryPage.tsx';
import { GeospatialMapPage } from './components/map/GeospatialMapPage.tsx';
import { FaqPage } from './components/help/FaqPage.tsx';
import { UseCaseService } from './services/useCaseService.ts';

export default function App() {
  const { currentUser, isAuthenticated, switchRole, login, logout } = useAuth();
  const {
    useCases,
    filteredUseCases,
    filters,
    setFilters,
    createUseCase,
    updateUseCase,
  } = useUseCases();

  // Navigation state
  const [activeNav, setActiveNav] = useState<ActiveNav>('pengajuan_use_case');

  // Wizard submission flow states
  const [isWizardActive, setIsWizardActive] = useState<boolean>(false);
  const [wizardStage, setWizardStage] = useState<DevelopmentStage>('prototype');
  const [isPreviewActive, setIsPreviewActive] = useState<boolean>(false);

  // Data wizard sementara saat pengisian form
  const [wizardPayload, setWizardPayload] = useState<{
    fase1?: Phase1Conceptualization;
    fase2?: Phase2DataAndModel;
    fase3?: Phase3ImplementationAndEvaluation;
    fase4?: Phase4GovernanceAndSustainability;
  }>({});

  // Active item for reviewer or detailed view
  const [activeReviewItem, setActiveReviewItem] = useState<UseCaseItem | null>(null);

  // Handler pergantian peran cepat
  const handleRoleChange = (role: typeof currentUser.role) => {
    switchRole(role);
    if (role === 'reviewer') {
      setActiveNav('evaluasi_use_case');
    } else if (role === 'pengusul') {
      setActiveNav('pengajuan_use_case');
    } else {
      setActiveNav('direktori_use_case');
    }
    setIsWizardActive(false);
    setIsPreviewActive(false);
    setActiveReviewItem(null);
  };

  // Handler mulai form pengajuan baru dari modal tahapan
  const handleStartNewSubmission = (stage: DevelopmentStage) => {
    setWizardStage(stage);
    setIsWizardActive(true);
    setIsPreviewActive(false);
    setActiveNav('pengajuan_use_case');
  };

  // Handler simpan draf ke localStorage
  const handleSaveDraft = (data: unknown) => {
    UseCaseService.saveDraft(data);
  };

  // Handler maju ke preview (Step 5)
  const handleProceedToPreview = (
    stage: DevelopmentStage,
    fase1: Phase1Conceptualization,
    fase2: Phase2DataAndModel,
    fase3: Phase3ImplementationAndEvaluation,
    fase4: Phase4GovernanceAndSustainability
  ) => {
    setWizardStage(stage);
    setWizardPayload({ fase1, fase2, fase3, fase4 });
    setIsPreviewActive(true);
  };

  // Handler submit final use case
  const handleSubmitFinal = () => {
    if (
      wizardPayload.fase1 &&
      wizardPayload.fase2 &&
      wizardPayload.fase3 &&
      wizardPayload.fase4
    ) {
      createUseCase(
        wizardStage,
        wizardPayload.fase1,
        wizardPayload.fase2,
        wizardPayload.fase3,
        wizardPayload.fase4,
        false
      );
      UseCaseService.clearDraft();
      setIsWizardActive(false);
      setIsPreviewActive(false);
      setActiveNav('pengajuan_use_case');
    }
  };

  // Jika belum login, tampilkan Mockup Halaman 1 (LoginPage)
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLoginSuccess={(email, pass, role) => {
          login(email, pass, role);
          if (role === 'reviewer') {
            setActiveNav('evaluasi_use_case');
          } else if (role === 'public') {
            setActiveNav('direktori_use_case');
          } else {
            setActiveNav('pengajuan_use_case');
          }
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigasi */}
      <Sidebar
        activeNav={activeNav}
        onNavigate={(nav) => {
          setActiveNav(nav);
          setIsWizardActive(false);
          setIsPreviewActive(false);
          setActiveReviewItem(null);
        }}
        currentUser={currentUser}
        onSwitchRole={handleRoleChange}
        onLogout={logout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <main className="flex-1 overflow-y-auto">
          {/* ================= VIEW 1: PENGAJUAN USE CASE (PENGUSUL) ================= */}
          {activeNav === 'pengajuan_use_case' && (
            <>
              {isPreviewActive && wizardPayload.fase1 ? (
                <SubmissionPreview
                  stage={wizardStage}
                  fase1={wizardPayload.fase1}
                  fase2={
                    wizardPayload.fase2 || {
                      spesifikasiTeknis: '',
                      dataRequirements: [],
                      infrastrukturPendukung: {
                        serverLokal: false,
                        gpuKhusus: false,
                        komputasiAwan: true,
                        router: false,
                        lainnya: false,
                      },
                      analyticsModels: [],
                      analisisRisikoTeknologi: '',
                    }
                  }
                  fase3={
                    wizardPayload.fase3 || {
                      rencanaAksi: [],
                      studiKasusSkenario: '',
                      analisisRisikoImplementasi: '',
                      strategiMitigasi: '',
                    }
                  }
                  fase4={
                    wizardPayload.fase4 || {
                      rencanaReplikasiSkalabilitas: '',
                      siklusPemeliharaanModel: '',
                      potensiReuseKemitraan: '',
                      kepatuhanHukumEtika: '',
                      keterkaitanRpjm: '',
                    }
                  }
                  onEditSection={(_step) => setIsPreviewActive(false)}
                  onSubmitFinal={handleSubmitFinal}
                  onSaveDraft={() => handleSaveDraft(wizardPayload)}
                />
              ) : isWizardActive ? (
                <SubmissionFormWizard
                  initialStage={wizardStage}
                  initialData={wizardPayload}
                  onSaveDraft={handleSaveDraft}
                  onProceedToPreview={handleProceedToPreview}
                  onCancel={() => setIsWizardActive(false)}
                />
              ) : (
                <SubmissionListPage
                  useCases={filteredUseCases}
                  filters={filters}
                  onFilterChange={setFilters}
                  onStartNewSubmission={handleStartNewSubmission}
                  onSelectUseCase={(item) => {
                    setActiveReviewItem(item);
                    setActiveNav('evaluasi_use_case');
                  }}
                />
              )}
            </>
          )}

          {/* ================= VIEW 2: DAFTAR PENGAJUAN ================= */}
          {activeNav === 'daftar_pengajuan' && (
            <SubmissionListPage
              useCases={filteredUseCases}
              filters={filters}
              onFilterChange={setFilters}
              onStartNewSubmission={handleStartNewSubmission}
              onSelectUseCase={(item) => {
                setActiveReviewItem(item);
                setActiveNav('evaluasi_use_case');
              }}
            />
          )}

          {/* ================= VIEW 3: DASHBOARD MONITORING (PAGE 7) ================= */}
          {activeNav === 'dashboard_monitoring' && <MonitoringDashboard />}

          {/* ================= VIEW 4: EVALUASI USE CASE (REVIEWER - PAGE 8, 9, 10) ================= */}
          {activeNav === 'evaluasi_use_case' && (
            <>
              {activeReviewItem ? (
                <UseCaseReviewContainer
                  useCase={activeReviewItem}
                  onBack={() => setActiveReviewItem(null)}
                  onEvaluationUpdated={(updated) => {
                    updateUseCase(updated);
                    setActiveReviewItem(updated);
                  }}
                />
              ) : (
                <EvaluationListPage
                  useCases={filteredUseCases}
                  filters={filters}
                  onFilterChange={setFilters}
                  onSelectUseCaseForEvaluation={(item) => setActiveReviewItem(item)}
                />
              )}
            </>
          )}

          {/* ================= VIEW 5: DIREKTORI USE CASE (PAGE 11) ================= */}
          {activeNav === 'direktori_use_case' && (
            <DirectoryPage
              useCases={useCases}
              filters={filters}
              onFilterChange={setFilters}
            />
          )}

          {/* ================= VIEW 6: PETA INTERAKTIF NASIONAL ================= */}
          {activeNav === 'peta_interaktif' && (
            <GeospatialMapPage
              useCases={useCases}
              onSelectUseCase={(item) => {
                setActiveReviewItem(item);
                setActiveNav('evaluasi_use_case');
              }}
            />
          )}

          {/* ================= VIEW 7: FAQ & BANTUAN ================= */}
          {activeNav === 'faq_bantuan' && <FaqPage />}
        </main>
      </div>
    </div>
  );
}
