import { SkeletonProps as SkeletonPropsBase } from 'react-loading-skeleton'

export type SkeletonProps = Omit<
  SkeletonPropsBase,
  'baseColor' | 'borderRadius' | 'highlightColor'
> & {
  containerFlex?: boolean
}
