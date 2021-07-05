import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import firebase from 'firebase/app';
import { firebaseApp, signInWithFirebaseUsingPopup } from 'services/firebase';

interface AuthState {
  firebaseUser: firebase.User;
}

interface AuthContextData {
  state: AuthState;
  isUserAuthenticated: () => boolean;
  signInWithOAuth(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const clearAuthState = () => {
    firebase.auth().signOut();
    setData({} as AuthState);
  };
  const signInWithOAuth = useCallback(async () => {
    await signInWithFirebaseUsingPopup().catch(err => {
      clearAuthState();
      throw err;
    });
  }, []);

  const isUserAuthenticated = useCallback(() => !!data.firebaseUser, [data]);

  const refreshAuthState = useCallback(
    async (firebaseUser: firebase.User | null) => {
      if (firebaseUser) {
        setData(oldState => ({
          ...oldState,
          firebaseUser,
        }));
      } else {
        clearAuthState();
      }
    },
    [],
  );

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(refreshAuthState);
    firebaseApp.auth().onIdTokenChanged(refreshAuthState);
  }, [refreshAuthState]);

  return (
    <AuthContext.Provider
      value={
        {
          state: {
            ...data,
          },
          isUserAuthenticated,
          signInWithOAuth,
          signOut: clearAuthState,
        } as AuthContextData
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
