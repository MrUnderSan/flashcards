import { Typography } from '@/components/ui/typography'
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { SliderProps } from './slider.types'

export const Slider = ({
  max = 60,
  min = 0,
  minStepsBetweenThumbs,
  onValueChange,
  step,
  value,
}: SliderProps) => {
  return (
    <div className={s.container}>
      <Typography as={'span'} className={s.valueBox} variant={'body1'}>
        {value[0]}
      </Typography>
      <Root
        className={s.slider}
        max={max}
        min={min}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={onValueChange}
        step={step}
        value={value}
      >
        <Track className={s.slider__track}>
          <Range className={s.slider__range} />
        </Track>
        <Thumb className={s.slider__thumb} />
        <Thumb className={s.slider__thumb} />
      </Root>
      <Typography as={'span'} className={s.valueBox} variant={'body1'}>
        {value[1]}
      </Typography>
    </div>
  )
}
