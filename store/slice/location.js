import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice( {
    name: 'location',
    initialState: {
        latitude: null,
        longitude: null,
        isLoading: false,
        error: null,
        retryAttempt: 0,
    },
    reducers:{
        setLocation: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
            state.isLoading = false;
            state.error = null;
        },
        fetchLocation: (state) => { 
            state.isLoading = true;
            state.error = null;
        },
        fetchLocationFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchLocationRetry: (state) => {
            state.retryAttempt += 1;
        }
    }

})

export const { setLocation, fetchLocation, fetchLocationFailure, fetchLocationRetry } = locationSlice.actions;

export default locationSlice.reducer;