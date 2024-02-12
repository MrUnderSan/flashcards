import type { Meta } from '@storybook/react'

import { ProfileInfo } from '@/components/personalInformation/profileInfo/ProfileInfo'

const meta = {
  argTypes: {
    activeEditMode: {
      action: 'activeEditMode',
    },
    logout: {
      action: 'logout',
    },
  },
  component: ProfileInfo,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/ProfilePage/ProfileInfo',
} satisfies Meta<typeof ProfileInfo>

export default meta

export const ProfileInfoDemo = () => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <ProfileInfo
        activeEditMode={() => {}}
        email={'test@gmail.com'}
        logout={() => {}}
        username={'test name'}
      />
    </div>
  )
}
