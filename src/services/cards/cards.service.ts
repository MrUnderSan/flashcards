import { baseApi } from '@/services/baseApi'
import { Card, CardArgsType, UpdateCardArgs } from '@/services/cards/cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteCard: builder.mutation<void, CardArgsType>({
      invalidatesTags: ['Cards'],
      query: args => ({
        method: 'DELETE',
        url: `v1/cards/${args.id}`,
      }),
    }),
    getCard: builder.query<Card, CardArgsType>({
      providesTags: ['Cards'],
      query: args => `v1/cards/${args.id}`,
    }),
    updateCard: builder.mutation<void, UpdateCardArgs>({
      invalidatesTags: ['Cards'],
      query: args => ({
        body: args.body,
        method: 'PATCH',
        url: `v1/cards/${args.id}`,
      }),
    }),
  }),
})

export const { useDeleteCardMutation, useGetCardQuery, useUpdateCardMutation } = cardsService
