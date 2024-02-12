import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordFormValues = z.infer<typeof signUpSchema>

export type ForgotPasswordProps = {
  recoverPassword: (email: string) => void
}
