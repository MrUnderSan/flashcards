import { Card } from '@/common/types'
import { Pagination } from '@/services'

export type CardsResponse = {
  items: Card[]
  pagination: Pagination
}

export type CardArgsType = {
  id: string
}

export type UpdateCardBody = {
  answer?: string
  answerImg?: string
  answerVideo?: string
  question?: string
  questionImg?: string
  questionVideo?: string
}

export type UpdateCardArgs = {
  body: UpdateCardBody
} & CardArgsType

export type GetCardsArgs = {
  currentPage?: number
  itemsPerPage?: number
  orderBy?: null | string
  question?: string
}
