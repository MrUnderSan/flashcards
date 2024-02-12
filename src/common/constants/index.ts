import { z } from 'zod'

export const SELECT_OPTIONS_PAGINATION = [
  { title: '5', value: '5' },
  { title: '10', value: '10' },
  { title: '15', value: '15' },
]

export const TABS = [
  { title: 'My DecksPage', value: 'my' },
  { title: 'All DecksPage', value: 'all' },
]

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(file => file.size <= 1000000, `Max image size is 1MB. The file will not be uploaded.`)
  .refine(
    file => ['images/jpg', 'images/webp', 'imagess/jpeg', 'imagess/png'].includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported. The file will not be uploaded.'
  )

export const CARD_SCHEMA = z.object({
  answer: z.string().trim().min(3, 'Answer must be longer than or equal to 3 characters'),
  question: z.string().trim().min(3, 'Question must be longer than or equal to 3 characters'),
})
export const DECK_SCHEMA = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().trim().min(3).max(30),
})

export const PASSWORD_RESET_EMAIL_TEMPLATE = `<h2 style="color:#333">Hi , ##name##</h2>
 <p style="color:#666;line-height: 1.6;margin-top:5px;">You received this email because you requested to reset your account password. 
 If this was you, please visit the following link to reset your password:</p>
 <p style="color:#666;line-height: 1.6;"><a style="color: #007BFF;text-decoration: none;font-weight: bold;" href="https://flashcards-it-inc.vercel.app/create-new-password/##token##">Reset Password</a></p>
<p style="color:#666;line-height: 1.6;">If you did not request a password reset, please ignore this message or contact us.</p>
<p style="color:#666;line-height: 1.6;">Thank you,</p>
<p style="color:#666;">Flashcard Team.</p>
`
