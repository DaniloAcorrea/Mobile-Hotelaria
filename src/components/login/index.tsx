import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

const RenderLogin = () => {
    const router = useRouter();

    const { width, height } = Dimensions.get("window");
    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Faça seu login para continuar!"
            icon="hotel">

            {/* children */}    
            <TextField
                label="E-mail"
                icon={{lib: "MaterialIcons", name: "email"}}
                placeholder="user@email.com"
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                icon={{lib: "MaterialIcons", name: "lock"}}
                placeholder="*********"
            />
        <TouchableOpacity style={[global.primaryButton]}>
            <Text style={global.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center", marginTop: height * 0.03}}>
            <TouchableOpacity onPress={() => router.push("/(auth)/resetPassword")}>
                <Text style={{color: "#420350ff", fontSize: 17, fontWeight: 600}}>Esqueci minha senha</Text>
            </TouchableOpacity>
            <View style={{backgroundColor: "#7c8390ff", width: width * 0.5, height: height * 0.001,
                borderRadius: 10, marginTop: height * 0.03}}></View>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}style={{ marginTop: height * 0.03}}>
                <Text style={{color: "#1f1e1eff", fontWeight: 600, fontSize: 17}}>Não possui uma conta?
                    Cadastre-se agora!
                </Text>
            </TouchableOpacity>
        </View>
        </AuthContainer>
    )};
export default RenderLogin;