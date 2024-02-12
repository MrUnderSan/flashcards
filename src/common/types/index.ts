import { CardGrade } from '@/common/enums'

export type UploadImage = File | null | string

export type ProfileData = {
  avatar?: string
  email: string
  name: string
}

export type Option = {
  label: string
  value: string
}

export type Grade = { grade: string }

export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: CardGrade
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}
