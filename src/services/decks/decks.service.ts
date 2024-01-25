import { CardsResponse, GetCardsArgs } from '@/services'
import { baseApi } from '@/services/baseApi'
import { CreateDeckArgs, Deck, DecksResponse, GetDecksArgs } from '@/services/decks/decks.type'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<DecksResponse, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDeck: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeckCards: builder.query<CardsResponse, { args: GetCardsArgs; id: string }>({
        query: ({ args, id }) => ({ params: args ? args : undefined, url: `v1/decks/${id}/cards` }),
      }),
      getDecks: builder.query<DecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ? args : undefined,
          url: 'v2/decks',
        }),
      }),
      getOneDeck: builder.query<Deck, { id: string }>({ query: ({ id }) => `v1/decks/${id}` }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckCardsQuery,
  useGetDecksQuery,
  useGetOneDeckQuery,
} = decksService
