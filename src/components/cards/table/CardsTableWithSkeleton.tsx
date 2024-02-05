import { Card } from '@/common/types'
import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'

type CardsTableWithSkeletonProps = {
  cards: Card[] | undefined
}

export const CardsTableWithSkeleton = ({ cards }: CardsTableWithSkeletonProps) => {
  return cards?.map(card => (
    <Table.Row key={card.id}>
      <Table.Cell col={'3'}>
        {card.questionImg ? (
          <Skeleton height={'60px'} width={'100%'} />
        ) : (
          <Skeleton height={'20px'} width={'100%'} />
        )}
      </Table.Cell>
      <Table.Cell col={'3'}>
        {card.answerImg ? (
          <Skeleton height={'60px'} width={'100%'} />
        ) : (
          <Skeleton height={'20px'} width={'100%'} />
        )}
      </Table.Cell>
      <Table.Cell col={'2'}>
        <Skeleton height={'20px'} width={'100%'} />
      </Table.Cell>
      <Table.Cell col={'2'}>
        <Skeleton height={'20px'} width={'100%'} />
      </Table.Cell>
    </Table.Row>
  ))
}
