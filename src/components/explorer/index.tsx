import { Text, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";

const RenderExplorer = () => {
  return (
    <AuthContainer>
        {/*children */}
            <View>
                <Text>Esta será a futura tela home</Text>
            </View>
    </AuthContainer>
  );
};
export default RenderExplorer;
