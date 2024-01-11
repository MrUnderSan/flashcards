import type { Meta, StoryObj } from '@storybook/react'

import { Edit, LogOut, Person, PlayCircle, Trash } from '@/assets'

import { DropDownMenu } from './'

const meta = {
  args: {
    defaultOpen: true,
  },
  component: DropDownMenu,
  tags: ['autodocs'],
  title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Profile: Story = {
  args: {
    children: (
      <button
        style={{
          border: 'none',
          borderRadius: '36px ',
          height: '36px',
          padding: 0,
          width: '36px',
        }}
      >
        <img
          alt={'photo'}
          src={'https://assets.editorial.aetnd.com/uploads/2009/11/portrait-of-john-smith.jpg'}
          style={{
            borderRadius: '36px ',
            height: '36px',
            objectFit: 'cover',
            width: '36px',
          }}
        />
      </button>
    ),
    items: [
      { icon: <Person />, name: 'My Profile' },
      { icon: <LogOut />, name: 'Sign Out' },
    ],
    profile: {
      email: 'johnsmith@it-incubator.io',
      img: 'https://assets.editorial.aetnd.com/uploads/2009/11/portrait-of-john-smith.jpg',
      name: 'John',
    },
  },
}

export const Setting: Story = {
  args: {
    children: (
      <button
        style={{
          border: 'none',
          borderRadius: '36px ',
          height: '36px',
          padding: 0,
          width: '36px',
        }}
      ></button>
    ),
    items: [
      {
        icon: <PlayCircle />,
        name: 'Learn',
      },
      { icon: <Edit />, name: 'Edit' },
      { icon: <Trash />, name: 'Delete' },
    ],
  },
}
