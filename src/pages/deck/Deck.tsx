import { ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'

import { SELECT_OPTIONS_PAGINATION } from '@/common/const'
import { useDebounce } from '@/common/hooks/useDebounce'
import { CardsTable } from '@/components/decks/cardsTable'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useDeckSearchParams } from '@/pages/deck/hooks'
import { useGetDeckCardsQuery, useGetOneDeckQuery } from '@/services'

import s from './deck.module.scss'
export const Deck = () => {
  const { deckId } = useParams()
  const {
    changeItemsPerPage,
    changePage,
    changeQuestion,
    changeSort,
    itemsPerPage,
    page,
    question,
    sort,
  } = useDeckSearchParams()
  const debouncedValue = useDebounce<string>(question ?? '', 500)

  const { data: cards, isLoading } = useGetDeckCardsQuery({
    args: {
      currentPage: page,
      itemsPerPage: itemsPerPage,
      orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
      question: debouncedValue,
    },
    id: deckId || '',
  })
  const { data: deck } = useGetOneDeckQuery({ id: deckId || '' })

  const toLearnLink = `/decks/${deckId}/learn`

  const changeSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeQuestion(e.currentTarget.value)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Page>
      <div className={s.header}>
        <Typography as={'h1'} variant={'h1'}>
          {deck?.name}
        </Typography>
        <Button as={Link} to={toLearnLink}>
          Learn to Pack
        </Button>
      </div>
      <TextField
        onChange={changeSearchValueHandler}
        placeholder={'Search cards'}
        type={'search'}
        value={question ?? ''}
      />
      {cards?.items.length === 0 ? (
        <Typography as={'span'} className={s.noResults} variant={'body2'}>
          No results found for your search query. Please make sure you entered the query correctly.
        </Typography>
      ) : (
        <CardsTable cards={cards?.items} onSort={changeSort} sort={sort} />
      )}
      <Pagination
        className={s.pagination}
        currentPage={page}
        onChangePage={changePage}
        onValueChange={changeItemsPerPage}
        options={SELECT_OPTIONS_PAGINATION}
        pageSize={Number(itemsPerPage)}
        totalCount={cards?.pagination.totalPages ?? 0}
      />
    </Page>
  )
}
