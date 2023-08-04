import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getUserDocument, auth, createUserDocument, updateUserDocument } from "../../firebase";
import { CoPresentOutlined } from "@mui/icons-material";

const initialState = {
  name: "",
  surname: "",
  job: "",
  email: "",
};

export const loginUserThunk = createAsyncThunk(
  "user/signin",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      const { email, password } = payload.user;
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // create user in fireBase auth by email
      // and password the same time get data in fireStore where id user is key for data.
      const userData = await getUserDocument(credential);
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
      return userData;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const { email, password, surname, name, job } = payload.user;

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = await createUserDocument(user, { surname, name, job });
      localStorage.setItem(
        "user",
        JSON.stringify({...userData, id: user.uid})
      );
      return userData;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateUserThunk = createAsyncThunk(
    "user/signup",
    async (payload, { rejectWithValue }) => {
        console.log(payload);
      try {
        const { email, id, surname, name, job } = payload.user;
  
        const userData = await updateUserDocument(id, {email, name, surname, job})
        console.log(userData, 'updated')
        localStorage.setItem(
          "user",
          JSON.stringify({...userData, id})
        );
        return userData;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = "";
      state.job = "";
      state.name = "";
      state.surname = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      const { email, surname, name, job } = payload;
      state.email = email;
      state.job = job;
      state.name = name;
      state.surname = surname;
    }),
      builder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
        const { email, surname, name, job } = payload;
        state.email = email;
        state.job = job;
        state.name = name;
        state.surname = surname;
      });
  },
});

export const { setAccessToken, setRefreshToken } = userSlice.actions;

export default userSlice.reducer;
