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
