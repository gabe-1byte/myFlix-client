import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setFavoriteMovies: (state, action) => {
            if (state.user) {
                state.user.FavoriteMovies = action.payload;
            }
        }
    }
});

export const { setUser, setFavoriteMovies } = userSlice.actions;
export default userSlice.reducer;