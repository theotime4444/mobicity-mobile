import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
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
        }

    }
})


export const {setLoginSucces, setLoginError, logout} = loginSlice.actions

export default loginSlice.reducer;