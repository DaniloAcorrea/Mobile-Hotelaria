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
  ScrollView,
  StatusBar,
} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import InputSpin from "../ui/InputSpin";
import TextField from "../ui/TextField";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

/* =========================
   TIPAGEM E MOCK DE DADOS
========================= */
type Room = {
  id: string;
  label: string;
  description: string;
  price: number;
  image: any;
  maxGuests: number;
};

const ALL_ROOMS: Room[] = [
  {
    id: "apto-001",
    label: "Suíte Standard",
    description: "Cama de casal, Ar-condicionado, Wi-Fi de alta velocidade e frigobar.",
    price: 180.9,
    maxGuests: 2,
    image: require("../../../assets/images/quarto.jpg"),
  },
  {
    id: "apto-002",
    label: "Quarto Família Deluxe",
    description: "Espaço amplo com 2 camas de casal e 1 solteiro. Varanda privativa.",
    price: 350.0,
    maxGuests: 5,
    image: require("../../../assets/images/quarto.jpg"),
  },
  {
    id: "apto-003",
    label: "Loft Executivo",
    description: "Design moderno com cama King Size e área dedicada para trabalho.",
    price: 280.0,
    maxGuests: 2,
    image: require("../../../assets/images/quarto.jpg"),
  },
  {
    id: "apto-004",
    label: "Dormitório Coletivo",
    description: "Ambiente compartilhado com 3 beliches de alto padrão e lockers.",
    price: 450.0,
    maxGuests: 6,
    image: require("../../../assets/images/quarto.jpg"),
  },
  {
    id: "apto-005",
    label: "Bangalô Premium",
    description: "Exclusividade total com hidromassagem privativa e vista panorâmica.",
    price: 520.0,
    maxGuests: 4,
    image: require("../../../assets/images/quarto.jpg"),
  },
];

