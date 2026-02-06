import { useState } from "react";
import { Dimensions, Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import MaskInput from "react-native-mask-input";

const { width } = Dimensions.get("window");

const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const RenderAccount = () => {
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

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={global.title}>Minha Conta</Text>
      </View>


      <View>
        <TextField
          label="Mude seu nome"
          icon={{ lib: "MaterialIcons", name: "person" }}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          keyboardType="default"
        />

        {/* CPF com título "Seu CPF" */}
        <View style={{ marginBottom: 16 }}>
          <Text style={global.label}>CPF</Text>
          <MaskInput
            value={cpf}
            onChangeText={(masked) => setCpf(masked)}
            mask={CPF_MASK}
            placeholder="123.456.789-00"
            keyboardType="numeric"
            style={styles.maskedInput}
          />
        </View>

        {/* Telefone com título "Seu Telefone" */}
        <View style={{ marginBottom: 16 }}>
          <Text style={global.label}>Telefone</Text>
          <MaskInput
            value={telefone}
            onChangeText={(masked) => setTelefone(masked)}
            mask={PHONE_MASK}
            placeholder="(11) 98765-4321"
            keyboardType="phone-pad"
            style={styles.maskedInput}
          />
        </View>

        <TextField
          label="Mude seu email"
          icon={{ lib: "MaterialIcons", name: "email" }}
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#420350ff",
            alignItems: "center",
            padding: 15,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => {
            console.log({ nome, cpf, telefone, email });
          }}
        >
          <Text style={global.primaryButtonText}>Salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#420350ff",
            alignItems: "center",
            padding: 15,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={global.primaryButtonText}>Alterar senha</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,

            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
              Alterar Senha
            </Text>

            <PasswordField
              label="Senha Atual"
              icon={{ lib: "MaterialIcons", name: "lock" }}
              placeholder="*********"
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              secureTextEntry={true}

            />

            <PasswordField
              label="Nova Senha"
              icon={{ lib: "MaterialIcons", name: "lock" }}
              placeholder="*********"
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry={true}
            />

            <PasswordField
              label="Confirmar Nova Senha"
              icon={{ lib: "MaterialIcons", name: "lock" }}
              placeholder="*********"
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#420350ff",
                alignItems: "center",
                padding: 10,
                borderRadius: 8,
                marginTop: 15,
              }}
              onPress={() => {
                console.log({ senhaAtual, novaSenha, confirmaSenha });
                setModalVisible(false);
              }}
            >
              <Text style={global.primaryButtonText}>Salvar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#420350ff", fontWeight: "bold", textAlign: "center" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AuthContainer>
  );
};

// Estilos para os títulos e inputs com máscara
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#420350ff", // mesma cor usada nos botões
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
});

export default RenderAccount;
