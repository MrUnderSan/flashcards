import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { Edit, Info, Trash } from '@/assets'
import { Play } from '@/assets/icons/play'
import { Button } from '@/components/ui/button'
import {
  DropDownBasicItemContent,
  DropDownItem,
  DropDownMenu,
  DropDownSeparator,
} from '@/components/ui/dropDownMenu'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services'
import { clsx } from 'clsx'

import s from './cardsHeader.module.scss'

type CardsHeaderProps = {
  deck: Deck | undefined
  deckId: string
  isEmpty?: boolean
  isOwner: boolean
  setCreateMode: (createModule: boolean) => void
  setDeleteDeckMode: (deleteDeckMode: boolean) => void
  setEditDeckMode: (editDeckMode: boolean) => void
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>
export const CardsHeader = ({
  className,
  deck,
  deckId,
  isEmpty,
  isOwner,
  setCreateMode,
  setDeleteDeckMode,
  setEditDeckMode,
}: CardsHeaderProps) => {
  const toLearnLink = `/decks/${deckId}/learn`

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
                    <Link to={toLearnLink}>
                      <DropDownBasicItemContent icon={<Play />} name={'Learn'} />
                    </Link>
                  </DropDownItem>
                  <DropDownSeparator />
                </>
              )}
              <DropDownItem onSelect={() => setEditDeckMode(true)}>
                <DropDownBasicItemContent icon={<Edit />} name={'Edit'} />
              </DropDownItem>
              <DropDownSeparator />
              <DropDownItem onSelect={() => setDeleteDeckMode(true)}>
                <DropDownBasicItemContent icon={<Trash />} name={'Delete'} />
              </DropDownItem>
            </DropDownMenu>
          )}
        </div>
        {isOwner && <Button onClick={() => setCreateMode(true)}>Add new card</Button>}
        {!isOwner && deck && deck.cardsCount > 0 && (
          <Button as={Link} to={toLearnLink}>
            Learn to Pack
          </Button>
        )}
      </div>
      {deck?.cover && <img alt={'Deck cover'} className={s.deckImg} src={deck.cover} />}
    </div>
  )
}
