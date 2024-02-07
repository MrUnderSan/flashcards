import { ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { ROUTES, SELECT_OPTIONS_PAGINATION } from '@/common/const'
import { useDecksSearchParams } from '@/common/hooks'
import { useDebounce } from '@/common/hooks/useDebounce'
import { Cards } from '@/components/cards'
import { CardsHeader } from '@/components/cards/header/CardsHeader'
import { Page } from '@/components/page'
import { BackButton } from '@/components/ui/backButton'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/textField'
import {
  Deck as DeckType,
  useGetDeckCardsQuery,
  useGetMeQuery,
  useGetOneDeckQuery,
} from '@/services'

import s from './deck.module.scss'

export const Deck = () => {
  const { deckId } = useParams()
  const {
    changeItemsPerPage,
    changePage,
    changeSort,
    changeValue,
    itemsPerPage,
    page,
    sort,
    value,
  } = useDecksSearchParams()
  const debouncedValue = useDebounce<string>(value ?? '', 500)

  const {
    data: cards,
    isFetching: isFetchingCards,
    isLoading: isLoadingCards,
  } = useGetDeckCardsQuery({
    args: {
      currentPage: page,
      itemsPerPage: itemsPerPage,
      orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
      question: debouncedValue,
    },
    id: deckId || '',
  })
  const {
    data: deck,
    isFetching: isFetchingDeck,
    isLoading: isLoadingDeck,
  } = useGetOneDeckQuery({ id: deckId || '' })
  const { data: me } = useGetMeQuery()

  const isOwner = me?.id === deck?.userId
  const isEmpty = deck && deck.cardsCount === 0

  const changeSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value)
  }

  return (
    <>
      {(isFetchingDeck || isFetchingCards) && <Loader />}
      <Page marginTop={'24px'}>
        <BackButton pathToBack={ROUTES.decks} text={'Back to Decks List'} />
        <CardsHeader
          deck={deck || ({} as DeckType)}
          deckId={deckId ?? ''}
          isEmpty={isEmpty}
          isLoading={isLoadingDeck}
          isOwner={isOwner}
        />
        {!isEmpty && (
          <TextField
            disabled={isFetchingCards}
            onChange={changeSearchValueHandler}
            placeholder={'Search cards'}
            rootContainerProps={{ className: s.inputSearch }}
            type={'search'}
            value={value ?? ''}
          />
        )}
        <Cards
          cards={cards?.items}
          deckId={deckId ?? ''}
          isEmpty={isEmpty}
          isLoading={isLoadingCards}
          isOwner={isOwner}
          onSort={changeSort}
          searchValue={value}
          sort={sort}
        />
        <Pagination
          className={s.pagination}
          currentPage={page}
          defaultValue={String(itemsPerPage)}
          onChangePage={changePage}
          onValueChange={changeItemsPerPage}
          options={SELECT_OPTIONS_PAGINATION}
          pageSize={Number(itemsPerPage)}
          totalCount={cards?.pagination.totalPages ?? 1}
        />
      </Page>
    </>
  )
}
