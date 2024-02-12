export enum ROUTES {
  BASE = '/',
  CHECK_EMAIL = '/check-email',
  CREATE_NEW_PASSWORD = '/create-new-password/:token',
  DECK = '/decks/:deckId',
  DECKS = '/decks',
  LEARN = '/learn',
  PROFILE = '/profile',
  RECOVER_PASSWORD = '/recover-password',
  REST = '/*',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
}

export enum CardGrade {
  DidNotKnow = 1,
  Forgot,
  ALotOfThought,
  Confused,
  KnewTheAnswer,
}
