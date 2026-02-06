import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import MaskInput from "react-native-mask-input";
import { global } from "../ui/styles";

// Tipagem opcional para navigation (evita erros TS)
interface RegisterScreenProps {
  navigation?: {
    navigate: (screen: string) => void;
    // adicione outras funções se precisar: goBack, etc.
  };
}
// Máscaras
const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = () => {
    // Validações básicas
    if (!nome.trim()) {
      Alert.alert("Erro", "O nome é obrigatório");
      return;
    }
    if (cpf.length !== 14) { // 123.456.789-00 = 14 caracteres
      Alert.alert("Erro", "CPF inválido");
      return;
    }
    if (telefone.length < 14) { // (11) 98765-4321 = 15 caracteres
      Alert.alert("Erro", "Telefone inválido");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Erro", "Email inválido");
      return;
    }
    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    setLoading(true);

    // Simula requisição de cadastro
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Sucesso",
        "Cadastro realizado com sucesso!",
        [
          { text: "OK", onPress: () => router.replace("/(tabs)/explorer") }
        ]
      );
    }, 1500);

  
  };

  return (
    <AuthContainer>
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Text style={global.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>
      </View>

      <View style={{ marginBottom: 24 }}>
        {/* Nome */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Seu Nome</Text>
          <TextField
            placeholder="Digite seu nome completo"
            value={nome}
            onChangeText={setNome}
            keyboardType="default" label={""}          />
        </View>

        {/* CPF */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Seu CPF</Text>
          <MaskInput
            value={cpf}
            onChangeText={(masked) => setCpf(masked)}
            mask={CPF_MASK}
            placeholder="123.456.789-00"
            keyboardType="numeric"
            style={styles.maskedInput}
          />
        </View>

        {/* Telefone */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Seu Telefone</Text>
          <MaskInput
            value={telefone}
            onChangeText={(masked) => setTelefone(masked)}
            mask={PHONE_MASK}
            placeholder="(11) 98765-4321"
            keyboardType="phone-pad"
            style={styles.maskedInput}
          />
        </View>

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Seu Email</Text>
          <TextField
            placeholder="seuemail@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none" label={""}          />
        </View>

        {/* Senha */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Senha</Text>
          <PasswordField
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true} label={""}          />
        </View>

        {/* Confirmar Senha */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <PasswordField
            placeholder="Digite novamente a senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true} label={""}          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          {
            backgroundColor: "#420350ff",
            alignItems: "center",
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
          },
          loading && { opacity: 0.7 },
        ]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={global.primaryButtonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation?.navigate("Login")}
        style={{ alignItems: "center" }}
      >
         <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.loginLink}>
            Já possui uma conta? <Text style={{ fontWeight: "600" }}>Login</Text>
          </Text>
            
          </TouchableOpacity>
       
      </TouchableOpacity>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#420350ff",
    marginBottom: 6,
    fontWeight: "500",
  },
  maskedInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  loginLink: {
    fontSize: 15,
    color: "#420350ff",
  },
});

export default RegisterScreen;