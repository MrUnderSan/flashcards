import { Link } from 'react-router-dom'

import { Edit, Info, Play, Trash } from '@/assets'
import { CreateCardModal } from '@/components/modals/cards/createCardModal/CreateCardModal'
import { DeleteDeckModal } from '@/components/modals/decks/deleteDeckModal/DeleteDeckModal'
import { EditDeckModal } from '@/components/modals/decks/editModal/EditDeckModal'
import { Button } from '@/components/ui/button'
import { DropDownItem, DropDownMenu, DropDownSeparator } from '@/components/ui/dropDownMenu'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './cardsHeader.module.scss'

import { CardsHeaderProps } from '../cards.types'

export const CardsHeader = ({
  className,
  deck,
  deckId,
  isEmpty,
  isLoading,
  isOwner,
}: CardsHeaderProps) => {
  const toLearnLink = `/decks/${deckId}/learn`
  const selectItemHandler = (e: Event) => e.preventDefault()

  return (
    <div className={s.headerWrapper}>
      <div className={clsx(s.header, className)}>
        <div className={s.headerLeft}>
          <Typography as={'h2'} className={s.title} variant={'large'}>
            {isLoading ? <Skeleton height={'36px'} width={'300px'} /> : deck?.name}
          </Typography>
          {isOwner && (
            <DropDownMenu
              trigger={
                <Button variant={'icon'}>
                  <Info className={s.iconTrigger} />
                </Button>
              }
            >
              {!isEmpty && (
                <>
                  <DropDownItem asChild>
                    <Button as={Link} to={toLearnLink} variant={'icon'}>
                      <Play className={s.iconImage} />
                      Learn
                    </Button>
                  </DropDownItem>
                  <DropDownSeparator />
                </>
              )}
              <DropDownItem onSelect={selectItemHandler}>
                <EditDeckModal
                  deck={deck}
                  trigger={
                    <Button variant={'icon'}>
                      <Edit className={s.iconImage} />
                      Edit
                    </Button>
                  }
                />
              </DropDownItem>
              <DropDownSeparator />
              <DropDownItem onSelect={selectItemHandler}>
                <DeleteDeckModal
                  id={deckId}
                  name={deck.name}
                  trigger={
                    <Button variant={'icon'}>
                      <Trash className={s.iconImage} />
                      Delete
                    </Button>
                  }
                />
              </DropDownItem>
            </DropDownMenu>
          )}
        </div>
        {isOwner && !isEmpty && (
          <CreateCardModal
            deckId={deck.id}
            trigger={<Button disabled={isLoading}>Add New Card</Button>}
          />
        )}
        {!isOwner &&
          !isEmpty &&
          (isLoading ? (
            <div>
              <Skeleton height={'36px'} width={'143px'} />
            </div>
          ) : (
            <Button as={Link} to={toLearnLink}>
              Learn to Pack
            </Button>
          ))}
      </div>
      {deck?.cover && <img alt={'DeckPage cover'} className={s.deckImg} src={deck.cover} />}
    </div>
  )
}
