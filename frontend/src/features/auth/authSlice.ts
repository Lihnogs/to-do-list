import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authApi, LoginResponse, UserRegisterInput, UserLoginInput } from "../../api/authApi";
import { saveToken, removeToken, getToken } from "../../utils/storage";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: getToken(),
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<LoginResponse, UserLoginInput>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Erro no login");
    }
  }
);

export const register = createAsyncThunk<any, UserRegisterInput>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Erro no registro");
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      removeToken();
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, action: PayloadAction<LoginResponse>) => {
        s.loading = false;
        s.token = action.payload.token;
        s.user = action.payload.user;
        saveToken(action.payload.token);
      })
      .addCase(login.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string || "Erro no login";
      })

      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, action) => {
        s.loading = false;
      })
      .addCase(register.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string || "Erro no registro";
      });
  },
});

export const { logout, clearError } = slice.actions;
export default slice.reducer;