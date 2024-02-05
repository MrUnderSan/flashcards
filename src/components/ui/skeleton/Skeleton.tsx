import SkeletonBase, { SkeletonProps as SkeletonPropsBase } from 'react-loading-skeleton'

import { clsx } from 'clsx'

export type SkeletonProps = Omit<
  SkeletonPropsBase,
  'baseColor' | 'borderRadius' | 'highlightColor'
> & {
  containerFlex?: boolean
}

export const Skeleton = ({ containerClassName, containerFlex = true, ...props }: SkeletonProps) => {
  return (
    <SkeletonBase
      borderRadius={'10px'}
      containerClassName={clsx(containerClassName, containerFlex && 'flex-1')}
      {...props}
    />
  )
}
