import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const navigateToGame = () => {
    router.push("/game");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crazy Tic Tac Toe</Text>
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>Game Rules:</Text>
        <Text style={styles.rule}>
          • Players take turns placing X or O on the board
        </Text>
        <Text style={styles.rule}>
          • The first player to get 3 of their marks in a row wins
        </Text>
        <Text style={styles.rule}>
          • Rows can be horizontal, vertical, or diagonal
        </Text>
        <Text style={styles.rule}>
          • If all spaces are filled with no winner, it's a draw
        </Text>
        <Text style={styles.rule}>
          • Crazy mode: Special power-ups appear randomly!
        </Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={navigateToGame}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2c3e50",
  },
  rulesContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rulesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  rule: {
    fontSize: 16,
    marginBottom: 8,
    color: "#34495e",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#2980b9",
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
