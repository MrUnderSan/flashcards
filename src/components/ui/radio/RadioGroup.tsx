import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Option = {
  label: string
  value: string
}
export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>,
  'children'
> & {
  options: Option[]
}
export const RadioGroup = (props: RadioGroupProps) => {
  const { options, ...rest } = props

  return (
    <RadioGroupRadix.Root className={s.container} {...rest}>
      {options.map((el, index) => {
        return (
          <div className={s.radioBox} key={index}>
            <RadioGroupRadix.Item className={s.radio} id={el.value} value={el.value}>
              <RadioGroupRadix.Indicator className={s.indicator} />
            </RadioGroupRadix.Item>
            <Typography as={'label'} className={s.label} htmlFor={el.value} variant={'body2'}>
              {el.label}
            </Typography>
          </div>
        )
      })}
    </RadioGroupRadix.Root>
  )
}
