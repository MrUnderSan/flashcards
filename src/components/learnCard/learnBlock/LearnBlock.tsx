import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './learnBlock.module.scss'

export type LearnBlockProps = {
  className?: string
  description: string
  img?: string
  main: 'Answer' | 'Question'
}

export const LearnBlock = ({ className, description, img, main }: LearnBlockProps) => {
  const classNames = clsx(s.wrapper, className)

  return (
    <div className={classNames}>
      <Typography as={'p'} className={s.text} variant={'body1'}>
        <Typography as={'span'} variant={'subtitle1'}>
          {`${main}: `}
        </Typography>
        {description}
      </Typography>

      {img && <img alt={`${main} image`} className={s.img} src={img} />}
    </div>
  )
}
