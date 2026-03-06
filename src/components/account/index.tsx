import { useState } from "react";
import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import MaskInput from "react-native-mask-input";
import { useAuth } from "@/contexts/AuthContexts";
import { router } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const RenderAccount = () => {
  const { signOut } = useAuth();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  return (
    <AuthContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* HEADER COM AVATAR */}
          <View style={styles.header}>
            <View style={styles.avatarCircle}>
              <FontAwesome5 name="user-alt" size={40} color="#fff" />
              <TouchableOpacity style={styles.editAvatarBadge}>
                <MaterialIcons name="edit" size={16} color="#420350" />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Minha Conta</Text>
            <Text style={styles.subtitleText}>Gerencie suas informações pessoais</Text>
          </View>

          {/* FORMULÁRIO DE DADOS */}
          <View style={styles.formCard}>
            <TextField
              label="Nome Completo"
              icon={{ lib: "MaterialIcons", name: "person" }}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
            />

            <View style={styles.inputGap}>
              <Text style={styles.customLabel}>CPF</Text>
              <View style={styles.maskedInputContainer}>
                <MaterialIcons name="featured-video" size={20} color="#420350" style={styles.inputIcon} />
                <MaskInput
                  value={cpf}
                  onChangeText={(masked) => setCpf(masked)}
                  mask={CPF_MASK}
                  placeholder="000.000.000-00"
                  keyboardType="numeric"
                  style={styles.maskedInput}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.inputGap}>
              <Text style={styles.customLabel}>Telefone</Text>
              <View style={styles.maskedInputContainer}>
                <MaterialIcons name="phone" size={20} color="#420350" style={styles.inputIcon} />
                <MaskInput
                  value={telefone}
                  onChangeText={(masked) => setTelefone(masked)}
                  mask={PHONE_MASK}
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  style={styles.maskedInput}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <TextField
              label="E-mail"
              icon={{ lib: "MaterialIcons", name: "email" }}
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* BOTÕES DE AÇÃO PRINCIPAIS */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => console.log({ nome, cpf, telefone, email })}
            >
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.passwordButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="lock-open" size={20} color="#420350" style={{marginRight: 8}} />
              <Text style={styles.passwordButtonText}>Alterar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                await signOut();
                router.replace("/(auth)");
              }}
            >
              <MaterialIcons name="exit-to-app" size={20} color="#B00020" style={{marginRight: 8}} />
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL ALTERAR SENHA */}
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alterar Senha</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <PasswordField
              label="Senha Atual"
              icon={{ lib: "MaterialIcons", name: "lock-outline" }}
              placeholder="*********"
              value={senhaAtual}
              onChangeText={setSenhaAtual}
            />

            <PasswordField
              label="Nova Senha"
              icon={{ lib: "MaterialIcons", name: "vpn-key" }}
              placeholder="*********"
              value={novaSenha}
              onChangeText={setNovaSenha}
            />

            <PasswordField
              label="Confirmar Nova Senha"
              icon={{ lib: "MaterialIcons", name: "check-circle-outline" }}
              placeholder="*********"
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
            />

            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={() => {
                console.log({ senhaAtual, novaSenha, confirmaSenha });
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalSaveButtonText}>Confirmar Nova Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#420350",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 10,
    shadowColor: "#420350",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  editAvatarBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitleText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    marginBottom: 20,
  },
  inputGap: {
    marginBottom: 16,
  },
  customLabel: {
    fontSize: 14,
    color: "#420350",
    marginBottom: 8,
    fontWeight: "bold",
  },
  maskedInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },
  inputIcon: {
    marginRight: 10,
  },
  maskedInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  actionSection: {
    gap: 12,
  },
  saveButton: {
    backgroundColor: "#420350",
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordButton: {
    flexDirection: "row",
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#420350",
  },
  passwordButtonText: {
    color: "#420350",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#B00020",
    fontSize: 16,
    fontWeight: "600",
  },
  // ESTILOS MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  modalSaveButton: {
    backgroundColor: "#420350",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalSaveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalCancelButton: {
    marginTop: 15,
    padding: 10,
  },
  modalCancelButtonText: {
    color: "#777",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default RenderAccount;