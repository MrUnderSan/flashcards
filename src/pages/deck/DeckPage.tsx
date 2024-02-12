import { ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { SELECT_OPTIONS_PAGINATION } from '@/common/constants'
import { ROUTES } from '@/common/enums'
import { useDecksSearchParams } from '@/common/hooks'
import { useDebounce } from '@/common/hooks/useDebounce'
import { Cards } from '@/components/cards'
import { CardsHeader } from '@/components/cards/header/CardsHeader'
import { BackButton } from '@/components/ui/backButton'
import { Loader } from '@/components/ui/loader'
import { Page } from '@/components/ui/page'
import { Pagination } from '@/components/ui/pagination'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/textField'
import {
  Deck as DeckType,
  useGetDeckCardsQuery,
  useGetMeQuery,
  useGetOneDeckQuery,
} from '@/services'

import s from './deckPage.module.scss'

export const DeckPage = () => {
  const { deckId } = useParams()
  const {
    changeItemsPerPage,
    changePage,
    changeSort,
    changeValue,
    itemsPerPage,
    page,
    searchValue,
    sort,
  } = useDecksSearchParams()
  const debouncedValue = useDebounce<string>(searchValue || '', 500)

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

  const changeSearchValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    changeValue(event.currentTarget.value)
  }

  if (isLoadingCards) {
    return <Spinner />
  }

  return (
    <>
      {(isFetchingDeck || isFetchingCards) && <Loader />}
      <Page marginTop={'24px'}>
        <BackButton pathToBack={ROUTES.DECKS} text={'Back to DecksPage List'} />
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
            value={searchValue ?? ''}
          />
        )}
        <Cards
          cards={cards?.items}
          deckId={deckId ?? ''}
          isEmpty={isEmpty}
          isOwner={isOwner}
          onSort={changeSort}
          searchValue={searchValue}
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
