import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import InputSpin from "../ui/InputSpin";

import TextField from "../ui/TextField";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

/* =========================
   ROOM CARD
========================= */
const RoomCard = ({ room, onPress }: any) => {
  return (
    <View style={styles.roomCard}>
      <Image source={room.image} style={styles.roomImage} />

      <View style={styles.roomInfo}>
        <View style={styles.roomHeader}>
          <FontAwesome5 name="bed" size={16} color="#420350ff" />
          <Text style={styles.roomLabel}>{room.label}</Text>
        </View>

        <Text style={styles.roomDesc}>{room.description}</Text>

        <View style={styles.roomFooter}>
          <Text style={styles.roomPrice}>
            R$ {room.price.toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.verMaisButton}
            onPress={onPress}
          >
            <Text style={styles.verMaisText}>Ver mais</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/* =========================
   MAIN COMPONENT
========================= */
const RenderExplorer = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState(1);
  const [calendar, setCalendar] =
    useState<"checkin" | "checkout" | null>(null);

  const [roomModal, setRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const closeCalendar = () => setCalendar(null);

  const roomExample = {
    id: "apto-001", // 🔑 ID FIXO DO QUARTO
    label: "Apartamento",
    description: "1 cama de casal\n2 camas de solteiro",
    price: 180.9,
    image: require("../../../assets/images/quarto.jpg"),
  };

  return (
    <AuthContainer>
      <View style={styles.container}>
        {/* Check-in */}
        <TouchableOpacity onPress={() => setCalendar("checkin")}>
          <View style={{ width: width * 0.9, marginBottom: 16 }}>
            <TextField
              label="Check-in"
              icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
              placeholder="Selecione a data"
              value={checkIn}
              editable={false}
            />
          </View>
        </TouchableOpacity>

        {/* Check-out */}
        <TouchableOpacity onPress={() => setCalendar("checkout")}>
          <View style={{ width: width * 0.9, marginBottom: 24 }}>
            <TextField
              label="Check-out"
              icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
              placeholder="Selecione a data"
              value={checkOut}
              editable={false}
            />
          </View>
        </TouchableOpacity>

        {/* Hóspedes */}
        <View style={{ width: width * 0.9, marginBottom: 24 }}>
          <Text style={styles.label}>Quantidade de hóspedes</Text>
          <InputSpin
            guests={qntGuests}
            onSelectSpin={setQntGuests}
            mainGuests={1}
            step={1}
            maxGuests={6}
          />
        </View>
      </View>

      {/* Room Card */}
      <View style={{ width: width * 0.9, alignSelf: "center" }}>
        <RoomCard
          room={roomExample}
          onPress={() => {
            setSelectedRoom(roomExample);
            setRoomModal(true);
          }}
        />
      </View>

      {/* MODAL DO QUARTO */}
      <Modal transparent animationType="slide" visible={roomModal}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setRoomModal(false)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            {selectedRoom && (
              <>
                <Image
                  source={selectedRoom.image}
                  style={styles.modalImage}
                />

                <Text style={styles.modalTitle}>
                  {selectedRoom.label}
                </Text>

                <Text style={styles.modalDesc}>
                  {selectedRoom.description}
                </Text>

                <Text style={styles.modalPrice}>
                  R$ {selectedRoom.price.toFixed(2)}
                </Text>

                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={() => {
                    setRoomModal(false);

                    router.push({
                      pathname: "/reservations",
                      params: {
                        pushId: Date.now().toString(), // 🔑 evita loop
                        roomId: selectedRoom.id,       // 🔑 controla quantidade

                        label: selectedRoom.label,
                        description: selectedRoom.description,
                        price: selectedRoom.price,

                        checkIn,
                        checkOut,
                        guests: qntGuests,
                      },
                    });
                  }}
                >
                  <Text style={styles.searchButtonText}>
                    Reservar
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* MODAL CALENDÁRIO */}
      <Modal transparent animationType="fade" visible={calendar !== null}>
        <Pressable style={styles.modalBackdrop} onPress={closeCalendar}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            {calendar === "checkin" && (
              <DateSelector
                onSelectDate={(date) => {
                  setCheckIn(date);
                  closeCalendar();
                }}
              />
            )}

            {calendar === "checkout" && (
              <DateSelector
                onSelectDate={(date) => {
                  setCheckOut(date);
                  closeCalendar();
                }}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </AuthContainer>
  );
};

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  roomCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  roomImage: {
    width: "100%",
    height: 160,
  },
  roomInfo: {
    padding: 16,
  },
  roomHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  roomLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  roomDesc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  roomFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  verMaisButton: {
    backgroundColor: "#420350ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  verMaisText: {
    color: "#fff",
    fontWeight: "600",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: width * 0.92,
    padding: 16,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 12,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  searchButton: {
    backgroundColor: "#420350ff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RenderExplorer;
