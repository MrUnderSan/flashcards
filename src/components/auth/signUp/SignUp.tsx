import { Form } from '@/components/auth/signUp/form/Form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './signUp.module.scss'

export const SignUp = () => {
  return (
    <Card as={'div'}>
      <Typography as={'h2'} variant={'large'}>
        Sign Up
      </Typography>
      <Form />
      <div className={s.bottom}>
        <Typography variant={'body2'}>Already have an account?</Typography>
        <Button as={'a'} variant={'link'}>
          Sign in
        </Button>
      </div>
    </Card>
  )
}
