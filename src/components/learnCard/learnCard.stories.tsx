import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/common/types'
import { action } from '@storybook/addon-actions'

import { LearnCard } from './'

const card: Card = {
  answer: 'This is how "This" works in JavaScript',
  answerImg: 'https://cdn-user84060.skyeng.ru/uploads/63a46da081462084145047.png',
  answerVideo: '',
  created: '',
  deckId: 'deckId',
  grade: 5,
  id: 'id',
  question: 'How "This" works in JavaScript?',
  questionImg:
    'https://cdn-developer-wp.arc.dev/wp-content/uploads/2022/01/javascript-interview-questions.jpg',
  questionVideo: '',
  shots: 10,
  updated: '',
  userId: 'userId',
}

const meta = {
  args: {
    card,
    deckName: 'Deck Name',
    onSubmit: action('onSubmit'),
  },
  component: LearnCard,
  tags: ['autodocs'],
  title: 'components/Learn',
} satisfies Meta<typeof LearnCard>

export default meta
type Story = StoryObj<typeof meta>

export const WithImg: Story = {}

export const WithoutImg: Story = {
  args: {
    card: {
      ...card,
      answerImg: '',
      questionImg: '',
    },
  },
}

export const OpenWithImg: Story = {
  args: {
    open: true,
  },
}

export const OpenWithoutImg: Story = {
  args: {
    card: {
      ...card,
      answerImg: '',
      questionImg: '',
    },
    open: true,
  },
}
