import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, isAuthorizedAdmin } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        setIsAdmin(isAuthorizedAdmin(currentUser.email));
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!isAuthorizedAdmin(email)) {
      throw new Error("Access Denied: Email address is not on the admin whitelist.");
    }
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    if (!isAuthorizedAdmin(email)) {
      throw new Error("Access Denied: Email address is not on the admin whitelist.");
    }
    return sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
