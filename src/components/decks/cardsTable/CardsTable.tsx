import { Column, Sort, TableSortHeader } from '@/components/tableSortHeader'
import { Rating } from '@/components/ui/rating/Rating'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/services'

const columns: Column[] = [
  {
    cols: '3',
    key: 'question',
    title: 'Question',
  },
  {
    cols: '3',
    key: 'answer',
    title: 'Answer',
  },
  {
    cols: '2',
    key: 'updated',
    title: 'Last Updated',
  },
  {
    cols: '2',
    key: 'grade',
    title: 'Grade',
  },
]

type FriendsDeckTableProps = {
  cards: Card[] | undefined
  onSort: (key: Sort) => void
  sort: Sort
}

export const CardsTable = ({ cards, onSort, sort }: FriendsDeckTableProps) => {
  return (
    <Table.Root>
      <TableSortHeader columns={columns} onSort={onSort} sort={sort} />
      <Table.Body>
        {cards?.map(card => (
          <Table.Row key={card.id}>
            <Table.Cell col={'3'}>
              <Typography variant={'body2'}>{card.question}</Typography>
            </Table.Cell>
            <Table.Cell col={'3'}>{card.answer}</Table.Cell>
            <Table.Cell col={'2'}>{new Date(card.updated).toLocaleDateString('ru-RU')}</Table.Cell>
            <Table.Cell col={'2'}>
              <Rating rating={card.grade} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
