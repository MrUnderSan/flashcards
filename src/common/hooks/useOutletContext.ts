import { useOutletContext } from 'react-router-dom'

export type AppOutletContext = {
  isAuth: boolean
}

export const useAppOutletContext = () => {
  return useOutletContext<AppOutletContext>()
}
