import { Grade } from '@/common/types'
import { LearnBlock } from '@/components/learnCard/learnBlock'

import s from './rateBlock.module.scss'

import { LearnRate } from './learnRate'

export type RateBlockProps = {
  answer: string
  answerImg: string
  onSubmit: (data: Grade) => void
}

export const RateBlock = ({ answer, answerImg, onSubmit }: RateBlockProps) => {
  return (
    <>
      <LearnBlock className={s.learn} description={answer} img={answerImg} main={'Answer'} />
      <LearnRate className={s.rate} onSubmit={onSubmit} />
    </>
  )
}
