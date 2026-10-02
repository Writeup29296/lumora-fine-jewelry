import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_SECRET_CODE = 'LUMORA2026';

const INITIAL_USERS = [
  {
    id: 'usr-admin-01',
    name: 'Lumora Store Director',
    email: 'admin@lumorafinejewelery.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2026-01-15'
  },
  {
    id: 'usr-cust-01',
    name: 'Victoria Sterling',
    email: 'victoria@nyc.com',
    password: 'customer123',
    role: 'customer',
    country: 'United States',
    city: 'New York',
    createdAt: '2026-02-10'
  }
];

export const AuthProvider = ({ children }) => {
  // Users database in localStorage
  const [users, setUsers] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_USERS;
    try {
      const saved = localStorage.getItem('lumora_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Currently logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('lumora_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modal controls
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'signup'
  const [authError, setAuthError] = useState(null);

  // Sync users to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lumora_users', JSON.stringify(users));
      } catch (e) {
        console.error('Failed to save users', e);
      }
    }
  }, [users]);

  // Sync current user to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (currentUser) {
          localStorage.setItem('lumora_current_user', JSON.stringify(currentUser));
        } else {
          localStorage.removeItem('lumora_current_user');
        }
      } catch (e) {
        console.error('Failed to save current user', e);
      }
    }
  }, [currentUser]);

  // Login method
  const login = (email, password) => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!user) {
      setAuthError('Invalid email or password. Please check your credentials.');
      return false;
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country || 'United States'
    };

    setCurrentUser(sessionUser);
    setIsAuthModalOpen(false);
    return true;
  };

  // Sign up method
  const signup = ({ name, email, password, role = 'customer', adminPasskey = '', country = 'United States' }) => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      setAuthError('An account with this email address already exists.');
      return false;
    }

    // If registering as admin, verify passkey
    let finalRole = 'customer';
    if (role === 'admin') {
      if (adminPasskey.trim() !== ADMIN_SECRET_CODE) {
        setAuthError(`Invalid Admin Secret Passkey. (Use demo passkey: ${ADMIN_SECRET_CODE})`);
        return false;
      }
      finalRole = 'admin';
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: finalRole,
      country,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers((prev) => [...prev, newUser]);

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      country: newUser.country
    };

    setCurrentUser(sessionUser);
    setIsAuthModalOpen(false);
    return true;
  };

  // Quick 1-click Demo Logins
  const loginAsDemoAdmin = () => {
    login('admin@lumorafinejewelery.com', 'admin123');
  };

  const loginAsDemoCustomer = () => {
    login('victoria@nyc.com', 'customer123');
  };

  // Logout method
  const logout = () => {
    setCurrentUser(null);
  };

  const openLogin = () => {
    setAuthError(null);
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthError(null);
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthError(null);
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        isLoggedIn: !!currentUser,
        isAuthModalOpen,
        authModalMode,
        authError,
        setAuthModalMode,
        setAuthError,
        login,
        signup,
        logout,
        openLogin,
        openSignup,
        closeAuthModal,
        loginAsDemoAdmin,
        loginAsDemoCustomer,
        adminSecretCode: ADMIN_SECRET_CODE
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
