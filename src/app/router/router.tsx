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
import { SignIn } from '@/pages'
import { Decks } from '@/pages/decks/Decks'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: ROUTES.signIn,
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
