import { CardsTable } from '@/components/cards/table'
import { CreateCardModal } from '@/components/modals/cards/createCardModal/CreateCardModal'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './cards.module.scss'

import { CardsProps } from './cards.types'

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
            {'This decks is empty' +
              (isOwner ? '. ' + 'Click add new cards to fill this decks' : '')}
          </Typography>
          {isOwner && <CreateCardModal deckId={deckId} trigger={<Button>Add New Card</Button>} />}
        </div>
      ) : (
        <CardsTable cards={cards} isOwner={isOwner} onSort={onSort} sort={sort} />
      )}
    </>
  )
}
