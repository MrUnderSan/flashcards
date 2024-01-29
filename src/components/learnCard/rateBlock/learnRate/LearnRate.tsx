import { useForm } from 'react-hook-form'

import { CardGrade } from '@/common/enums'
import { Grade, Option } from '@/common/types'
import { Button } from '@/components/ui/button'
import { FormRadioGroup } from '@/components/ui/formComponents/formRadioGroup'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './learnRate.module.scss'

const options: Option[] = [
  { label: 'Did not know', value: CardGrade.DidNotKnow.toString() },
  { label: 'Forgot', value: CardGrade.Forgot.toString() },
  { label: 'A lot of thought', value: CardGrade.ALotOfThought.toString() },
  { label: 'Confused', value: CardGrade.Confused.toString() },
  { label: 'Knew the answer', value: CardGrade.KnewTheAnswer.toString() },
]

export type LearnRateProps = { className?: string; onSubmit: (data: Grade) => void }

export const LearnRate = ({ className, onSubmit }: LearnRateProps) => {
  const { control, handleSubmit } = useForm<Grade>({
    defaultValues: { grade: '1' },
  })

  return (
    <form className={clsx(className, s.form)} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={s.title} variant={'subtitle1'}>
        Rate yourself:
      </Typography>
      <FormRadioGroup control={control} name={'grade'} options={options} />
      <Button className={s.button} fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
