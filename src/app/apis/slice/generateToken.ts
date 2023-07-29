import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchToken = createAsyncThunk(
  "token/getAccessToken",
  async (thunkApi) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = "https://frontend-test-api.aircall.io/auth/login";
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        username: "iqrafareed",
        password: "123456789",
      }),
    };

    const response = await fetch(url, requestOptions);

    const data = await response.json();
    return data;
  }
);
const initialState = {
  accessToken: "",
  loading: false,
} as any;
const loginSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.loading = false;

      state.accessToken = action.payload.access_token;

      localStorage.setItem("token", action.payload.access_token);
    });

    builder.addCase(fetchToken.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default loginSlice.reducer;
