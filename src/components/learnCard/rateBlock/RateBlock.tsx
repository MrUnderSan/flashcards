import { LearnBlock } from '@/components/learnCard/learnBlock'

import s from './rateBlock.module.scss'

import { RateBlockProps } from '../learnCard.types'
import { LearnRate } from './learnRate'

export const RateBlock = ({ answer, answerImg, onSubmit }: RateBlockProps) => {
  return (
    <>
      <LearnBlock className={s.learn} description={answer} img={answerImg} main={'Answer'} />
      <LearnRate className={s.rate} onSubmit={onSubmit} />
    </>
  )
}
