import { Form } from '@/components/auth/forgotPassword/form/Form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './forgotPassword.module.scss'

export const ForgotPassword = () => {
  return (
    <Card>
      <Typography as={'h2'} variant={'large'}>
        Forgot your password?
      </Typography>
      <Form />
      <div className={s.bottom}>
        <Typography as={'p'} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Button as={'a'} variant={'link'}>
          Try logging in
        </Button>
      </div>
    </Card>
  )
}
