// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
//
// import { authSlice } from 'redux/auth/authSlice';
//
// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// ];
//
// // Persisting token field from auth slice to localstorage
// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['token'],
// };
//
// export const store = configureStore({
//   reducer: {
//     auth: persistReducer(authPersistConfig, authSlice),
//   },
//   middleware,
//   devTools: process.env.NODE_ENV === 'development',
// });
//
// export const persistor = persistStore(store);