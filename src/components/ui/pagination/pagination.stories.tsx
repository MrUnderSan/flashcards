import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Typography } from '@/components/ui/typography'

import { Pagination } from './'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { title: 'title 1', value: '1' },
  { title: 'title 2', value: '2' },
  { title: 'title 3', value: '3' },
  { title: 'title 4', value: '4' },
  { title: 'title 5 ', value: '5' },
]
const ControlledPagination = () => {
  const [current, setCurrent] = useState(1)
  const [view, setView] = useState('10')

  const items = [
    { id: 'id1', title: 'title1' },
    { id: 'id2', title: 'title2' },
    { id: 'id3', title: 'title3' },
    { id: 'id4', title: 'title4' },
    { id: 'id5', title: 'title5' },
    { id: 'id6', title: 'title6' },
    { id: 'id7', title: 'title7' },
    { id: 'id8', title: 'title8' },
    { id: 'id9', title: 'title9' },
    { id: 'id10', title: 'title10' },
  ]

  const setPage = (currentPage: number) => {
    if (current > 0) {
      setCurrent(currentPage)
    }
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <Typography variant={'h2'}>Number of current page: {current}</Typography>
      <Typography variant={'h2'}>Count items on page: {view}</Typography>
      <ul>
        {items.slice(0, +view).map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
      <Pagination
        currentPage={current}
        onChangePage={setPage}
        onValueChange={setView}
        options={options}
        pageSize={10}
        pagination
        placeholder={view}
        totalCount={200}
      />
    </div>
  )
}

export const ControlledDemo: Story = {
  args: {
    currentPage: 1,
    options: [],
    pageSize: 10,
    totalCount: 200,
  },
  render: () => <ControlledPagination />,
}

export const Demo: Story = {
  args: {
    currentPage: 1,
    options,
    pageSize: 10,
    totalCount: 200,
  },
}