/* =========================
   COMPONENTE: ROOM CARD
========================= */
const RoomCard = ({ room, onPress }: { room: Room; onPress: () => void }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.roomCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={room.image} style={styles.roomImage} />
        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>R$ {room.price.toFixed(0)}</Text>
          <Text style={styles.perNightText}>/noite</Text>
        </View>
      </View>
      <View style={styles.roomInfo}>
        <View style={styles.roomHeader}>
          <Text style={styles.roomLabel} numberOfLines={1}>{room.label}</Text>
          <View style={styles.guestTag}>
            <FontAwesome5 name="users" size={10} color="#420350" />
            <Text style={styles.guestTagText}>{room.maxGuests}</Text>
          </View>
        </View>
        <Text style={styles.roomDesc} numberOfLines={2}>{room.description}</Text>
        <View style={styles.roomFooter}>
          <View style={styles.amenities}>
            <MaterialCommunityIcons name="wifi" size={18} color="#aaa" />
            <MaterialCommunityIcons name="snowflake" size={18} color="#aaa" style={{ marginLeft: 8 }} />
            <MaterialCommunityIcons name="television" size={18} color="#aaa" style={{ marginLeft: 8 }} />
          </View>
          <View style={styles.verMaisAction}>
             <Text style={styles.verMaisText}>Reservar</Text>
             <FontAwesome5 name="chevron-right" size={10} color="#420350" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* =========================
   MAIN COMPONENT: RENDER EXPLORER
========================= */
const RenderExplorer = () => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [roomModal, setRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const closeCalendar = () => setCalendar(null);

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert("Por favor, selecione as datas de Check-in e Check-out.");
      return;
    }
    const results = ALL_ROOMS.filter((room) => room.maxGuests >= qntGuests);
    setFilteredRooms(results);
    setHasSearched(true);
  };

  return (
    <AuthContainer>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Encontre sua suíte</Text>
          <Text style={styles.subTitle}>Escolha a melhor opção para sua estadia</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.rowInputs}>
            <TouchableOpacity style={styles.halfInput} onPress={() => setCalendar("checkin")}>
               <TextField
                label="Check-in"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Entrada"
                value={checkIn}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.halfInput} onPress={() => setCalendar("checkout")}>
               <TextField
                label="Check-out"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Saída"
                value={checkOut}
                editable={false}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.guestSection}>
            <View style={styles.guestHeader}>
              <MaterialCommunityIcons name="account-group-outline" size={20} color="#420350" />
              <Text style={styles.label}>Hóspedes</Text>
            </View>
            <InputSpin
              guests={qntGuests}
              onSelectSpin={setQntGuests}
              mainGuests={1}
              step={1}
              maxGuests={6}
            />
          </View>

          <TouchableOpacity style={styles.mainSearchButton} onPress={handleSearch}>
            <FontAwesome5 name="search" size={16} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.mainSearchButtonText}>Buscar agora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultsHeader}>
           <Text style={styles.resultsTitle}>
             {hasSearched ? `${filteredRooms.length} opções encontradas` : 'Recomendações'}
           </Text>
        </View>

        <View style={styles.resultsContainer}>
          {(hasSearched ? filteredRooms : ALL_ROOMS).map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onPress={() => {
                setSelectedRoom(room);
                setRoomModal(true);
              }}
            />
          ))}

          {hasSearched && filteredRooms.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="bed-cancel" size={60} color="#ccc" />
              <Text style={styles.noResultsText}>
                Nenhum quarto disponível para esta quantidade de hóspedes.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* MODAL DO QUARTO */}
      <Modal transparent animationType="slide" visible={roomModal}>
        <Pressable style={styles.modalBackdrop} onPress={() => setRoomModal(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragIndicator} />
            {selectedRoom && (
              <>
                <Image source={selectedRoom.image} style={styles.modalImage} />
                <View style={styles.modalTextContent}>
                  <Text style={styles.modalTitle}>{selectedRoom.label}</Text>
                  <Text style={styles.modalDesc}>{selectedRoom.description}</Text>
                  
                  <View style={styles.modalPriceContainer}>
                    <View>
                      <Text style={styles.modalPriceLabel}>Preço total</Text>
                      <Text style={styles.modalPriceValue}>R$ {selectedRoom.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => {
                        setRoomModal(false);
                        router.push({
                          pathname: "/reservations",
                          params: {
                            pushId: Date.now().toString(),
                            roomId: selectedRoom.id,
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
                      <Text style={styles.confirmButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* MODAL CALENDÁRIO */}
      <Modal transparent animationType="fade" visible={calendar !== null}>
        <Pressable style={styles.modalBackdrop} onPress={closeCalendar}>
          <View style={styles.calendarModalContent}>
            {calendar === "checkin" && (
              <DateSelector onSelectDate={(date: string) => { setCheckIn(date); closeCalendar(); }} />
            )}
            {calendar === "checkout" && (
              <DateSelector onSelectDate={(date: string) => { setCheckOut(date); closeCalendar(); }} />
            )}
          </View>
        </Pressable>
      </Modal>
    </AuthContainer>
  );
};

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subTitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  searchContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    elevation: 8,
    shadowColor: "#420350",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  guestSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  guestHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  mainSearchButton: {
    backgroundColor: "#420350",
    height: 55,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainSearchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  roomCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageContainer: {
    position: "relative",
  },
  roomImage: {
    width: "100%",
    height: 180,
  },
  priceBadge: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceBadgeText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#420350",
  },
  perNightText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 2,
  },
  roomInfo: {
    padding: 15,
  },
  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  roomLabel: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1a1a1a",
    flex: 1,
  },
  guestTag: {
    backgroundColor: "#f0e6f2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  guestTagText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#420350",
    marginLeft: 4,
  },
  roomDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 15,
  },
  roomFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    paddingTop: 12,
  },
  amenities: {
    flexDirection: "row",
  },
  verMaisAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  verMaisText: {
    color: "#420350",
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: height * 0.6,
    paddingBottom: 40,
  },
  modalDragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  modalImage: {
    width: "100%",
    height: 250,
  },
  modalTextContent: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  modalDesc: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 30,
  },
  modalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 20,
  },
  modalPriceLabel: {
    fontSize: 12,
    color: "#777",
    textTransform: "uppercase",
  },
  modalPriceValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#420350",
  },
  confirmButton: {
    backgroundColor: "#420350",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  calendarModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    width: width * 0.9,
    alignSelf: "center",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  noResultsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 15,
    paddingHorizontal: 40,
  },
});

const { height } = Dimensions.get("window");

export default RenderExplorer;