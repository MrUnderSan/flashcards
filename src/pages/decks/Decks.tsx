import { ChangeEvent, useState } from 'react'

import { Trash } from '@/assets'
import { DecksTable } from '@/components/decks/decksTable'
import { CreateModal } from '@/components/decks/modals/createModal/CreateModal'
import { DeleteDeckModal } from '@/components/decks/modals/deleteDeckModal/DeleteDeckModal'
import { Page } from '@/components/page'
import { Sort } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetDecksQuery, useGetMeQuery } from '@/services'

import s from './decks.module.scss'

export const Decks = () => {
  const tabs = [
    { title: 'My Decks', value: 'my' },
    { title: 'All Decks', value: 'all' },
  ]
  const [sortBy, setSortBy] = useState<Sort>(null)
  const [currentTab, setCurrentTab] = useState('all')
  const [sliderArgs, setSliderArgs] = useState([0, 50])
  const [text, setText] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState('10')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [createMode, setCreateMode] = useState(false)
  const [deleteModeId, setDeleteModeId] = useState<null | string>(null)
  const sort = sortBy !== null ? `${sortBy?.key}-${sortBy?.direction}` : null
  const debouncedValue = useDebounce<string>(text, 500)
  const { data: me } = useGetMeQuery()
  const currentUserId = me?.id
  const authorId = currentTab === 'my' ? currentUserId : undefined
  const { data } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage: Number(itemsPerPage),
    maxCardsCount: sliderArgs[1],
    minCardsCount: sliderArgs[0],
    name: debouncedValue,
    orderBy: sort,
  })

  const clearFilter = () => {
    setSliderArgs([0, 50])
    setCurrentTab('all')
    setText('')
  }

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handleTabChange = (tab: string) => {
    setCurrentPage(1)
    setCurrentTab(tab)
  }

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
      <div className={s.filter}>
        <TextField
          onChange={changeTextHandler}
          rootContainerProps={{ className: s.search }}
          type={'search'}
          value={text}
        />
        <TabSwitcher
          className={s.tabs}
          onValueChange={handleTabChange}
          tabs={tabs}
          value={currentTab}
        />
        <Slider max={50} onValueChange={setSliderArgs} value={sliderArgs} />
        <Button onClick={clearFilter} variant={'secondary'}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <DecksTable
        currentUserId={currentUserId ?? ''}
        decks={data?.items}
        deleteClick={setDeleteModeId}
        onSort={setSortBy}
        sort={sortBy}
      />
      <Pagination
        className={s.pagination}
        currentPage={data?.pagination?.currentPage ?? 1}
        defaultValue={itemsPerPage}
        onChangePage={setCurrentPage}
        onValueChange={setItemsPerPage}
        options={[
          { title: '5', value: '5' },
          { title: '10', value: '10' },
          { title: '15', value: '15' },
        ]}
        pageSize={Number(itemsPerPage)}
        totalCount={data?.pagination?.totalPages || 1}
      />
    </Page>
  )
}
