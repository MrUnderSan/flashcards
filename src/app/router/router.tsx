import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/enums'
import { useAppOutletContext } from '@/common/hooks'
import { Layout } from '@/components/layout'
import {
  CheckEmailPage,
  CreateNewPasswordPage,
  DeckPage,
  DecksPage,
  ErrorPage,
  LearnPage,
  ProfilePage,
  RecoverPasswordPage,
  SignInPage,
  SignUpPage,
} from '@/pages'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: ROUTES.SIGN_IN,
  },
  {
    element: <SignUpPage />,
    path: ROUTES.SIGN_UP,
  },
  {
    element: <RecoverPasswordPage />,
    path: ROUTES.RECOVER_PASSWORD,
  },
  {
    element: <CheckEmailPage />,
    path: ROUTES.CHECK_EMAIL,
  },
  { element: <CreateNewPasswordPage />, path: ROUTES.CREATE_NEW_PASSWORD },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={ROUTES.DECKS} />,
    path: ROUTES.BASE,
  },
  {
    element: <DecksPage />,
    path: ROUTES.DECKS,
  },
  { element: <DeckPage />, path: ROUTES.DECK },
  { element: <ProfilePage />, path: ROUTES.PROFILE },
  {
    element: <LearnPage />,
    path: `${ROUTES.DECKS}/:id${ROUTES.LEARN}`,
  },
]

const PrivateRoutes = () => {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />
}

const PublicRoutes = () => {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Navigate to={ROUTES.DECKS} /> : <Outlet />
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
    path: ROUTES.BASE,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
