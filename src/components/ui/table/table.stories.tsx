import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography'

import { Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow } from './Table'

const meta = {
  argTypes: {},
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Table5cols: Story = {
  args: {},
  render: args => {
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
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeadCell col={'2'}>Name</TableHeadCell>
            <TableHeadCell col={'2'}>Cards</TableHeadCell>
            <TableHeadCell col={'2'}>Last Updated</TableHeadCell>
            <TableHeadCell col={'3'}>Created By</TableHeadCell>
            <TableHeadCell col={'1'}></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map((t, index) => {
            return (
              <TableRow key={index}>
                <TableDataCell col={'2'}>{t.name}</TableDataCell>
                <TableDataCell col={'2'}>{t.cardsNumber}</TableDataCell>
                <TableDataCell col={'2'}>{t.lastUpdated}</TableDataCell>
                <TableDataCell col={'3'}>{t.createdBy}</TableDataCell>
                <TableDataCell col={'1'}></TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  },
}

export const Table4cols: Story = {
  args: {},
  render: args => {
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
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeadCell col={'3'}>Question</TableHeadCell>
            <TableHeadCell col={'3'}>Answer</TableHeadCell>
            <TableHeadCell col={'2'}>Last Updated</TableHeadCell>
            <TableHeadCell col={'2'}>Grade</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map((t, index) => {
            return (
              <TableRow key={index}>
                <TableDataCell col={'3'}>
                  <Typography variant={'body2'}>{t.question}</Typography>
                </TableDataCell>
                <TableDataCell col={'3'}>
                  <Typography variant={'body2'}>{t.answer}</Typography>
                </TableDataCell>
                <TableDataCell col={'2'}>
                  <Typography variant={'body2'}>{t.lastUpdated}</Typography>
                </TableDataCell>
                <TableDataCell col={'2'}>
                  <Typography variant={'body2'}>{t.createdBy}</Typography>
                </TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  },
}
