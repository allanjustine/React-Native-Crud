import api from "@/lib/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: any;
  isLoading: boolean;
  logout: () => void;
  login: (credentials: LoginCredentials) => Promise<any>;
  fetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchUser() {
    const token = await SecureStore.getItemAsync("token");

    if (!token) return;

    try {
      const response = await api.get("/profile");

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function login(credentails: LoginCredentials) {
    const response = await api.post("/login", credentails);

    if (response.status === 200) {
      setUser(response.data.user);
      await SecureStore.setItemAsync("token", response?.data?.token);
    }

    return response;
  }

  async function logout() {
    const response = await api.post("/logout");

    if (response.status === 200) {
      setUser(null);
      await SecureStore.deleteItemAsync("token");
    }

    return response;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, login, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
