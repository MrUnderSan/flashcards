import type { Meta, StoryObj } from '@storybook/react'

import { Column, TableSortHeader } from '@/components/tableSortHeader'
import { Typography } from '@/components/ui/typography'

import { Table } from './Table'

const meta = {
  argTypes: {},
  component: Table.Root,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Table5cols: Story = {
  args: {},
  render: args => {
    const columns: Column[] = [
      {
        cols: '2',
        key: 'name',
        title: 'Name',
      },
      {
        cols: '2',
        key: 'cardsCount',
        title: 'Cards',
      },
      {
        cols: '2',
        key: 'updated',
        title: 'Last Updated',
      },
      {
        cols: '3',
        key: 'author',
        title: 'Created By',
      },
      {
        cols: '1',
        key: 'actions',
        title: '',
      },
    ]

    const options = [
      {
        cardsNumber: 32,
        createdBy: 'Ivanov Ivan Ivanich',
        lastUpdated: '2023-01-31',
        name: 'Cities',
      },
      {
        cardsNumber: 5,
        createdBy: 'Petr Petrovich',
        lastUpdated: '2023-01-31',
        name: 'Cars',
      },
      {
        cardsNumber: 19,
        createdBy: 'Rurih Rurhirovich',
        lastUpdated: '2023-01-31',
        name: 'Books',
      },
    ]

    return (
      <Table.Root {...args}>
        <TableSortHeader columns={columns} />
        <Table.Body>
          {options.map((t, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell col={'2'}>{t.name}</Table.Cell>
                <Table.Cell col={'2'}>{t.cardsNumber}</Table.Cell>
                <Table.Cell col={'2'}>{t.lastUpdated}</Table.Cell>
                <Table.Cell col={'3'}>{t.createdBy}</Table.Cell>
                <Table.Cell col={'1'}></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    )
  },
}

export const Table4cols: Story = {
  args: {},
  render: args => {
    const columns: Column[] = [
      {
        cols: '3',
        key: 'name',
        title: 'Name',
      },
      {
        cols: '3',
        key: 'cardsCount',
        title: 'Cards',
      },
      {
        cols: '2',
        key: 'updated',
        title: 'Last Updated',
      },
      {
        cols: '2',
        key: 'author',
        title: 'Created By',
      },
    ]
    const options = [
      {
        answer: `This is how "This" works in JavaScript`,
        createdBy: 'Ivanov Ivan Ivanich',
        lastUpdated: '2023-01-31',
        question: `How "This" works in JavaScript?`,
      },
      {
        answer: `This is how "This" works in JavaScript`,
        createdBy: 'Petr Petrovich',
        lastUpdated: '2023-01-31',
        question: `How "This" works in JavaScript?`,
      },
      {
        answer: `This is how "This" works in JavaScript`,
        createdBy: 'Rurih Rurhirovich',
        lastUpdated: '2023-01-31',
        question: `How "This" works in JavaScript?`,
      },
    ]

    return (
      <Table.Root {...args}>
        <TableSortHeader columns={columns} />
        <Table.Body>
          {options.map((t, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell col={'3'}>
                  <Typography variant={'body2'}>{t.question}</Typography>
                </Table.Cell>
                <Table.Cell col={'3'}>
                  <Typography variant={'body2'}>{t.answer}</Typography>
                </Table.Cell>
                <Table.Cell col={'2'}>
                  <Typography variant={'body2'}>{t.lastUpdated}</Typography>
                </Table.Cell>
                <Table.Cell col={'2'}>
                  <Typography variant={'body2'}>{t.createdBy}</Typography>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    )
  },
}
