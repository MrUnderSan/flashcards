import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/const'
import { useAppOutletContext } from '@/common/hooks'
import { Layout } from '@/components/layout'
import { Deck, Decks, RecoverPassword, SignIn, SignUp } from '@/pages'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: ROUTES.signIn,
  },
  {
    element: <SignUp />,
    path: ROUTES.signUp,
  },
  {
    element: <RecoverPassword />,
    path: ROUTES.recoverPassword,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={ROUTES.decks} />,
    path: ROUTES.base,
  },
  {
    element: <Decks />,
    path: ROUTES.decks,
  },
  { element: <Deck />, path: ROUTES.deck },
]

function PrivateRoutes() {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: ROUTES.base,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
