import { ChangeEvent } from 'react'

import { Trash } from '@/assets'
import { SELECT_OPTIONS_PAGINATION, TABS } from '@/common/constants'
import { useDebounce, useDecksSearchParams } from '@/common/hooks'
import { DecksTable } from '@/components/decks/table'
import { CreateDeckModal } from '@/components/modals/decks/createModal'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Page } from '@/components/ui/page'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery, useGetMeQuery } from '@/services'

import s from './decksPage.module.scss'

export const DecksPage = () => {
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
    searchValue,
    sort,
    tabValue,
  } = useDecksSearchParams()
  const debounceMinCards = useDebounce(minCards, 500)
  const debounceMaxCards = useDebounce(maxCards, 500)
  const debouncedValue = useDebounce<string>(searchValue ?? '', 500)
  const { data: me, isLoading: isLoadingMe } = useGetMeQuery()
  const currentUserId = me?.id
  const authorId = tabValue === 'my' ? currentUserId : undefined

  const {
    data,
    isFetching: isFetchingDecks,
    isLoading: isLoadingDecks,
  } = useGetDecksQuery({
    authorId,
    currentPage: page,
    itemsPerPage: Number(itemsPerPage),
    maxCardsCount: debounceMaxCards,
    minCardsCount: debounceMinCards,
    name: debouncedValue,
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })

  const clearFilterHandler = () => clearFilter()

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => changeValue(e.currentTarget.value)

  const changeTabValueHandler = (tabValue: string) => changeTabValue(tabValue)

  return (
    <>
      {(isFetchingDecks || isLoadingMe) && <Loader />}
      <Page>
        <div className={s.header}>
          <Typography as={'h1'} variant={'h1'}>
            Decks list
          </Typography>
          <CreateDeckModal
            trigger={<Button disabled={isFetchingDecks || isLoadingDecks}>Add New Deck</Button>}
          />
        </div>
        <div className={s.filter}>
          <TextField
            disabled={isFetchingDecks || isLoadingDecks}
            onChange={changeTextHandler}
            rootContainerProps={{ className: s.search }}
            type={'search'}
            value={searchValue ?? ''}
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
          <Button
            disabled={isFetchingDecks || isLoadingDecks}
            onClick={clearFilterHandler}
            variant={'secondary'}
          >
            <Trash />
            Clear Filter
          </Button>
        </div>
        <DecksTable
          currentUserId={currentUserId ?? ''}
          decks={data?.items}
          isLoading={isLoadingDecks}
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
    </>
  )
}
