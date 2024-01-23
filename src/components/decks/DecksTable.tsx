import { Edit, Trash } from '@/assets'
import { Play } from '@/assets/icons/play'
import { Button } from '@/components/ui/button'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableDataCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks'

import s from './decks.module.scss'

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
    key: 'author',
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
  onSort: (key: Sort) => void
  sort: Sort
}

export const DecksTable = ({ decks, onSort, sort }: Props) => {
  return (
    <Table>
      <TableHeader columns={columns} onSort={onSort} sort={sort} />
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableDataCell col={'2'}>
              <Typography variant={'body2'}>{deck.name}</Typography>
            </TableDataCell>
            <TableDataCell col={'2'}>{deck.cardsCount}</TableDataCell>
            <TableDataCell col={'2'}>
              {new Date(deck.updated).toLocaleDateString('ru-RU')}
            </TableDataCell>
            <TableDataCell col={'3'}>{deck.author.name}</TableDataCell>
            <TableDataCell col={'1'}>
              <div className={s.buttons}>
                <Button variant={'link'}>
                  <Play />
                </Button>
                <Button variant={'link'}>
                  <Trash />
                </Button>
                <Button variant={'link'}>
                  <Edit />
                </Button>
              </div>
            </TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
