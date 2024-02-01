import { Card, Id } from '@/common/types'
import { CardsResponse, GetCardsArgs, GetRandomCardArg, GradeCardArg } from '@/services'
import { baseApi } from '@/services/baseApi'
import { Deck, DecksResponse, GetDecksArgs } from '@/services/decks/decks.type'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const response = await queryFulfilled

          for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Decks' }]
          )) {
            if (endpointName !== 'getDecks') {
              continue
            }
            dispatch(
              decksService.util.updateQueryData(endpointName, originalArgs, draft => {
                draft.items.unshift(response.data)
              })
            )
          }
        },
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDeck: builder.mutation<void, Id>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          let patchResult

          for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Decks' }]
          )) {
            if (endpointName !== 'getDecks') {
              continue
            }
            patchResult = dispatch(
              decksService.util.updateQueryData(endpointName, originalArgs, draft => {
                const index = draft?.items?.findIndex(deck => deck.id === id)

                if (index !== undefined && index !== -1) {
                  draft?.items?.splice(index, 1)
                }
              })
            )
          }

          try {
            await queryFulfilled
          } catch {
            patchResult?.undo()
          }
        },
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeckCards: builder.query<CardsResponse, { args: GetCardsArgs; id: string }>({
        providesTags: ['Cards'],
        query: ({ args, id }) => ({ params: args ? args : undefined, url: `v1/decks/${id}/cards` }),
      }),
      getDecks: builder.query<DecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ? args : undefined,
          url: 'v2/decks',
        }),
      }),
      getOneDeck: builder.query<Deck, Id>({
        providesTags: ['Deck'],
        query: ({ id }) => `v1/decks/${id}`,
      }),
      getRandomCard: builder.query<Card, { args?: GetRandomCardArg; id: string }>({
        query: ({ args, id }) => ({
          params: args ? args : undefined,
          url: `v1/decks/${id}/learn`,
        }),
      }),
      gradeCard: builder.mutation<Card, { args: GradeCardArg; id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ args, id }) => ({
          body: args,
          method: 'POST',
          url: `v1/decks/${id}/learn`,
        }),
      }),
      updateDeck: builder.mutation<Deck, { data: FormData; id: string }>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id, ...data }, { dispatch, getState, queryFulfilled }) {
          let patchResult

          for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Decks' }]
          )) {
            if (endpointName !== 'getDecks') {
              continue
            }
            patchResult = dispatch(
              decksService.util.updateQueryData(endpointName, originalArgs, draft => {
                const index = draft?.items?.findIndex(deck => deck.id === id)

                if (!index || index === -1) {
                  return
                }
                Object.assign(draft?.items?.[index], data)
              })
            )
          }

          try {
            await queryFulfilled
          } catch (e) {
            patchResult?.undo()
          }
        },
        query: ({ data, id }) => ({
          body: data,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckCardsQuery,
  useGetDecksQuery,
  useGetOneDeckQuery,
  useGetRandomCardQuery,
  useGradeCardMutation,
  useUpdateDeckMutation,
} = decksService
