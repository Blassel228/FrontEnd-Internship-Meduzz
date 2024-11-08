import { createSlice } from "@reduxjs/toolkit";

const greetingSlice  = createSlice({
  name: "greeting",
  initialState: "Welcome to my project!",
  reducers: {
    setGreetingMessage: () => "Welcome to my project!",
    setGoodbyeMessage: () => "Goodbye! See you again soon!",
  },
});

export const { setGoodbyeMessage, setGreetingMessage } = greetingSlice.actions;
export default greetingSlice.reducer;
