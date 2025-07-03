import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { useAppSelector } from "@/redux/hook";
import themes from "@/constants/themes";
import Board from "./components/Board";

const classicGame = () => {
  const isCrazyMode = useAppSelector((state) => state.game.isCrazyMode);
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const currentTheme = isCrazyMode ? themes.crazy : themes.classic;

  useEffect(() => {
    if (winner) {
      const playEndGameSound = async () => {
        try {
          if (sound) {
            await sound.unloadAsync();
          }

          const soundFile =
            winner === "draw"
              ? require("../assets/sounds/draw.mp3")
              : require("../assets/sounds/winSound.wav");

          const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
          setSound(newSound);

          await newSound.playAsync();
        } catch (error) {
          console.error("Error playing sound", error);
        }
      };

      playEndGameSound();
      if (winner === "draw") {
        Alert.alert("Game Over", "It's a draw!", [
          { text: "Play Again", onPress: resetGame },
          { text: "Home", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Game Over", `Player ${winner} wins!`, [
          { text: "Play Again", onPress: resetGame },
          { text: "Home", onPress: () => router.back() },
        ]);
      }
    }
  }, [winner]);

  useEffect(() => {
    return () => {
      // Unload sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playMoveSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const soundFile = require("../assets/sounds/move.wav");

      const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
      setSound(newSound);

      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  const calculateWinner = (squares: string[]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    // Check for a draw (all squares filled)
    if (squares.every((square) => square !== null)) {
      return "draw";
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handlePress = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    playMoveSound();

    const gameWinner = calculateWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  return (
    <LinearGradient
      colors={currentTheme.gradient}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.status}>
          {winner
            ? winner === "draw"
              ? "It's a draw!"
              : `Winner: Player ${winner}`
            : `Next player: ${isXNext ? "X" : "O"}`}
        </Text>
        <Board board={board} handlePress={handlePress} />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={resetGame}
        >
          <Text style={styles.buttonText}>Reset Game</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default classicGame;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  status: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  button: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonPressed: {
    backgroundColor: "#c0392b",
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
