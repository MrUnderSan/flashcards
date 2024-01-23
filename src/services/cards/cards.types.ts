export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: Date
  userId: Date
}

export type CardArgsType = {
  id: string
}

export type UpdateCardBody = {
  answer?: string
  answerImg?: string
  answerVideo?: string
  question?: string
  questionImg?: string
  questionVideo?: string
}

export type UpdateCardArgs = {
  body: UpdateCardBody
} & CardArgsType