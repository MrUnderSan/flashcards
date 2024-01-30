import { ChangeEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { SELECT_OPTIONS_PAGINATION } from '@/common/const'
import { useDecksSearchParams } from '@/common/hooks'
import { useDebounce } from '@/common/hooks/useDebounce'
import { Cards } from '@/components/cards'
import { CreateCardModal } from '@/components/cards/modals/createCardModal/CreateCardModal'
import { DeleteCardModal } from '@/components/cards/modals/deleteCardModal/DeleteCardModal'
import { EditCardModal } from '@/components/cards/modals/editCardModal/EditCardModal'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetDeckCardsQuery, useGetMeQuery, useGetOneDeckQuery } from '@/services'

import s from './deck.module.scss'

export const Deck = () => {
  const { deckId } = useParams()
  const [createMode, setCreateMode] = useState<boolean>(false)
  const [cardToDeleteId, setCardToDeleteId] = useState<null | string>(null)
  const [cardToEditId, setCardToEditId] = useState<null | string>(null)
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

  const toLearnLink = `/decks/${deckId}/learn`

  const changeSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value)
  }

  const cardToDeleteName = cards?.items?.find(card => card.id === cardToDeleteId)?.question
  const cardToEdit = cards?.items?.find(card => card.id === cardToEditId)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Page>
      <CreateCardModal
        deckId={deckId}
        onOpenChange={() => setCreateMode(false)}
        open={createMode}
      />
      <DeleteCardModal
        cardName={cardToDeleteName ?? 'Selected card'}
        id={cardToDeleteId ?? ''}
        onOpenChange={() => setCardToDeleteId(null)}
        open={!!cardToDeleteId}
      />
      <EditCardModal
        cardToEdit={cardToEdit}
        id={cardToEditId ?? ''}
        onOpenChange={() => setCardToEditId(null)}
        open={!!cardToEditId}
      />
      <div className={s.header}>
        <Typography as={'h1'} variant={'h1'}>
          {isOwner ? 'My Deck' : deck?.name}
        </Typography>
        {isOwner ? (
          <Button onClick={() => setCreateMode(true)}>Add new card</Button>
        ) : (
          <Button as={Link} to={toLearnLink}>
            Learn to Pack
          </Button>
        )}
      </div>
      {deck?.cover && <img alt={'deckImg'} className={s.img} src={deck.cover} />}
      <TextField
        onChange={changeSearchValueHandler}
        placeholder={'Search cards'}
        rootContainerProps={{ className: s.inputSearch }}
        type={'search'}
        value={value ?? ''}
      />
      <Cards
        cards={cards?.items}
        isOwner={isOwner}
        onSort={changeSort}
        searchValue={value}
        setCardToDeleteId={setCardToDeleteId}
        setCardToEditId={setCardToEditId}
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
