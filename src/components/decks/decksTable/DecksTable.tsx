import { Link } from 'react-router-dom'

import { Edit, Trash } from '@/assets'
import { Play } from '@/assets/icons/play'
import { getLocaleDateString } from '@/common/utils'
import { Column, Sort, TableSortHeader } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks'

import s from './decksTable.module.scss'

const columns: Column[] = [
  {
    cols: '2',
    key: 'name',
    title: 'Name',
  },
  {
    cols: '2',
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
  decks: Deck[] | undefined
  deleteClick: (id: string) => void
  //editClick: (id: string) => void
  onSort: (key: Sort) => void
  sort: Sort
}

export const DecksTable = ({ decks, deleteClick, onSort, sort }: Props) => {
  const deleteHandler = (id: string) => () => deleteClick(id)
  // const editHandler = (id: string) => () => editClick(id)

  return (
    <Table.Root>
      <TableSortHeader columns={columns} onSort={onSort} sort={sort} />
      <Table.Body>
        {decks?.map(deck => (
          <Table.Row key={deck.id}>
            <Table.Cell col={'2'}>
              <Typography as={Link} className={s.link} to={`/decks/${deck.id}`} variant={'body2'}>
                {deck.name}
              </Typography>
            </Table.Cell>
            <Table.Cell col={'2'}>{deck.cardsCount}</Table.Cell>
            <Table.Cell col={'2'}>{getLocaleDateString(deck.updated)}</Table.Cell>
            <Table.Cell col={'3'}>{deck.author.name}</Table.Cell>
            <Table.Cell col={'1'}>
              <div className={s.buttons}>
                <Button variant={'icon'}>
                  <Play />
                </Button>
                <Button onClick={deleteHandler(deck.id)} variant={'icon'}>
                  <Trash />
                </Button>
                <Button onClick={() => {}} variant={'icon'}>
                  <Edit />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
