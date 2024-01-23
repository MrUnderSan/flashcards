import { baseApi } from '@/services/baseApi'
import { DecksResponse } from '@/services/decks/decks.type'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, void>({
        query: () => 'v2/decks',
      }),
    }
  },
})

export const { useGetDecksQuery } = decksService
