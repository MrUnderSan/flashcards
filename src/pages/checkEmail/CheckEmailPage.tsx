import { useLocation } from 'react-router-dom'

import { CheckEmail as CheckEmailCard } from '@/components/auth/checkEmail'
import { Page } from '@/components/ui/page'

export const CheckEmailPage = () => {
  const {
    state: { email },
  } = useLocation()

  return (
    <Page>
      <CheckEmailCard email={email} />
    </Page>
  )
}
