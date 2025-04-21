const gameRules = {
  classicGame: [
    "Players take turns placing X or O on the board",
    "The first player to get 3 of their marks in a row wins",
    "Players can also win by getting 3 in a column or diagonal",
    "If all 9 squares are filled and no player has won, the game is a draw",
  ],

  crazyTicTacToeGame: [
    "Players take turns placing X or O on the board",
    "The first player to get 3 of their marks in a row wins",
    "Players can also win by getting 3 in a column or diagonal",
    "As soon as you fill 3 square your prevous move will be removed",
    "At most you will have 3 entries in the board",
  ],
};

export default gameRules;
