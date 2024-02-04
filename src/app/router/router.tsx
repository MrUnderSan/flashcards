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
import {
  CheckEmail,
  CreateNewPassword,
  Deck,
  Decks,
  Learn,
  Profile,
  RecoverPassword,
  SignIn,
  SignUp,
} from '@/pages'
import { ErrorPage } from '@/pages/404'

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
  {
    element: <CheckEmail />,
    path: ROUTES.checkEmail,
  },
  { element: <CreateNewPassword />, path: ROUTES.createNewPassword },
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
  { element: <Profile />, path: ROUTES.profile },
  {
    element: <Learn />,
    path: `${ROUTES.decks}/:id${ROUTES.learn}`,
  },
]

function PrivateRoutes() {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

function PublicRoutes() {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Navigate to={ROUTES.decks} /> : <Outlet />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <Layout />,
    errorElement: <ErrorPage />,
    path: ROUTES.base,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
