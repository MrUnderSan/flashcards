import { Card } from '@/common/types'
import { CardsTable } from '@/components/cards/table'
import { Sort } from '@/components/tableSortHeader'
import { Typography } from '@/components/ui/typography'

import s from './cards.module.scss'

type CardsProps = {
  cards: Card[] | undefined
  isOwner?: boolean
  onSort: (key: Sort) => void
  searchValue: null | string
  setCardToDeleteId?: (id: string) => void
  setCardToEditId?: (id: string) => void
  sort: Sort
}

export const Cards = ({
  cards,
  isOwner,
  onSort,
  searchValue,
  setCardToDeleteId,
  setCardToEditId,
  sort,
}: CardsProps) => {
  if (cards?.length === 0 && searchValue) {
    return (
      <Typography as={'h2'} className={s.found} variant={'h2'}>
        No results found for your search query. Please make sure you entered the query correctly.
      </Typography>
    )
  } else if (cards?.length === 0) {
    return (
      <Typography as={'h2'} className={s.found} variant={'h2'}>
        Cards not found
      </Typography>
    )
  }

  return (
    <CardsTable
      cards={cards}
      isOwner={isOwner}
      onSort={onSort}
      setCardToDeleteId={setCardToDeleteId}
      setCardToEditId={setCardToEditId}
      sort={sort}
    />
  )
}
