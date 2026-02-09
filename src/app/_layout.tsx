import AuthProvider from "@/contexts/AuthContexts";
import { Header, HeaderHeightContext, HeaderShownContext } from "@react-navigation/elements";
import { Slot, Stack } from "expo-router";



const RootLayout = () => {
    return(
        <AuthProvider>
            <Stack screenOptions={headerShown: false}/>
        </AuthProvider>
    )
}

export default RootLayout;