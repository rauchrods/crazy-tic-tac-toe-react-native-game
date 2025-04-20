import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const navigateToGame = () => {
    router.push("/game");
  };
  return (
    <LinearGradient
      colors={["#FF6B8B", "#A65EEA", "#5E72EB"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  rulesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  rulesTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#6C3483",
  },
  rule: {
    fontSize: 16,
    marginBottom: 10,
    color: "#34495e",
  },
  button: {
    backgroundColor: "rgba(156, 39, 176, 0.9)",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: "#7B1FA2",
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
