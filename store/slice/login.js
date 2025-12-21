import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: {},
        token: null,
        isLoading: false,
        error: null
    },
    reducers: {
        setLoginSucces: (state, action) =>{
            state.token = action.payload,
            state.error = null
        },
        setLoginError: (state, action) => {
            state.error = action.payload
        },
        logout: (state) => {
            state.token = null
        },
        setUser: (state,action) => {
            state.user = action.payload
        }
    }
})


export const {setLoginSucces, setLoginError, logout, setUser} = loginSlice.actions

export default loginSlice.reducer;