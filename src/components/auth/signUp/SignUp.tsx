import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/enums'
import { FormSignUp } from '@/components/auth/signUp/form/FormSignUp'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './signUp.module.scss'

import { SignUpProps } from './signUp.types'

export const SignUp = ({ onSubmit }: SignUpProps) => {
  return (
    <Card as={'div'} className={s.card}>
      <Typography as={'h2'} variant={'large'}>
        Sign Up
      </Typography>
      <FormSignUp onSubmit={onSubmit} />
      <div className={s.bottom}>
        <Typography variant={'body2'}>Already have an account?</Typography>
        <Button as={Link} to={ROUTES.SIGN_IN} variant={'link'}>
          Sign in
        </Button>
      </div>
    </Card>
  )
}
