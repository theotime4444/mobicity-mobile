import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './slice/location.js'

export const store = configureStore( {
    reducer: {
        location: locationReducer
    }
})

