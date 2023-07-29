import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface FetchDataArgs {
  accessToken: string;
  limit: number;
  offset: number;
}
export const fetchCalls = createAsyncThunk(
  "calls/getAllCalls",
  async (arg: FetchDataArgs, thunkApi) => {
    const url = `https://frontend-test-api.aircall.io/calls?offset=${arg.offset}&limit=${arg.limit}`;
    const headers = new Headers();
    headers.append("Authorization", ` ${arg.accessToken}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    const data = await response.json();
    return data;
  }
);
const initialState = {
  entities: [],
  loading: false,
} as any;
const callSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCalls.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });

    builder.addCase(fetchCalls.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default callSlice.reducer;
