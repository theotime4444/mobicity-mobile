import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './slice/location.js'
import loginReducer from './slice/login.js'

export const store = configureStore( {
    reducer: {
        location: locationReducer,
        login: loginReducer
    }
})

