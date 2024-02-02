import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { DeleteModal } from '@/components/ui/modal/deleteModal/DeleteModal'

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Flag for disable buttons',
    },
    handleRemoveItem: {
      action: 'Item removed',
      description: 'Callback for delete item',
    },
    name: {
      control: 'text',
      description: 'Text for question in body modal',
    },
    title: {
      control: 'text',
      description: 'Title for modal',
    },
    trigger: {
      control: false,
      description: 'A component for controlling the display of the modal',
    },
  },
  component: DeleteModal,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/DeleteModal',
} satisfies Meta<typeof DeleteModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'SomeItemName',
    title: 'Some title remove item modal',
    trigger: <Button>Open modal</Button>,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    name: 'SomeItemName',
    trigger: <Button>Open modal</Button>,
  },
}
