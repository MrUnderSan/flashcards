import { ComponentPropsWithoutRef } from 'react'

export type RatingProps = {
  maxRating?: number
  rating: number
} & ComponentPropsWithoutRef<'div'>
