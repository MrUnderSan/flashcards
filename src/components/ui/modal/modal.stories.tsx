import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/Modal'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onOpenChange: () => {},
    open: true,
    title: 'Modal',
  },
  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} onOpenChange={setOpen} open={open}>
          <div style={{ padding: '40px 40px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor eos error explicabo
            fugiat laborum minus, modi non praesentium quaerat quibusdam ratione reiciendis, tempora
            vel. Accusantium consequatur ex excepturi fugit, impedit ipsum laboriosam nihil quaerat
            quibusdam saepe, sequi, velit? Atque dolor ducimus ea est mollitia, natus nihil quam
            quibusdam quos voluptatem?
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <Button variant={'secondary'}>Secondary</Button>
              <Button>Primary</Button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}
