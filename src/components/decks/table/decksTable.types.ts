import { Column, Sort } from '@/components/tableSortHeader'
import { Deck } from '@/services'

export const columns: Column[] = [
  {
    cols: '3',
    key: 'name',
    title: 'Name',
  },
  {
    cols: '1',
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    cols: '2',
    key: 'updated',
    title: 'Last Updated',
  },
  {
    cols: '3',
    key: 'author.name',
    title: 'Created By',
  },
  {
    cols: '1',
    key: 'actions',
    title: '',
  },
]

export type DecksTableProps = {
  currentUserId: string
  decks: Deck[] | undefined
  isLoading: boolean
  onSort: (key: Sort) => void
  sort: Sort
}
