import { Star, StarEmpty } from '@/assets/icons'
import { clsx } from 'clsx'

import s from './rating.module.scss'

import { RatingProps } from './rating.types'

export const Rating = ({ className, maxRating = 5, rating, ...restProps }: RatingProps) => {
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
