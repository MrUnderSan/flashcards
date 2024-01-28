import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include',
})
