import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { global } from "./styles";

type NameIcon =
  | { lib: "MaterialIcons"; name: keyof typeof MaterialIcons.glyphMap }
  | { lib: "FontAwesome6"; name: keyof typeof FontAwesome6.glyphMap }
  | { lib: "FontAwesome5"; name: keyof typeof FontAwesome5.glyphMap };

type Infos = { title?: string; text: string; price: number };

type Props = {
  //image?:
  label?: string;
  description?: Infos;
  icon?: NameIcon;
};

const { width, height } = Dimensions.get("window");
const RoomCard = ({ label, description, icon }: Props) => {
  return (
    <View style={global.content}>
      <View>{/* imagem */}</View>
      <View>
        {!!label && <Text style={global.title}>{label}</Text>}
        <View style={styles.container}>
          <View>
            {!!icon && (
              <View>
                {icon.lib === "MaterialIcons" && (
                  <MaterialIcons name={icon.name} size={23} color="purple" />
                )}
                {icon.lib === "FontAwesome5" && (
                  <FontAwesome5 name={icon.name} size={23} color="purple" />
                )}
                {icon.lib === "FontAwesome6" && (
                  <FontAwesome6 name={icon.name} size={23} color="purple" />
                )}
              </View>
            )}
            {!!description && (
              <View style={styles.description}>
                <View>
                  {!!description.title && (
                    <Text style={global.label}>{description.title}</Text>
                  )}
                  <Text>{description.text}</Text>
                </View>
                <View>
                  <Text>R$ {description.price}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.03,
    backgroundColor: "#f3e6ffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  description: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default RoomCard;
