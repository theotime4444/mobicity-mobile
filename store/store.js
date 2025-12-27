import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './slice/location.js'
import loginReducer from './slice/login.js'
import transportLocationsReducer from './slice/transportLocations.js'
import selectedStopReducer from './slice/selectedStop.js'

export const store = configureStore( {
    reducer: {
        location: locationReducer,
        login: loginReducer,
        transportLocations: transportLocationsReducer,
        selectedStop: selectedStopReducer
    }
})

