import { CardsTable } from '@/components/cards/cardsTable'
import { Sort } from '@/components/tableSortHeader'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/services'

import s from './cards.module.scss'

type CardsProps = {
  cards: Card[] | undefined
  onSort: (key: Sort) => void
  searchValue: null | string
  sort: Sort
}

export const Cards = ({ cards, onSort, searchValue, sort }: CardsProps) => {
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

  return <CardsTable cards={cards} onSort={onSort} sort={sort} />
}
