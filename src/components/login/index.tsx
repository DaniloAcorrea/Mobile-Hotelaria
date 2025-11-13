import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";

const RenderLogin = () => {
    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Faça seu login para continuar!"
            icon="hotel">

            {/* children */}    
            <TextField
                label="E-mail"
                icon="email"
                placeholder="user@email.com"
            />

            <PasswordField
                label="Senha"
                placeholder="*********"
            />


        </AuthContainer>
    )
};

export default RenderLogin;