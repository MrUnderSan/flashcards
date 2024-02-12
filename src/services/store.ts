import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './baseApi'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
})
