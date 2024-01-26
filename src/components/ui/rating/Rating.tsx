import { ComponentPropsWithoutRef } from 'react'

import { Star, StarEmpty } from '@/assets/icons'
import { clsx } from 'clsx'

import s from './rating.module.scss'

type RatingProps = {
  maxRating?: number
  rating: number
} & ComponentPropsWithoutRef<'div'>

export const Rating = (props: RatingProps) => {
  const { className, maxRating = 5, rating, ...restProps } = props
  const stars = [...Array(maxRating)].map((_, index) => index + 1)

  return (
    <div className={clsx(s.root, className)} {...restProps}>
      {stars.map((star, index) => {
        return rating >= star ? (
          <Star className={s.icon} key={index} />
        ) : (
          <StarEmpty className={s.icon} key={index} />
        )
      })}
    </div>
  )
}
