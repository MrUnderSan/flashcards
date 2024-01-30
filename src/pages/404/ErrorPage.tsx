import { Link } from 'react-router-dom'

import errorImg from '@/assets/404.png'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './errorPage.module.scss'

export const ErrorPage = () => {
  return (
    <Page className={s.container}>
      <img alt={''} src={errorImg} />
      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button as={Link} to={'/'} variant={'primary'}>
        Back to home page
      </Button>
    </Page>
  )
}
