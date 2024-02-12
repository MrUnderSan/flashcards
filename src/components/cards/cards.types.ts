import { ComponentPropsWithoutRef } from 'react'

import { Card } from '@/common/types'
import { Column, Sort } from '@/components/tableSortHeader'
import { Deck } from '@/services'

export type CardsProps = {
  cards: Card[] | undefined
  deckId: string
  isEmpty?: boolean
  isOwner?: boolean
  onSort: (key: Sort) => void
  searchValue: null | string
  sort: Sort
}

export type CardsHeaderProps = {
  deck: Deck
  deckId: string
  isEmpty?: boolean
  isLoading: boolean
  isOwner: boolean
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const columns: Column[] = [
  {
    cols: '3',
    key: 'question',
    title: 'Question',
  },
  {
    cols: '3',
    key: 'answer',
    title: 'Answer',
  },
  {
    cols: '2',
    key: 'updated',
    title: 'Last Updated',
  },
  {
    cols: '2',
    key: 'grade',
    title: 'Grade',
  },
]

export type CardsTableProps = {
  cards: Card[] | undefined
  isOwner?: boolean
  onSort: (key: Sort) => void
  sort: Sort
}
