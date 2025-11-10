import { Slot } from "expo-router";

export default function RootLayout() {
    {/* Slot atribui ao fluxo de navegação "child" o papel de definir como as telas navegarão
        entre si (ex.: /(auth) ou /(tabs), sem impor uma forma de navegação no nível raiz */}
        return <Slot/>
}