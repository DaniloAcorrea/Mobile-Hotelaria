import { View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";

const RenderExplorer = () => {
  return (
    <AuthContainer>
        {/*children */}
            <View>
                <DateSelector />
            </View>
    </AuthContainer>
  );
};
export default RenderExplorer;
