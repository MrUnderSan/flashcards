import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { Edit, Info, Play, Trash } from '@/assets'
import { CreateCardModal } from '@/components/cards/modals/createCardModal/CreateCardModal'
import { DeleteDeckModal } from '@/components/decks/modals/deleteDeckModal/DeleteDeckModal'
import { EditDeckModal } from '@/components/decks/modals/editModal/EditDeckModal'
import { Button } from '@/components/ui/button'
import { DropDownItem, DropDownMenu, DropDownSeparator } from '@/components/ui/dropDownMenu'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services'
import { clsx } from 'clsx'

import s from './cardsHeader.module.scss'

type CardsHeaderProps = {
  deck: Deck
  deckId: string
  isEmpty?: boolean
  isOwner: boolean
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>
export const CardsHeader = ({ className, deck, deckId, isEmpty, isOwner }: CardsHeaderProps) => {
  const toLearnLink = `/decks/${deckId}/learn`
  const selectItemHandler = (e: Event) => e.preventDefault()

  return (
    <div className={s.headerWrapper}>
      <div className={clsx(s.header, className)}>
        <div className={s.headerLeft}>
          <Typography as={'h2'} className={s.title} variant={'large'}>
            {deck?.name}
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
          <CreateCardModal deckId={deck.id} trigger={<Button>Add New Card</Button>} />
        )}
        {!isOwner && !isEmpty && (
          <Button as={Link} to={toLearnLink}>
            Learn to Pack
          </Button>
        )}
      </div>
      {deck?.cover && <img alt={'Deck cover'} className={s.deckImg} src={deck.cover} />}
    </div>
  )
}
