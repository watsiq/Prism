/**
 * @file authService.ts
 * @description Layanan autentikasi, manajemen sesi pengguna, dan kontrol peran (RBAC) PRISMA AI.
 */

import type { UserProfile, UserRole } from '../types/index.ts';
import { INITIAL_USERS } from '../constants/initialData.ts';

const USER_SESSION_KEY = 'prisma_ai_active_user_v1';

export class AuthService {
  /**
   * Mengambil profil pengguna yang saat ini sedang login
   */
  public static getCurrentUser(): UserProfile {
    try {
      const stored = localStorage.getItem(USER_SESSION_KEY);
      if (stored) {
        return JSON.parse(stored) as UserProfile;
      }
    } catch (e) {
      console.warn('Gagal membaca sesi pengguna:', e);
    }
    // Default peran Pengusul sesuai Mockup Halaman 2
    return INITIAL_USERS[0];
  }

  /**
   * Menyimpan pengguna yang login
   */
  public static setCurrentUser(user: UserProfile): void {
    try {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Gagal menyimpan sesi pengguna:', e);
    }
  }

  /**
   * Mengganti peran pengguna secara cepat untuk keperluan pengujian dan demonstrasi prototype
   */
  public static switchRole(role: UserRole): UserProfile {
    const matched = INITIAL_USERS.find((u) => u.role === role) || {
      id: `user_${role}`,
      name: role === 'pengusul' ? 'Dr. Rina Setiawati, M.Kes' : role === 'reviewer' ? 'Budi Santoso, Ph.D.' : 'Pengunjung Publik',
      email: `${role}@prisma.ai.go.id`,
      role: role,
      agency: role === 'pengusul' ? 'Kementerian Kesehatan' : role === 'reviewer' ? 'Pokja AI Nasional' : undefined,
    };
    this.setCurrentUser(matched);
    return matched;
  }

  /**
   * Login dengan email dan password
   */
  public static login(email: string, _password: string, role?: UserRole): UserProfile {
    const existing = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      this.setCurrentUser(existing);
      return existing;
    }
    const newUser: UserProfile = {
      id: `user_${Date.now().toString(36)}`,
      name: email.split('@')[0],
      email: email,
      role: role || 'pengusul',
      agency: 'Instansi Pengusul',
    };
    this.setCurrentUser(newUser);
    return newUser;
  }

  /**
   * Logout dari sistem
   */
  public static logout(): void {
    try {
      localStorage.removeItem(USER_SESSION_KEY);
    } catch (e) {
      console.error('Gagal logout:', e);
    }
  }
}
