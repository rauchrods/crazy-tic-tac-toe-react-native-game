import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface BoardProps {
  board: string[];
  handlePress: (index: number) => void;
}

const Board = ({ board, handlePress }: BoardProps) => {
  const renderSquare = (index: number) => {
    return (
      <Pressable style={styles.square} onPress={() => handlePress(index)}>
        <Text style={styles.squareText}>{board[index]}</Text>
      </Pressable>
    );
  };
  return (
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
  );
};

export default Board;

const styles = StyleSheet.create({
  board: {
    marginBottom: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 5,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "rgba(240, 33, 178, 0.781)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  squareText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3498db",
  },
});
