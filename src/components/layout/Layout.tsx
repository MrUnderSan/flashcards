import { Outlet } from 'react-router-dom'

import s from './layout.module.css'

import { Header } from './header'

export const Layout = () => {
  const isLoggedIn = false
  const profileData = undefined

  return (
    <>
      <Header isLoggedIn={isLoggedIn} profile={profileData} />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}
