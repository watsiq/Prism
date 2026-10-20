/**
 * @file useAuth.ts
 * @description Custom hook untuk mengelola autentikasi dan peran aktif di aplikasi.
 */

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile, UserRole } from '../types/index.ts';
import { AuthService } from '../services/authService.ts';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const updated = AuthService.switchRole(role);
    setCurrentUser(updated);
    setIsAuthenticated(true);
  }, []);

  const login = useCallback((email: string, pass: string, role?: UserRole) => {
    const user = AuthService.login(email, pass, role);
    setCurrentUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setIsAuthenticated(false);
  }, []);

  return {
    currentUser,
    isAuthenticated,
    switchRole,
    login,
    logout,
  };
}
