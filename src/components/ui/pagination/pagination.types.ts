import { SelectProps } from '@/components/ui/select'

export type PaginationProps = {
  currentPage: number
  onChangePage: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
} & SelectProps
