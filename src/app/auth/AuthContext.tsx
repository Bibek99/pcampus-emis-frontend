import { User } from '@app/types/users.types';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@constants/auth';
import { isBrowser } from '@utils/windowType';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated(arg: boolean): void;
  authenticatedUser: User | null;
  updateUser(newUser: object): void;
  updateToken(token: string): void;
  role: string;
  department: string;
  setDepartment: (arg: string) => void;
  setRole(role: string): void;
  logout(): void;
}

const updateToken = (newToken: any) => {
  if (!isBrowser) {
    return () => undefined;
  }

  if (!newToken) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
  }
};

const updateUser = (newUser: any) => {
  if (!isBrowser) {
    return () => undefined;
  }

  if (!newUser) {
    localStorage.removeItem(AUTH_USER_KEY);
  } else {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
  }
};

const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  setIsAuthenticated: () => undefined,
  authenticatedUser: null,
  updateUser: updateUser,
  updateToken: updateToken,
  role: '',
  setRole: () => undefined,
  department: '',
  setDepartment: () => undefined,
  logout: () => undefined,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(
    isBrowser && localStorage.getItem(AUTH_TOKEN_KEY)
  );

  const [authenticatedUser, setAuthenticatedUser] = useState<User>(
    isBrowser && JSON.parse(localStorage.getItem(AUTH_USER_KEY) as any)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token, authenticatedUser, isAuthenticated, setIsAuthenticated]);

  const handleUpdateToken = useCallback(
    (newToken: string) => {
      setToken(newToken);
      updateToken(newToken);
    },
    [setToken]
  );

  const handleUpdateUser = useCallback(
    (newUser: User) => {
      setAuthenticatedUser(newUser);
      updateUser(newUser);
    },
    [setAuthenticatedUser]
  );

  const handleLogOut = useCallback(() => {
    setToken('');
    setAuthenticatedUser({});
    updateUser('');
    updateToken('');
    setRole('');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        authenticatedUser: authenticatedUser,
        updateUser: handleUpdateUser,
        updateToken: handleUpdateToken,
        role: role,
        setRole: setRole,
        department: department,
        setDepartment: setDepartment,
        logout: handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
