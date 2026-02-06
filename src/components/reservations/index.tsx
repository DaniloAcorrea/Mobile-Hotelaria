import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import { router, useLocalSearchParams } from "expo-router";

interface Reservation {
  roomId: string;
  label: string;
  description: string;
  price: number;
  quantity: number;
}

const CarrinhoReservas = () => {
  const params = useLocalSearchParams();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // evita loop infinito
  const lastPushId = useRef<string | null>(null);

  /* =========================
     ADD / INCREMENT
  ========================= */
  useEffect(() => {
    if (!params?.pushId || params.pushId === lastPushId.current) return;

    lastPushId.current = String(params.pushId);
    const roomId = String(params.roomId);

    setReservations((prev) => {
      const exists = prev.find((r) => r.roomId === roomId);

      if (exists) {
        return prev.map((r) =>
          r.roomId === roomId
            ? { ...r, quantity: r.quantity + 1 }
            : r
        );
      }

      return [
        ...prev,
        {
          roomId,
          label: String(params.label),
          description: String(params.description ?? ""),
          price: Number(params.price),
          quantity: 1,
        },
      ];
    });
  }, [params]);

  /* =========================
     TOTAL
  ========================= */
  const total = reservations.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  /* =========================
     REMOVE (-1 ou remove)
  ========================= */
  const removerReserva = (roomId: string) => {
    setReservations((prev) =>
      prev.map((item) => {
          if (item.roomId !== roomId) return item;

          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }

          return null;
        })
        .filter(Boolean) as Reservation[]
    );
  };

  /* =========================
     FINALIZAR
  ========================= */
  const finalizarReserva = () => {
    if (reservations.length === 0) {
      Alert.alert("Carrinho vazio");
      return;
    }

    Alert.alert(
      "Reserva confirmada",
      `Total: R$ ${total.toFixed(2)}`,
      [
        {
          text: "OK",
          onPress: () => {
            setReservations([]);
          },
        },
      ]
    );
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <AuthContainer>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Minhas Reservas</Text>

        {reservations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma reserva adicionada
            </Text>

            <TouchableOpacity
              style={styles.continuarBtn}
              onPress={() => router.replace("/explorer")}
            >
              <Text style={styles.continuarText}>
                Voltar para explorar
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {reservations.map((item) => (
              <View key={item.roomId} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.roomTitle}>{item.label}</Text>

                  <Text style={styles.roomDesc}>
                    {item.description}
                  </Text>

                  <Text style={styles.roomPrice}>
                    R$ {item.price.toFixed(2)} x {item.quantity}
                  </Text>

                  <Text style={styles.subtotal}>
                    Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => removerReserva(item.roomId)}
                >
                  <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                R$ {total.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.finalizarBtn}
              onPress={finalizarReserva}
            >
              <Text style={styles.finalizarText}>
                Finalizar Reserva
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 120,
  },
  emptyText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 24,
  },
  continuarBtn: {
    backgroundColor: "#420350ff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  continuarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    elevation: 2,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomDesc: {
    fontSize: 14,
    color: "#666",
    marginVertical: 6,
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#420350ff",
  },
  subtotal: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  removeText: {
    color: "#d32f2f",
    fontWeight: "600",
  },
  totalBox: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#420350ff",
  },
  finalizarBtn: {
    backgroundColor: "#420350ff",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  finalizarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CarrinhoReservas;