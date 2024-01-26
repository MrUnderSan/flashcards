import { useLocation } from 'react-router-dom'

import { CheckEmail as CheckEmailCard } from '@/components/auth/checkEmail'
import { Page } from '@/components/page'

export const CheckEmail = () => {
  const {
    state: { email },
  } = useLocation()

  return (
    <Page>
      <CheckEmailCard email={email} />
    </Page>
  )
}
