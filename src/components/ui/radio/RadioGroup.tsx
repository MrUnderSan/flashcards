import { Typography } from '@/components/ui/typography'
import { Indicator, Item, Root } from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

import { RadioGroupProps } from './radioGroup.types'

export const RadioGroup = (props: RadioGroupProps) => {
  const { options, ...rest } = props

  return (
    <Root className={s.container} {...rest}>
      {options.map((el, index) => {
        return (
          <div className={s.radioBox} key={index}>
            <Item className={s.radio} id={el.value} value={el.value}>
              <Indicator className={s.indicator} />
            </Item>
            <Typography as={'label'} className={s.label} htmlFor={el.value} variant={'body2'}>
              {el.label}
            </Typography>
          </div>
        )
      })}
    </Root>
  )
}
