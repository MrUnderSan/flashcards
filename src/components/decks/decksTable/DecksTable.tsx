import { Link } from 'react-router-dom'

import { Edit, Play, Trash } from '@/assets'
import { ROUTES } from '@/common/const'
import { getLocaleDateString } from '@/common/utils'
import { DecksTableWithSkeleton } from '@/components/decks/decksTable/DecksTableWithSkeleton'
import { DeleteDeckModal } from '@/components/decks/modals/deleteDeckModal/DeleteDeckModal'
import { EditDeckModal } from '@/components/decks/modals/editModal/EditDeckModal'
import { Column, Sort, TableSortHeader } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks'

import s from './decksTable.module.scss'

const columns: Column[] = [
  {
    cols: '3',
    key: 'name',
    title: 'Name',
  },
  {
    cols: '1',
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    cols: '2',
    key: 'updated',
    title: 'Last Updated',
  },
  {
    cols: '3',
    key: 'author.name',
    title: 'Created By',
  },
  {
    cols: '1',
    key: 'actions',
    title: '',
  },
]

type Props = {
  currentUserId: string
  decks: Deck[] | undefined
  isLoading: boolean
  onSort: (key: Sort) => void
  sort: Sort
}

export const DecksTable = ({ currentUserId, decks, isLoading, onSort, sort }: Props) => {
  return (
    <Table.Root>
      <TableSortHeader columns={columns} onSort={onSort} sort={sort} />
      <Table.Body>
        {isLoading ? (
          <DecksTableWithSkeleton />
        ) : (
          decks?.map(deck => (
            <Table.Row key={deck.id}>
              <Table.Cell col={'3'}>
                {deck.cover && <img alt={''} className={s.img} src={deck.cover} />}
                <Typography as={Link} className={s.link} to={`/decks/${deck.id}`} variant={'body2'}>
                  {deck.name}
                </Typography>
              </Table.Cell>
              <Table.Cell col={'1'}>{deck.cardsCount}</Table.Cell>
              <Table.Cell col={'2'}>{getLocaleDateString(deck.updated)}</Table.Cell>
              <Table.Cell col={'3'}>{deck.author.name}</Table.Cell>
              <Table.Cell col={'1'}>
                <div className={s.buttons}>
                  {deck.cardsCount > 0 && (
                    <Button
                      as={Link}
                      to={`${ROUTES.decks}/${deck.id}${ROUTES.learn}`}
                      variant={'icon'}
                    >
                      <Play />
                    </Button>
                  )}

                  {deck.author.id === currentUserId && (
                    <>
                      <DeleteDeckModal
                        id={deck.id}
                        name={deck.name}
                        trigger={
                          <Button variant={'icon'}>
                            <Trash />
                          </Button>
                        }
                      />
                      <EditDeckModal
                        deck={deck}
                        trigger={
                          <Button variant={'icon'}>
                            <Edit />
                          </Button>
                        }
                      />
                    </>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}
