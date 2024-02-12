import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'

const { Cell, Row } = Table

export const DecksTableWithSkeleton = () => {
  return new Array(10).fill(0).map((_, i) => (
    <Row key={i}>
      <Cell col={'3'}>
        <Skeleton height={'24px'} width={'100%'} />
      </Cell>
      <Cell col={'1'}>
        <Skeleton height={'24px'} width={'100%'} />
      </Cell>
      <Cell col={'2'}>
        <Skeleton height={'24px'} width={'100%'} />
      </Cell>
      <Cell col={'3'}>
        <Skeleton height={'24x'} width={'100%'} />
      </Cell>
      <Cell col={'1'}>
        <Skeleton height={'24x'} width={'100%'} />
      </Cell>
    </Row>
  ))
}
