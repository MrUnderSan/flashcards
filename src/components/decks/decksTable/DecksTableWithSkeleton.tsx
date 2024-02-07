import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'

export const DecksTableWithSkeleton = () => {
  return new Array(10).fill(0).map((_, i) => (
    <Table.Row key={i}>
      <Table.Cell col={'3'}>
        <Skeleton height={'24px'} width={'100%'} />
      </Table.Cell>
      <Table.Cell col={'1'}>
        <Skeleton height={'24px'} width={'100%'} />
      </Table.Cell>
      <Table.Cell col={'2'}>
        <Skeleton height={'24px'} width={'100%'} />
      </Table.Cell>
      <Table.Cell col={'3'}>
        <Skeleton height={'24x'} width={'100%'} />
      </Table.Cell>
      <Table.Cell col={'1'}>
        <Skeleton height={'24x'} width={'100%'} />
      </Table.Cell>
    </Table.Row>
  ))
}
