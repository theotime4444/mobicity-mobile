import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './slice/location.js'
import loginReducer from './slice/login.js'
import transportLocationsReducer from './slice/transportLocation.js'

export const store = configureStore( {
    reducer: {
        location: locationReducer,
        login: loginReducer,
        transportLocations: transportLocationsReducer
    }
})

