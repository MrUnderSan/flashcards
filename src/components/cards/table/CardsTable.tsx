import { Edit, Trash } from '@/assets'
import { Card } from '@/common/types'
import { Column, Sort, TableSortHeader } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating/Rating'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

import s from './cardsTable.module.scss'

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

type CardsTableProps = {
  cards: Card[] | undefined
  isOwner?: boolean
  onSort: (key: Sort) => void
  setCardToDeleteId?: (id: string) => void
  setCardToEditId?: (id: string) => void
  sort: Sort
}

export const CardsTable = ({
  cards,
  isOwner,
  onSort,
  setCardToDeleteId,
  setCardToEditId,
  sort,
}: CardsTableProps) => {
  const setCardToDeleteIdHandler = (id: string) => () => setCardToDeleteId?.(id)
  const setCardToEditIdHandler = (id: string) => () => setCardToEditId?.(id)

  return (
    <Table.Root>
      <TableSortHeader columns={columns} onSort={onSort} sort={sort} />
      <Table.Body>
        {cards?.map(card => (
          <Table.Row key={card.id}>
            <Table.Cell col={'3'}>
              {card.questionImg && (
                <img alt={'questionImg'} className={s.img} src={card.questionImg} />
              )}
              <Typography variant={'body2'}>{card.question}</Typography>
            </Table.Cell>
            <Table.Cell col={'3'}>
              {card.answerImg && <img alt={'answerImg'} className={s.img} src={card.answerImg} />}
              <Typography variant={'body2'}>{card.answer}</Typography>
            </Table.Cell>
            <Table.Cell col={'2'}>{new Date(card.updated).toLocaleDateString('ru-RU')}</Table.Cell>
            <Table.Cell className={isOwner ? s.altTr : ''} col={'2'}>
              <Rating rating={card.grade} />
              <div className={s.buttons}>
                {isOwner && (
                  <>
                    <Button onClick={setCardToDeleteIdHandler(card.id)} variant={'icon'}>
                      <Trash />
                    </Button>
                    <Button onClick={setCardToEditIdHandler(card.id)} variant={'icon'}>
                      <Edit />
                    </Button>
                  </>
                )}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
