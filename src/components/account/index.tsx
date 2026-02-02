import { useState } from "react";
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
const { width } = Dimensions.get("window");


const RenderAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  return (
    <AuthContainer>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={global.title}>Minha Conta</Text>
      </View>

      {/*children */}
      <View>
        <TextField
          label="mude seu nome"
          icon={{ lib: "MaterialIcons", name: "person" }}
          placeholder="mude seu nome"
          keyboardType="default"
        />

        <TextField
          label="CPF"
          icon={{ lib: "MaterialIcons", name: "badge" }}
          placeholder="mude seu CPF"
          keyboardType="numeric"
          
        />

        <TextField
          label="mude seu telefone"
          icon={{ lib: "MaterialIcons", name: "phone" }}
          placeholder="mude seu telefone"
          keyboardType="phone-pad"
          
        />

        <TextField
          label="mude sua email"
          icon={{ lib: "MaterialIcons", name: "email" }}
          placeholder="mude sua email"
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#420350ff",
            alignItems: "center",
            padding: 15,
            borderRadius: 8,
            marginTop: 20,
          }}>
          <Text style={global.primaryButtonText}>
            Salvar alterações
          </Text>
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
          <Text style={global.primaryButtonText}>
            alterar senha
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
          
        <View 
          style={{
            flex: 1,
            justifyContent: "center", 
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)", 
          }}>

          <View 
            style={{
              width: "80%", 
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              // alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Alterar Senha
            </Text>
            {/* Conteúdo do modal para alterar senha */}
            <PasswordField
              label="Senha Atual"
              icon={{ lib: "MaterialIcons", name: "lock" }}
              placeholder="*********"
              keyboardType="default"
              secureTextEntry={true}

            />
            <PasswordField
              label="Nova Senha"
              icon={{ lib: "MaterialIcons", name: "lock" }}
              placeholder="*********"
              keyboardType="default"
            />
            <PasswordField
              label="Confirmar Nova Senha"
              icon={{ lib: "MaterialIcons", name: "lock" }}
              placeholder="*********"
              keyboardType="default"
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
            >
              <Text style={global.primaryButtonText}>Salvar Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 15,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#420350ff", fontWeight: "bold" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
    </AuthContainer>
  );
};
export default RenderAccount;
