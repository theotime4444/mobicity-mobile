import { createSlice } from '@reduxjs/toolkit';

const selectedStopSlice = createSlice({
  name: 'selectedStop',
  initialState: {
    selectedStopId: null
  },
  reducers: {
    setSelectedStop: (state, action) => {
      state.selectedStopId = action.payload;
    },
    clearSelectedStop: (state) => {
      state.selectedStopId = null;
    }
  },
});

export const { setSelectedStop, clearSelectedStop } = selectedStopSlice.actions;
export default selectedStopSlice.reducer;