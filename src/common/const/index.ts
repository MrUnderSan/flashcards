import { z } from 'zod'

export const ROUTES = {
  base: '/',
  checkEmail: '/check-email',
  createNewPassword: '/create-new-password',
  deck: '/decks/:deckId',
  decks: '/decks',
  learn: '/learn',
  profile: '/profile',
  recoverPassword: '/recover-password',
  rest: '/*',
  signIn: '/sign-in',
  signUp: '/sign-up',
} as const

export const SELECT_OPTIONS_PAGINATION = [
  { title: '5', value: '5' },
  { title: '10', value: '10' },
  { title: '15', value: '15' },
]

export const TABS = [
  { title: 'My Decks', value: 'my' },
  { title: 'All Decks', value: 'all' },
]

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(file => file.size <= 1000000, `Max image size is 1MB. The file will not be uploaded.`)
  .refine(
    file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported. The file will not be uploaded.'
  )

export const CARD_SCHEMA = z.object({
  answer: z.string().min(3, 'Answer must be longer than or equal to 3 characters').trim(),
  question: z.string().min(3, 'Question must be longer than or equal to 3 characters').trim(),
})
