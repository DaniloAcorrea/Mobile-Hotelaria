import AuthProvider from "@/contexts/AuthContexts";
import { Slot, Stack } from "expo-router";



const RootLayout = () => {
    return(
        <AuthProvider>
            {/* useAuth()*/}
            <Stack screenOptions={{headerShown: false}}/> 
        </AuthProvider>
    );
}

export default RootLayout;