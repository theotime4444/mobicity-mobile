import { createSlice } from '@reduxjs/toolkit';

const transportLocationsSlice = createSlice({
  name: 'transportLocations',
  initialState: {
    points: [],
  },
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const { setPoints } = transportLocationsSlice.actions;
export default transportLocationsSlice.reducer;