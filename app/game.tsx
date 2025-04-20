import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";

const game = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [isXNext, setIsXNext] = useState<boolean>(true);

  useEffect(() => {
    if (winner) {
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

    const gameWinner = calculateWinner(newBoard);
    console.log("gameWinner", gameWinner);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const renderSquare = (index: number) => {
    return (
      <Pressable style={styles.square} onPress={() => handlePress(index)}>
        <Text style={styles.squareText}>{board[index]}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {winner
          ? winner === "draw"
            ? "It's a draw!"
            : `Winner: Player ${winner}`
          : `Next player: ${isXNext ? "X" : "O"}`}
      </Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={resetGame}
      >
        <Text style={styles.buttonText}>Reset Game</Text>
      </Pressable>
    </View>
  );
};

export default game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  status: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  board: {
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#34495e",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  squareText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3498db",
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
