import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const Toast = () => {
  return (
    <ToastContainer
      autoClose={4000}
      closeOnClick
      draggable
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={'bottom-center'}
      rtl={false}
      theme={'dark'}
    />
  )
}
