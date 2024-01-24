import { useState } from 'react'

import { DecksTable } from '@/components/decks/decksTable'
import { CreateModal } from '@/components/decks/modals/createModal/CreateModal'
import { DeleteDeckModal } from '@/components/decks/modals/deleteDeckModal/DeleteDeckModal'
import { Page } from '@/components/page'
import { Sort } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery } from '@/services'

import s from './decks.module.scss'

export const Decks = () => {
  const [sortBy, setSortBy] = useState<Sort>(null)
  const [createMode, setCreateMode] = useState(false)
  const [deleteModeId, setDeleteModeId] = useState<null | string>(null)
  const sort = sortBy !== null ? `${sortBy?.key}-${sortBy?.direction}` : null
  const { data } = useGetDecksQuery({ orderBy: sort })

  const deckToDeleteName = data?.items?.find(deck => deck.id === deleteModeId)?.name

  return (
    <Page>
      <CreateModal onOpenChange={() => setCreateMode(false)} open={createMode} />
      <DeleteDeckModal
        deckName={deckToDeleteName ?? 'Deck'}
        id={deleteModeId ?? ''}
        onOpenChange={() => setDeleteModeId(null)}
        open={!!deleteModeId}
      />
      <div className={s.header}>
        <Typography variant={'h1'}>Decks list</Typography>
        <Button onClick={() => setCreateMode(true)} variant={'primary'}>
          Add New Deck
        </Button>
      </div>
      <DecksTable
        decks={data?.items}
        deleteClick={setDeleteModeId}
        onSort={setSortBy}
        sort={sortBy}
      />
    </Page>
  )
}
