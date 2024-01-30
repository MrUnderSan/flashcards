import { Card } from '@/common/types'
import { baseApi } from '@/services/baseApi'
import { CardArgsType } from '@/services/cards/cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCard: builder.mutation<Card, { body: FormData; id: string }>({
      invalidatesTags: ['Cards', 'Decks', 'Deck'],
      query: ({ body, id }) => ({
        body,
        method: 'POST',
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    deleteCard: builder.mutation<void, CardArgsType>({
      invalidatesTags: ['Cards'],
      query: args => ({
        method: 'DELETE',
        url: `v1/cards/${args.id}`,
      }),
    }),
    updateCard: builder.mutation<Card, { body: FormData; id: string }>({
      invalidatesTags: ['Cards'],
      query: args => ({
        body: args.body,
        method: 'PATCH',
        url: `v1/cards/${args.id}`,
      }),
    }),
  }),
})

export const { useCreateCardMutation, useDeleteCardMutation, useUpdateCardMutation } = cardsService
