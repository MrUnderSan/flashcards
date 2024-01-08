import { Typography } from '@/components/ui/typography'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderProps = {
  defaultValue: number[]
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onChange?: (value: number[]) => void
  step?: number
  value?: number[]
}

export const Slider = (props: SliderProps) => {
  const { defaultValue, max, min, minStepsBetweenThumbs, onChange, step, value } = props

  return (
    <div className={s.container}>
      <Typography as={'span'} className={s.valueBox} variant={'body1'}>
        {defaultValue[0]}
      </Typography>
      <SliderRadix.Root
        className={s.slider}
        defaultValue={defaultValue}
        max={max}
        min={min}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={onChange}
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
        {defaultValue[1]}
      </Typography>
    </div>
  )
}
