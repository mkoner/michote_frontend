import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import {combineReducers} from "redux"; 
import storage from 'redux-persist/lib/storage'

import adminReducer from '../features/admin/adminSlice'
import bookingReducer from '../features/booking/bookingSlice'
import customerReducer from '../features/customer/customerSlice'
import partnerReducer from '../features/partner/partnerSlice'
import routeReducer from '../features/route/routeSlice'


const persistConfig = {
    key: 'root',
    storage,
  }
  
  const reducers = combineReducers({
    admins: adminReducer,
    bookings: bookingReducer,
    customers: customerReducer,
    partners: partnerReducer,
    routes: routeReducer,
   });
  
  const persistedReducer = persistReducer(persistConfig, reducers)
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
  
  export const persistor = persistStore(store)