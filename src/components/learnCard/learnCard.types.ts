import { Card as CardType, Grade } from '@/common/types'

export type LearnCardProps = {
  card: CardType
  deckName: string
  onSubmit: (data: Grade, changeRateMode: any) => void
  open?: boolean
}

export type RateBlockProps = {
  answer: string
  answerImg: string
  onSubmit: (data: Grade) => void
}

export type LearnBlockProps = {
  className?: string
  description: string
  img?: string
  main: 'Answer' | 'Question'
}
