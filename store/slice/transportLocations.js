import { createSlice } from '@reduxjs/toolkit';

const transportLocationsSlice = createSlice({
  name: 'transportLocations',
  initialState: {
    points: [],
    favoritePoints: []
  },
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setFavoritePoints: (state, action) => {
      state.favoritePoints = action.payload;
    }
  },
});

export const { setPoints, setFavoritePoints } = transportLocationsSlice.actions;
export default transportLocationsSlice.reducer;