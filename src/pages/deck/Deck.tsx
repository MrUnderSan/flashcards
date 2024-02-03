import { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SELECT_OPTIONS_PAGINATION } from '@/common/const'
import { useDecksSearchParams } from '@/common/hooks'
import { useDebounce } from '@/common/hooks/useDebounce'
import { Cards } from '@/components/cards'
import { CardsHeader } from '@/components/cards/header/CardsHeader'
import { DeleteDeckModal } from '@/components/decks/modals/deleteDeckModal/DeleteDeckModal'
import { EditModal } from '@/components/decks/modals/editModal/EditModal'
import { Page } from '@/components/page'
import { BackButton } from '@/components/ui/backButton'
import { Pagination } from '@/components/ui/pagination'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/textField'
import { useGetDeckCardsQuery, useGetMeQuery, useGetOneDeckQuery } from '@/services'

import s from './deck.module.scss'

export const Deck = () => {
  const { deckId } = useParams()
  const [editDeckMode, setEditDeckMode] = useState<boolean>(false)
  const [deleteDeckMode, setDeleteDeckMode] = useState<boolean>(false)
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
  const { data: me } = useGetMeQuery()

  const isOwner = me?.id === deck?.userId
  const isEmpty = deck && deck.cardsCount === 0

  const changeSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Page marginTop={'24px'}>
      <BackButton text={'Back to Decks List'} />
      <EditModal
        id={deckId ?? ''}
        img={deck?.cover ?? ''}
        name={deck?.name ?? ''}
        onOpenChange={() => setEditDeckMode(false)}
        open={editDeckMode}
      />
      <DeleteDeckModal
        deckName={deck?.name ?? ''}
        id={deckId ?? ''}
        isBackOnDelete
        onOpenChange={() => setDeleteDeckMode(false)}
        open={deleteDeckMode}
      />
      <CardsHeader
        deck={deck}
        deckId={deckId ?? ''}
        isEmpty={isEmpty}
        isOwner={isOwner}
        setDeleteDeckMode={setDeleteDeckMode}
        setEditDeckMode={setEditDeckMode}
      />
      {!isEmpty && (
        <TextField
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
        isOwner={isOwner}
        onSort={changeSort}
        searchValue={value}
        sort={sort}
      />
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
