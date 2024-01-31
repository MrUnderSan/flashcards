import { Card } from '@/common/types'
import { CardsTable } from '@/components/cards/table'
import { Sort } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './cards.module.scss'

type CardsProps = {
  cards: Card[] | undefined
  isEmpty?: boolean
  isOwner?: boolean
  onSort: (key: Sort) => void
  searchValue: null | string
  setCardToDeleteId?: (id: string) => void
  setCardToEditId?: (id: string) => void
  setCreateMode: (CreateMode: boolean) => void
  sort: Sort
}

export const Cards = ({
  cards,
  isEmpty,
  isOwner,
  onSort,
  searchValue,
  setCardToDeleteId,
  setCardToEditId,
  setCreateMode,
  sort,
}: CardsProps) => {
  if (cards?.length === 0 && searchValue) {
    return (
      <div className={s.infoBlock}>
        <Typography className={s.infoText} variant={'body2'}>
          No results found for your search query. Please make sure you entered the query correctly.
        </Typography>
      </div>
    )
  }

  return (
    <>
      {isEmpty ? (
        <div className={s.infoBlock}>
          <Typography className={s.infoText} variant={'body2'}>
            {'This deck is empty' + (isOwner ? '. ' + 'Click add new card to fill this deck' : '')}
          </Typography>
          {isOwner && <Button onClick={() => setCreateMode(true)}>Add new card</Button>}
        </div>
      ) : (
        <CardsTable
          cards={cards}
          isOwner={isOwner}
          onSort={onSort}
          setCardToDeleteId={setCardToDeleteId}
          setCardToEditId={setCardToEditId}
          sort={sort}
        />
      )}
    </>
  )
}
