import type { Meta, StoryObj } from '@storybook/react'

import { Edit, LogOut, Person, Trash } from '@/assets'
import { Typography } from '@/components/ui/typography'
import { action } from '@storybook/addon-actions'

import { DropDownBasicItemContent, DropDownItem, DropDownMenu, DropDownSeparator } from './'

const meta = {
  component: DropDownMenu,
  tags: ['autodocs'],
  title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof DropDownMenu>

const img = (
  <img
    alt={'photo'}
    src={'https://ui-avatars.com/api/?name=JS'}
    style={{
      borderRadius: '36px ',
      height: '36px',
      objectFit: 'cover',
      width: '36px',
    }}
  />
)

const trigger = (
  <button
    style={{
      border: 'none',
      borderRadius: '36px ',
      height: '36px',
      padding: 0,
      width: '36px',
    }}
  >
    {img}
  </button>
)

export const Profile: Story = {
  render: () => (
    <DropDownMenu defaultOpen trigger={trigger}>
      <DropDownItem>
        {img}
        <div>
          <Typography variant={'subtitle2'}>John Smith</Typography>
          <Typography variant={'caption'}>johnsmith@it-incubator.io</Typography>
        </div>
      </DropDownItem>{' '}
      <DropDownSeparator />
      <DropDownItem>
        <DropDownBasicItemContent icon={<Person />} name={'My Profile'} />
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={action('onLogout')}>
        <DropDownBasicItemContent icon={<LogOut />} name={'Sign Out'} />
      </DropDownItem>
    </DropDownMenu>
  ),
}

export const Setting: Story = {
  render: () => (
    <DropDownMenu defaultOpen trigger={trigger}>
      <DropDownItem onSelect={action('Edit')}>
        <DropDownBasicItemContent icon={<Edit />} name={'Edit'} />
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={action('Delete')}>
        <DropDownBasicItemContent icon={<Trash />} name={'Delete'} />
      </DropDownItem>
    </DropDownMenu>
  ),
}
