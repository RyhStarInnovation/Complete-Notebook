import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  signInWithGooglePopup,
  signOutDeveloperSession,
} from '../services/firebase';
import { SITE_CONFIG } from '../config/siteConfig';

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  isDeveloperAdmin: boolean;
  showAdminEntry: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInAsDeveloper: () => Promise<boolean>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ADMIN_SESSION_KEY = 'cn_admin_entry_unlocked';

function checkAdminUrlFlag(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const queryAdmin = params.get('admin');
  const hash = window.location.hash.toLowerCase();
  if (queryAdmin === '1' || queryAdmin === 'true' || hash === '#admin') {
    try {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    } catch {
      // Ignore storage restriction
    }
    return true;
  }
  try {
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminUrlUnlocked, setAdminUrlUnlocked] = useState<boolean>(() =>
    checkAdminUrlFlag()
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const syncAdminFlag = () => {
      if (checkAdminUrlFlag()) {
        setAdminUrlUnlocked(true);
        if (window.location.hash.toLowerCase() === '#admin') {
          setTimeout(() => {
            document.getElementById('updates')?.scrollIntoView({ behavior: 'smooth' });
          }, 120);
        }
      }
    };
    syncAdminFlag();
    window.addEventListener('hashchange', syncAdminFlag);
    window.addEventListener('popstate', syncAdminFlag);
    return () => {
      window.removeEventListener('hashchange', syncAdminFlag);
      window.removeEventListener('popstate', syncAdminFlag);
    };
  }, []);

  const isDeveloperAdmin = Boolean(
    user &&
      user.emailVerified &&
      user.email?.toLowerCase() === SITE_CONFIG.developerEmail.toLowerCase()
  );

  const showAdminEntry = Boolean(
    isDeveloperAdmin || adminUrlUnlocked || (user && !isDeveloperAdmin)
  );

  const signInAsDeveloper = async (): Promise<boolean> => {
    setAuthError(null);
    try {
      const signedInUser = await signInWithGooglePopup();
      const matchesAdmin =
        signedInUser.emailVerified &&
        signedInUser.email?.toLowerCase() === SITE_CONFIG.developerEmail.toLowerCase();

      if (!matchesAdmin) {
        setAuthError(
          `Login terdeteksi sebagai ${signedInUser.email ?? 'akun belum terverifikasi'}. Hanya email developer resmi (${SITE_CONFIG.developerEmail}) yang dapat mengelola info update.`
        );
        return false;
      }
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (
        message.includes('popup-closed-by-user') ||
        message.includes('cancelled-popup-request')
      ) {
        return false;
      }
      if (message.includes('auth/unauthorized-domain')) {
        const currentDomain =
          typeof window !== 'undefined' ? window.location.hostname : 'ryhstarinnovation.web.id';
        setAuthError(
          `Domain "${currentDomain}" belum diizinkan di Firebase Authentication. Buka Firebase Console → Authentication → Settings → Authorized domains, lalu tambahkan "${currentDomain}".`
        );
        return false;
      }
      if (message.includes('auth/popup-blocked')) {
        setAuthError(
          'Jendela popup login Google diblokir oleh browser. Izinkan pop-up untuk situs ini di pengaturan ikon gembok/alamat Chrome lalu klik ulang.'
        );
        return false;
      }
      setAuthError(message);
      return false;
    }
  };

  const signOutUser = async () => {
    setAuthError(null);
    await signOutDeveloperSession();
  };

  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isDeveloperAdmin,
        showAdminEntry,
        authError,
        clearAuthError,
        signInAsDeveloper,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
