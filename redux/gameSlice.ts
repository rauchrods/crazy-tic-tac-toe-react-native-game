import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  isCrazyMode: boolean;
}

const initialState: GameState = {
  isCrazyMode: true,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<boolean>) => {
      state.isCrazyMode = action.payload;
    },
  },
});

export const { setGameMode } = gameSlice.actions;
export default gameSlice.reducer;
