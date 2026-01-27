import { useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import TextField from "../ui/TextField";
const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  //useState() para gerenciar e alterar os estados
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setqntGuest] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const closeCalendar = () => setCalendar(null);

  return (
    <AuthContainer>
      {/*children */}
      <View style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        {/*Essa View vocês tinham e eu só estilizei*/}
        <View style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          {/*Criei esta nova View para check-in*/}
          {/* Input de checkIn para abrir calendário*/}
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{ width: width * 0.8 }}>
              {" "}
              {/* Nova view para dar largura ao TextField */}
              <TextField
                label="Check-in"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkIn}
              />
            </View>{" "}
            {/* Fecha aqui */}
          </TouchableOpacity>
          {/* <DateSelector /> */}
          {calendar === "checkin" && (
            <DateSelector
              onSelectDate={(date) => {
                setCheckIn(date);
                setCalendar(null);
              }}
            />
          )}
        </View>{" "}
        {/*View de check-in fecha aqui */}
        <View style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          {/*Criei esta nova View para check-out*/}
          {/* Input de checkIn para abrir calendário*/}
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{ width: width * 0.8 }}>
              {" "}
              {/* Nova view para dar largura ao TextField */}
              <TextField
                label="Check-out"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkOut}
              />
            </View>{" "}
            {/* Fecha aqui */}
          </TouchableOpacity>
          {/* <DateSelector /> */}
        
        </View>
        {""}
        {/*View do check-out que fecha aqui */}
      </View>
      {/*View do check-out que fecha aqui */}
      {/*modal*/}
      <Modal
        transparent
        animationType="fade"
        visible={calendar !== null}
        onRequestClose={closeCalendar}
      >
        {/* backdrop: qualquer clique aqui fora, fecha*/}
          <Pressable onPress={closeCalendar}>
            {/* área do calendário que, ao criar, não fecha */}
            <Pressable onPress={() => {}} style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.29)",
              }}>
              {calendar === "checkout" && (
                <DateSelector
                  onSelectDate={(date) => {
                    setCheckOut(date);
                    setCalendar(null);
                  }}
                />
              )}
            </Pressable>
            
          </Pressable>

        </Modal>
      {/*InputSpin*/}
      <View>
        <Text style={styles.label}>Quantidade de hóspedes</Text>

        <InputSpin
          guests={qntGuests}
          onSelectSpin={(gests) => {
            setqntGuest(gests);
          }}
          mainGuests={1}
          step={1}
          maxGuests={6}
          colorMax={"#420350ff"}
          colorMin={"#420350ff"}
        />
      </View>
      <RoomCard
        image={require("../../../assets/images/quarto.jpg")}
        /* image={{uri: "https://"}} */
        label="Apartamento"
        icon={{
          lib: "FontAwesome5",
          name: "bed",
        }}
        description={{
          title: "Descrição do quarto",
          text: "1 cama de casal\n2 camas de solteiro",
          price: 180.9,
        }}
      />
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default RenderExplorer;
