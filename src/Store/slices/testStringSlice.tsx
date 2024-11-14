import { createSlice} from "@reduxjs/toolkit";

interface GreetingState {
  message: string;
}

const initialState: GreetingState = {
  message: "Welcome to my project!",
};

const greetingSlice = createSlice({
  name: "greeting",
  initialState,
  reducers: {
    setGreetingMessage: (state) => {
      state.message = "Welcome to my project!";
    },
    setGoodbyeMessage: (state) => {
      state.message = "Goodbye! See you again soon!";
    },
  },
});

export const { setGoodbyeMessage, setGreetingMessage } = greetingSlice.actions;
export default greetingSlice.reducer;
