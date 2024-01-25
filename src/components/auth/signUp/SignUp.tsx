import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/const'
import { Form, FormValues } from '@/components/auth/signUp/form/Form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './signUp.module.scss'

type SignUpProps = {
  onSubmit: (data: FormValues) => void
}

export const SignUp = ({ onSubmit }: SignUpProps) => {
  return (
    <Card as={'div'} className={s.card}>
      <Typography as={'h2'} variant={'large'}>
        Sign Up
      </Typography>
      <Form onSubmit={onSubmit} />
      <div className={s.bottom}>
        <Typography variant={'body2'}>Already have an account?</Typography>
        <Button as={Link} to={ROUTES.signIn} variant={'link'}>
          Sign in
        </Button>
      </div>
    </Card>
  )
}
