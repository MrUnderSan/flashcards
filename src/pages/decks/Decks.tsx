import { ChangeEvent, useState } from 'react'

import { Trash } from '@/assets'
import { SELECT_OPTIONS_PAGINATION, TABS } from '@/common/const'
import { useDebounce, useDecksSearchParams } from '@/common/hooks'
import { DecksTable } from '@/components/decks/decksTable'
import { CreateModal } from '@/components/decks/modals/createModal/CreateModal'
import { DeleteDeckModal } from '@/components/decks/modals/deleteDeckModal/DeleteDeckModal'
import { EditModal } from '@/components/decks/modals/editModal/EditModal'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery, useGetMeQuery } from '@/services'

import s from './decks.module.scss'

export const Decks = () => {
  const {
    changeItemsPerPage,
    changeMinMaxCard,
    changePage,
    changeSort,
    changeValue,
    itemsPerPage,
    maxCards,
    minCards,
    page,
    rangeValue,
    sort,
    value,
  } = useDecksSearchParams()
  const [createMode, setCreateMode] = useState(false)
  const [deleteModeId, setDeleteModeId] = useState<null | string>(null)
  const [editModeId, setEditModeId] = useState<null | string>(null)
  const [currentTab, setCurrentTab] = useState('all')
  const debouncedValue = useDebounce<string>(value ?? '', 500)

  const { data: me } = useGetMeQuery()
  const currentUserId = me?.id
  const authorId = currentTab === 'my' ? currentUserId : undefined
  const { data } = useGetDecksQuery({
    authorId,
    currentPage: page,
    itemsPerPage: Number(itemsPerPage),
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    name: debouncedValue,
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })

  const clearFilterHandler = () => {
    changeMinMaxCard([0, 50])
    setCurrentTab('all')
    changeValue('')
  }

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value)
  }

  const handleTabChange = (tab: string) => {
    changePage(1)
    setCurrentTab(tab)
  }

  const deckToDeleteName = data?.items?.find(deck => deck.id === deleteModeId)?.name
  const deckToUpdateName = data?.items?.find(deck => deck.id === editModeId)?.name
  const deckImg = data?.items?.find(deck => deck.id === editModeId)?.cover

  return (
    <Page>
      <CreateModal onOpenChange={() => setCreateMode(false)} open={createMode} />
      <EditModal
        id={editModeId ?? ''}
        img={deckImg ?? ''}
        name={deckToUpdateName ?? ''}
        onOpenChange={() => setEditModeId(null)}
        open={!!editModeId}
      />
      <DeleteDeckModal
        deckName={deckToDeleteName ?? 'Deck'}
        id={deleteModeId ?? ''}
        onOpenChange={() => setDeleteModeId(null)}
        open={!!deleteModeId}
      />
      <div className={s.header}>
        <Typography as={'h1'} variant={'h1'}>
          Decks list
        </Typography>
        <Button onClick={() => setCreateMode(true)} variant={'primary'}>
          Add New Deck
        </Button>
      </div>
      <div className={s.filter}>
        <TextField
          onChange={changeTextHandler}
          rootContainerProps={{ className: s.search }}
          type={'search'}
          value={value ?? ''}
        />
        <TabSwitcher
          className={s.tabs}
          onValueChange={handleTabChange}
          tabs={TABS}
          value={currentTab}
        />
        <Slider max={50} onValueChange={changeMinMaxCard} value={rangeValue} />
        <Button onClick={clearFilterHandler} variant={'secondary'}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <DecksTable
        currentUserId={currentUserId ?? ''}
        decks={data?.items}
        deleteClick={setDeleteModeId}
        editClick={setEditModeId}
        onSort={changeSort}
        sort={sort}
      />
      {data?.items.length === 0 && (
        <Typography as={'h2'} className={s.found} variant={'h2'}>
          Decks not found
        </Typography>
      )}
      <Pagination
        className={s.pagination}
        currentPage={page}
        defaultValue={String(itemsPerPage)}
        onChangePage={changePage}
        onValueChange={changeItemsPerPage}
        options={SELECT_OPTIONS_PAGINATION}
        pageSize={itemsPerPage}
        totalCount={data?.pagination?.totalPages || 1}
      />
    </Page>
  )
}
