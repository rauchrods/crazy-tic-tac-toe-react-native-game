import { useRouter } from "expo-router";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/Button";
import { useState } from "react";
import gameRules from "@/constants/gameRules";
import themes from "@/constants/themes";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setGameMode } from "../redux/gameSlice";

const platform = Platform.OS;

export default function Index() {
  const router = useRouter();

  // const [isCrazyMode, setIsCrazyMode] = useState<boolean>(true);

  const isCrazyMode = useAppSelector((state) => state.game.isCrazyMode);
  const dispatch = useAppDispatch();

  const currentRules = isCrazyMode
    ? gameRules.crazyTicTacToeGame
    : gameRules.classicGame;

  const currentTheme = isCrazyMode ? themes.crazy : themes.classic;

  const navigateToGame = () => {
    if (isCrazyMode) {
      router.push("/crazyTicTacToeGame");
    } else {
      router.push("/classicGame");
    }
  };

  return (
    <LinearGradient
      colors={currentTheme.gradient}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { color: currentTheme.title }]}>
          {isCrazyMode ? "Crazy Tic Tac Toe" : "Classic Tic Tac Toe"}
        </Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Classic Mode</Text>
          <Switch
            trackColor={{ false: currentTheme.track, true: currentTheme.track }}
            thumbColor={currentTheme.thumb}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => {
              dispatch(setGameMode(value));
            }}
            value={isCrazyMode}
          />
          <Text style={styles.toggleLabel}>Crazy Mode</Text>
        </View>
        <View style={styles.rulesContainer}>
          <Text style={[styles.rulesTitle, { color: currentTheme.title }]}>
            {isCrazyMode ? "Crazy Mode Rules:" : "Classic Mode Rules:"}
          </Text>
          {currentRules.map((rule, index) => (
            <Text style={styles.rule} key={index}>
              <Text
                style={[
                  styles.ruleNumber,
                  { color: currentTheme.ruleNumberColor },
                ]}
              >
                {index + 1}
              </Text>
              . {rule}
            </Text>
          ))}
        </View>

        <Button
          onPress={navigateToGame}
          customStyles={{
            backgroundColor: currentTheme.buttonBg,
          }}
        >
          {isCrazyMode
            ? "Start Crazy Tic Tac Toe"
            : "Start Classic Tic Tac Toe"}
        </Button>
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: platform === "ios" ? 10 : 2,
    borderRadius: 30,
    width: "100%",
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#34495e",
    marginHorizontal: 10,
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
  ruleNumber: {
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
