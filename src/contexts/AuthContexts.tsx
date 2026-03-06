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

  reservar: (
    quarto_id: number,
    dataInicio: string,
    dataFim: string,
    pagamento: string
  ) => Promise<void>;

  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* CARREGAR TOKEN AO ABRIR APP */
  useEffect(() => {
    async function loadToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log("Erro ao carregar token:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadToken();
  }, []);

  /* LOGIN */
  async function signIn(email: string, senha: string) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
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

  /* CADASTRO */
  async function signUp(
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    senha: string
  ) {
    try {
      const response = await fetch(`${API_URL}/login/cadastro`, {
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

      const text = await response.text();

      if (!response.ok) {
        console.log("STATUS:", response.status);
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

  /* RESERVAR (COMPATÍVEL COM SEU BACKEND) */
  async function reservar(
    quarto_id: number,
    dataInicio: string,
    dataFim: string,
    pagamento: string
  ) {
    try {
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const response = await fetch(`${API_URL}/reserva`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pagamento,
          quartos: [
            {
              quarto_id,
              dataInicio,
              dataFim,
            },
          ],
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        console.log("ERRO RESERVA:", text);
        throw new Error("Erro ao realizar reserva");
      }

      console.log("Reserva realizada:", text);

    } catch (error) {
      console.log("ERRO RESERVAR:", error);
      throw error;
    }
  }

  /* LOGOUT */
  async function signOut() {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
    }
  }

  const value = useMemo(
    () => ({
      token,
      isLoading,
      signIn,
      signUp,
      reservar,
      signOut,
    }),
    [token, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* HOOK */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
};

export default AuthProvider;