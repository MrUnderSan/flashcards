import SkeletonBase from 'react-loading-skeleton'

import { clsx } from 'clsx'

import { SkeletonProps } from './skeleton.types'

export const Skeleton = ({ containerClassName, containerFlex = true, ...props }: SkeletonProps) => {
  return (
    <SkeletonBase
      borderRadius={'5px'}
      containerClassName={clsx(containerClassName, containerFlex && 'flex-1')}
      {...props}
    />
  )
}
