import { Typography } from '@/components/ui/typography'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderProps = {
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onValueChange: (values: number[]) => void
  step?: number
  value: number[]
}

export const Slider = (props: SliderProps) => {
  const { max = 60, min = 0, minStepsBetweenThumbs, onValueChange, step, value } = props

  return (
    <div className={s.container}>
      <Typography as={'span'} className={s.valueBox} variant={'body1'}>
        {value[0]}
      </Typography>
      <SliderRadix.Root
        className={s.slider}
        max={max}
        min={min}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={onValueChange}
        step={step}
        value={value}
      >
        <SliderRadix.Track className={s.slider__track}>
          <SliderRadix.Range className={s.slider__range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.slider__thumb} />
        <SliderRadix.Thumb className={s.slider__thumb} />
      </SliderRadix.Root>
      <Typography as={'span'} className={s.valueBox} variant={'body1'}>
        {value[1]}
      </Typography>
    </div>
  )
}
