import { AuthContainer } from "../ui/AuthContainer";
import { TextField } from "../ui/TextField";

export function RenderLogin() {
    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Faça seu login para continuar!"
            icon="hotel">

            {/* children */}    
            <TextField
                label="E-mail"
                icon="email">
            </TextField>

        </AuthContainer>
    )
}