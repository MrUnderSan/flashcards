import { Link } from 'react-router-dom'

import { Email } from '@/assets'
import { ROUTES } from '@/common/const'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './checkEmail.module.scss'

export type CheckEmailProps = {
  email: string
}

export const CheckEmail = ({ email }: CheckEmailProps) => {
  const linkToEmail = email.split('@')[1]

  return (
    <Card className={s.card}>
      <Typography variant={'large'}>Check Email</Typography>
      <Email className={s.icon} />
      <Typography className={s.description} variant={'body2'}>
        We’ve sent an Email with instructions to <br />
        <Typography as={'a'} href={`https://${linkToEmail}`} variant={'link1'}>
          {email}
        </Typography>
      </Typography>
      <Button as={Link} className={s.button} fullWidth to={ROUTES.signIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
