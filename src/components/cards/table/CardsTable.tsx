import { Edit, Trash } from '@/assets'
import { CardsTableProps, columns } from '@/components/cards/cards.types'
import { DeleteCardModal } from '@/components/modals/cards/deleteCardModal/DeleteCardModal'
import { EditCardModal } from '@/components/modals/cards/editCardModal/EditCardModal'
import { TableSortHeader } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating/Rating'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

import s from './cardsTable.module.scss'

export const CardsTable = ({ cards, isOwner, onSort, sort }: CardsTableProps) => {
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
                    <DeleteCardModal
                      id={card.id}
                      name={card.question}
                      trigger={
                        <Button variant={'icon'}>
                          <Trash />
                        </Button>
                      }
                    />
                    <EditCardModal
                      card={card}
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
        ))}
      </Table.Body>
    </Table.Root>
  )
}
