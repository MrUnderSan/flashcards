import { Outlet } from 'react-router-dom'

import { ProfileData } from '@/common/types'
import { useGetMeQuery, useLogoutMutation } from '@/services'

import s from './layout.module.scss'

import { Header } from './header'

export const Layout = () => {
  const { data, isError, isLoading } = useGetMeQuery()
  const [logout] = useLogoutMutation()
  const isAuth = !isError

  const profile: ProfileData | undefined = data && {
    avatar: data.avatar,
    email: data.email,
    name: data.name,
  }

  return (
    <>
      <Header isAuth={isAuth} logout={logout} profile={profile} />
      <main className={s.main}>
        {isLoading ? <div>Loading</div> : <Outlet context={{ isAuth }} />}
      </main>
    </>
  )
}
