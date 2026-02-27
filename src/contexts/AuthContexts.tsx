import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextProps = {
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    senha: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Carrega token ao abrir o app
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("token");
        if (stored) setToken(stored);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // 🔹 LOGIN
  async function signIn(email: string, senha: string) {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error("Credenciais inválidas");
      }

      let tokenAPI: string;

      try {
        const data = JSON.parse(text);
        tokenAPI = data.token ?? data;
      } catch {
        tokenAPI = text;
      }

      await AsyncStorage.setItem("token", tokenAPI);
      setToken(tokenAPI);
    } catch (error) {
      console.log("ERRO LOGIN:", error);
      throw error;
    }
  }

  // 🔹 CADASTRO
 async function signUp(
  nome: string,
  cpf: string,
  telefone: string,
  email: string,
  senha: string
) {
  try {
    const res = await fetch(`${API_URL}/cadastro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        cpf: cpf.replace(/\D/g, ""),
        telefone: telefone.replace(/\D/g, ""),
        email,
        senha,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      console.log("STATUS:", res.status);
      console.log("RESPOSTA:", text);
      throw new Error("Erro ao cadastrar");
    }

    let tokenAPI: string;

    try {
      const data = JSON.parse(text);
      tokenAPI = data.token ?? data;
    } catch {
      tokenAPI = text;
    }

    await AsyncStorage.setItem("token", tokenAPI);
    setToken(tokenAPI);

  } catch (error) {
    console.log("ERRO SIGNUP:", error);
    throw error;
  }
}

  // 🔹 LOGOUT
  async function signOut() {
    await AsyncStorage.removeItem("token");
    setToken(null);
  }

  const value = useMemo(
    () => ({
      token,
      isLoading,
      signIn,
      signUp,
      signOut,
    }),
    [token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() deve ser usado dentro de AuthProvider");
  return ctx;
};

export default AuthProvider;