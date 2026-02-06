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
import { global } from "../ui/styles";

// Tipagem opcional
interface ForgotPasswordScreenProps {
  navigation?: {
    navigate: (screen: string) => void;
  };
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecoverPassword = () => {
    if (!email.trim()) {
      Alert.alert("Erro", "O email é obrigatório");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Erro", "Email inválido");
      return;
    }

    setLoading(true);

    // Simula requisição de recuperação de senha
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Sucesso",
        "Enviamos um link de recuperação para seu email.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
  };

  return (
    <AuthContainer>
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Text style={global.title}>Esqueci minha senha</Text>
        <Text style={styles.subtitle}>
          Informe seu email para recuperar sua senha
        </Text>
      </View>

      {/* Email */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Seu Email</Text>
        
        <TextField
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          label={""}
        />
      </View>

      {/* Botão */}
      <TouchableOpacity
        style={[
          styles.button,
          loading && { opacity: 0.7 },
        ]}
        onPress={handleRecoverPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={global.primaryButtonText}>
            Enviar link de recuperação
          </Text>
        )}
      </TouchableOpacity>

      {/* Voltar */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ alignItems: "center" }}
      >
        <Text style={styles.loginLink}>Voltar para o Login</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#420350ff",
    marginBottom: 6,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#420350ff",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginLink: {
    fontSize: 15,
    color: "#420350ff",
    fontWeight: "500",
  },
});

export default ForgotPasswordScreen;
