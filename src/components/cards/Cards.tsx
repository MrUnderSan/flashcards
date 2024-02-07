import { Card } from '@/common/types'
import { CreateCardModal } from '@/components/cards/modals/createCardModal/CreateCardModal'
import { CardsTable } from '@/components/cards/table'
import { Sort } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './cards.module.scss'

type CardsProps = {
  cards: Card[] | undefined
  deckId: string
  isEmpty?: boolean
  isOwner?: boolean
  onSort: (key: Sort) => void
  searchValue: null | string
  sort: Sort
}

export const Cards = ({
  cards,
  deckId,
  isEmpty,
  isOwner,
  onSort,
  searchValue,
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
          {isOwner && <CreateCardModal deckId={deckId} trigger={<Button>Add New Card</Button>} />}
        </div>
      ) : (
        <CardsTable cards={cards} isOwner={isOwner} onSort={onSort} sort={sort} />
      )}
    </>
  )
}
