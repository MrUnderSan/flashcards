import { ChangeEvent } from 'react'

import { Trash } from '@/assets'
import { SELECT_OPTIONS_PAGINATION, TABS } from '@/common/const'
import { useDebounce, useDecksSearchParams } from '@/common/hooks'
import { DecksTable } from '@/components/decks/decksTable'
import { CreateDeckModal } from '@/components/decks/modals/createModal/CreateDeckModal'
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
    changeTabValue,
    changeValue,
    clearFilter,
    itemsPerPage,
    maxCards,
    minCards,
    minMaxCards,
    page,
    sort,
    tabValue,
    value,
  } = useDecksSearchParams()
  const debounceMinCards = useDebounce(minCards, 500)
  const debounceMaxCards = useDebounce(maxCards, 500)
  const debouncedValue = useDebounce<string>(value ?? '', 500)
  const { data: me } = useGetMeQuery()
  const currentUserId = me?.id
  const authorId = tabValue === 'my' ? currentUserId : undefined

  const { data } = useGetDecksQuery({
    authorId,
    currentPage: page,
    itemsPerPage: Number(itemsPerPage),
    maxCardsCount: debounceMaxCards,
    minCardsCount: debounceMinCards,
    name: debouncedValue,
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })

  const clearFilterHandler = () => {
    clearFilter()
  }

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value)
  }

  const changeTabValueHandler = (tabValue: string) => {
    changeTabValue(tabValue)
  }

  return (
    <Page>
      <div className={s.header}>
        <Typography as={'h1'} variant={'h1'}>
          Decks list
        </Typography>
        <CreateDeckModal trigger={<Button>Add New Deck</Button>} />
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
          onValueChange={changeTabValueHandler}
          tabs={TABS}
          value={tabValue}
        />
        <Slider
          max={minMaxCards?.max}
          min={minMaxCards?.min}
          onValueChange={changeMinMaxCard}
          value={[minCards, maxCards]}
        />
        <Button onClick={clearFilterHandler} variant={'secondary'}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <DecksTable
        currentUserId={currentUserId ?? ''}
        decks={data?.items}
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
