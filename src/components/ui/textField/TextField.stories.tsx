import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TextField } from './TextField'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text = {
  render: () => {
    const [state, setState] = useState('')

    return (
      <TextField
        label={'Email text field'}
        name={'email'}
        onChange={e => setState(e.currentTarget.value)}
        placeholder={'Placeholder'}
        value={state}
      />
    )
  },
}

export const Password = {
  render: () => {
    const [state, setState] = useState('')

    return (
      <TextField
        label={'Password text field'}
        onChange={e => setState(e.currentTarget.value)}
        placeholder={'Placeholder'}
        type={'password'}
        value={state}
      />
    )
  },
}

export const Search = {
  render: () => {
    const [state, setState] = useState('')

    return (
      <TextField
        label={'Search text field'}
        onChange={e => setState(e.currentTarget.value)}
        placeholder={'Placeholder'}
        type={'search'}
        value={state}
      />
    )
  },
}

export const TextWithError: Story = {
  args: {
    errorMessage: 'Some error occurred',
    label: 'Error example text field',
    placeholder: 'Placeholder',
  },
}

export const TextFieldWithoutLabel: Story = {
  args: {
    placeholder: 'Text field Without Label',
    type: 'text',
  },
}

export const DisabledPassword: Story = {
  args: {
    disabled: true,
    label: 'Disabled password text field',
    placeholder: 'Placeholder',
    type: 'password',
  },
}

export const DisabledSearch: Story = {
  args: {
    disabled: true,
    label: 'Disabled search text field',
    placeholder: 'Placeholder',
    type: 'search',
  },
}
