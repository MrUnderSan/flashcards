import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Meta } from '@storybook/react'

import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ['autodocs'],
  title: 'Components/Toast',
}

export default meta

export const Default = () => {
  const showToastDefault = () => {
    toast('Default message')
  }

  return (
    <>
      <Button onClick={showToastDefault}>Show Default Toast</Button>
      <Toast />
    </>
  )
}

export const Info = () => {
  const showToastInfo = () => {
    toast.info('Info message')
  }

  return (
    <div>
      <Button onClick={showToastInfo}>Show Info Toast</Button>
      <Toast />
    </div>
  )
}

export const Success = () => {
  const showToastSuccess = () => {
    toast.success('Success message')
  }

  return (
    <>
      <Button onClick={showToastSuccess}>Show Success Toast</Button>
      <Toast />
    </>
  )
}

export const Warning = () => {
  const showToastWarning = () => {
    toast.warning('Warning message')
  }

  return (
    <>
      <Button onClick={showToastWarning}>Show Warning Toast</Button>
      <Toast />
    </>
  )
}

export const Error = () => {
  const showToastError = () => {
    toast.error('Error message')
  }

  return (
    <>
      <Button onClick={showToastError}>Show Error Toast</Button>
      <Toast />
    </>
  )
}
