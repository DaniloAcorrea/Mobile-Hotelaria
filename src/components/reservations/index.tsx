import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContexts";

interface Reservation {
  roomId: string;
  label: string;
  description: string;
  price: number;
  quantity: number; // Controle de x1, x2...
  checkIn: string;
  checkOut: string;
  guests: number;
}

const CarrinhoReservas = () => {
  const { reservar } = useAuth();
  const params = useLocalSearchParams();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "Cartão" | "Dinheiro">("PIX");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lastPushId = useRef<string | null>(null);

  useEffect(() => {
    if (!params?.pushId || params.pushId === lastPushId.current) return;
    lastPushId.current = String(params.pushId);

    const roomId = String(params.roomId);

    setReservations((prev) => {
      const exists = prev.find((r) => r.roomId === roomId);

      if (exists) {
        // Se já existe, aumenta a quantidade (x1 -> x2)
        return prev.map((r) =>
          r.roomId === roomId ? { ...r, quantity: r.quantity + 1 } : r
        );
      }

      // Se não existe, adiciona novo
      return [
        ...prev,
        {
          roomId,
          label: String(params.label),
          description: String(params.description ?? ""),
          price: Number(params.price),
          quantity: 1,
          checkIn: String(params.checkIn),
          checkOut: String(params.checkOut),
          guests: Number(params.guests),
        },
      ];
    });
  }, [params]);

  const total = reservations.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const removerUm = (roomId: string) => {
    setReservations((prev) =>
      prev
        .map((item) => {
          if (item.roomId !== roomId) return item;
          if (item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
          return null; // Remove se chegar a 0
        })
        .filter(Boolean) as Reservation[]
    );
  };

  const finalizarReserva = async () => {
    if (reservations.length === 0) return;

    try {
      setIsSubmitting(true);

      for (const item of reservations) {
        // Se o usuário selecionou x2, fazemos a reserva o número de vezes da quantidade
        for (let i = 0; i < item.quantity; i++) {
          await reservar(
            Number(item.roomId.replace(/\D/g, "")),
            item.checkIn,
            item.checkOut,
            paymentMethod
          );
        }
      }

      Alert.alert("Sucesso!", "Reservas confirmadas!", [
        {
          text: "OK",
          onPress: () => {
            setReservations([]);
            router.replace("/explorer");
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha na reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Minhas Reservas</Text>

        {reservations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Carrinho vazio</Text>
            <TouchableOpacity style={styles.continuarBtn} onPress={() => router.replace("/explorer")}>
              <Text style={styles.continuarText}>Explorar Quartos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {reservations.map((item) => (
              <View key={item.roomId} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.roomTitle}>{item.label}</Text>
                  
                  <View style={styles.infoRow}>
                    <FontAwesome5 name="calendar-alt" size={12} color="#666" />
                    <Text style={styles.infoText}> {item.checkIn} — {item.checkOut}</Text>
                  </View>

                  <Text style={styles.roomPrice}>
                    R$ {item.price.toFixed(2)} <Text style={styles.quantityText}>x {item.quantity}</Text>
                  </Text>
                  
                  <Text style={styles.subtotal}>
                    Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.removeBtn} 
                  onPress={() => removerUm(item.roomId)}
                >
                  <FontAwesome5 name="minus-circle" size={20} color="#d32f2f" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total Geral</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>

            <View style={styles.paymentSection}>
              <Text style={styles.paymentTitle}>Forma de Pagamento</Text>
              <View style={styles.paymentOptions}>
                {["PIX", "Debito"].map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[styles.paymentBtn, paymentMethod === method && styles.paymentBtnActive]}
                    onPress={() => setPaymentMethod(method as any)}
                  >
                    <Text style={[styles.paymentBtnText, paymentMethod === method && styles.paymentBtnTextActive]}>
                      {method}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.finalizarBtn, isSubmitting && { opacity: 0.7 }]} 
              onPress={finalizarReserva}
              disabled={isSubmitting}
            >
              {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={styles.finalizarText}>Finalizar Reserva</Text>}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { fontSize: 18, color: "#777", marginBottom: 20 },
  continuarBtn: { backgroundColor: "#420350ff", padding: 15, borderRadius: 10 },
  continuarText: { color: "white", fontWeight: "bold" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, flexDirection: "row", elevation: 3 },
  roomTitle: { fontSize: 17, fontWeight: "bold" },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  infoText: { fontSize: 13, color: '#666', marginLeft: 5 },
  roomPrice: { fontSize: 15, fontWeight: "600", color: "#420350ff" },
  quantityText: { color: "#333", fontWeight: "bold" },
  subtotal: { fontSize: 13, color: "#888", marginTop: 2 },
  removeBtn: { justifyContent: 'center', paddingLeft: 10 },
  totalBox: { marginTop: 10, paddingVertical: 15, borderTopWidth: 1, borderColor: "#eee", flexDirection: "row", justifyContent: "space-between" },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 20, fontWeight: "bold", color: "#420350ff" },
  paymentSection: { marginTop: 20 },
  paymentTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  paymentOptions: { flexDirection: "row", justifyContent: "space-between" },
  paymentBtn: { flex: 1, backgroundColor: "#f0f0f0", padding: 10, borderRadius: 8, alignItems: "center", marginHorizontal: 3 },
  paymentBtnActive: { backgroundColor: "#420350ff" },
  paymentBtnText: { color: "#555", fontWeight: "600" },
  paymentBtnTextActive: { color: "#fff" },
  finalizarBtn: { backgroundColor: "#420350ff", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 30, marginBottom: 40 },
  finalizarText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default CarrinhoReservas;